import {Request, Response, NextFunction} from "express";
import {IWbsItemsRepository} from "../repositories/IWbsItemsRepository";
import {IWbsItem} from "../models/WbsItem";
import {ApiError} from "../ApiError";
import {QueryOptions} from "../../services/queryOptions.service";
import { SocketService } from "../../services/socket.service";

export interface IWbsItemsController {

  GetWbsItems: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  GetWbsItemById: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  AddWbsItem: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  UpdateWbsItem: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  DeleteWbsItem: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
}

export class WbsItemsController implements IWbsItemsController {

  private _wbsItemsRepository: IWbsItemsRepository;
  private _socketService: SocketService;

  constructor(wbsItemsRepository: IWbsItemsRepository, socketService: SocketService) {
    this._wbsItemsRepository = wbsItemsRepository;
    this._socketService = socketService;
  }

  public async GetWbsItems(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const queryOptions = QueryOptions.GetOptions(req.query);
      const result = await this._wbsItemsRepository.GetWbsItems(queryOptions);
      if (result instanceof Error) {
        return res.send(new ApiError(400, result.message));
      }
      return res.status(200).json(result);
    } catch (err) {
      return next( new ApiError(500, err.message));
    }
  }

  public async GetWbsItemById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const id = req.params.id;
    try {
      const result = await this._wbsItemsRepository.GetWbsItemById(id);
      if (result instanceof Error) {
        return next(new ApiError(404, result.message));
      }
      return res.status(200).json(result);
    } catch (err) {
      return next( new ApiError(500, err.message));
    }
  }

  public async AddWbsItem(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const item: IWbsItem = {
      id: "",
      className: req.body.className,
      tag: req.body.tag,
      properties: req.body.properties,
    };

    try {
      const result = await this._wbsItemsRepository.AddWbsItem(item);
      if (result instanceof Error) {
        return next( new ApiError(400, result.message));
      }
      // if we added a new item, send message on server
      this._socketService.emitMessage("DbUpdated", "WbsItem was added");
      return res.status(200).json(result);
    } catch (err) {
      return next( new ApiError(500, err.message));
    }
  }

  public async UpdateWbsItem(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const item: IWbsItem = {
      id: req.params.id,
      className: req.body.className,
      tag: req.body.tag,
      properties: req.body.properties,
    };

    try {
      const result = await this._wbsItemsRepository.UpdateWbsItem(item);
      if (result instanceof Error) {
        return next(new ApiError(404, result.message));
      }
      // if we updated the item, send message on server
      this._socketService.emitMessage("DbUpdated", "WbsItem was updated");
      return res.status(200).json(result);
    } catch (err) {
      return next( new ApiError(500, err.message));
    }
  }

  public async DeleteWbsItem(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const id = req.params.id;
    try {
      const result = await this._wbsItemsRepository.DeleteWbsItem(id);
      if (result instanceof Error) {
        return next(new ApiError(404, result.message));
      }
      // if we deleted the item, send message on server
      this._socketService.emitMessage("DbUpdated", "WbsItem was deleted");
      return res.status(200).json(result);
    } catch (err) {
      return next( new ApiError(500, err.message));
    }
  }
}
