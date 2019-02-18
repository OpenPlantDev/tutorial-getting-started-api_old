import {Request, Response, NextFunction} from "express";
import {IWbsItemsRepository} from "../repositories/IWbsItemsRepository";
import {IWbsItem} from "../models/WbsItem";
import {ApiError} from "../ApiError";

export interface IWbsItemsController {

  GetWbsItems: (req: Request, res: Response, next: NextFunction) => Response | void;
  GetWbsItemById: (req: Request, res: Response, next: NextFunction) => Response | void;
  AddWbsItem: (req: Request, res: Response, next: NextFunction) => Response | void;
  UpdateWbsItem: (req: Request, res: Response, next: NextFunction) => Response | void;
  DeleteWbsItem: (req: Request, res: Response, next: NextFunction) => Response | void;
}

export class WbsItemsController implements IWbsItemsController {

  private _wbsItemsRepository: IWbsItemsRepository;

  constructor(wbsItemsRepository: IWbsItemsRepository) {
    this._wbsItemsRepository = wbsItemsRepository;
  }

  public GetWbsItems(req: Request, res: Response, next: NextFunction): Response | void {
    const result = this._wbsItemsRepository.GetWbsItems();
    if (result instanceof Error) {
      return res.send(new ApiError(400, result.message));
    }
    return res.status(200).json(result);
  }

  public GetWbsItemById(req: Request, res: Response, next: NextFunction): Response | void {
    const id = req.params.id;
    const result = this._wbsItemsRepository.GetWbsItemById(id);
    if (result instanceof Error) {
      return next(new ApiError(404, result.message));
    }
    return res.status(200).json(result);
  }

  public AddWbsItem(req: Request, res: Response, next: NextFunction): Response | void {
    const item: IWbsItem = {
      id: "",
      className: req.body.className,
      tag: req.body.tag,
      properties: req.body.properties,
    };

    const result = this._wbsItemsRepository.AddWbsItem(item);
    if (result instanceof Error) {
      return next( new ApiError(400, result.message));
    }
    return res.status(200).json(result);
  }

  public UpdateWbsItem(req: Request, res: Response, next: NextFunction): Response | void {
    const item: IWbsItem = {
      id: req.params.id,
      className: req.body.className,
      tag: req.body.tag,
      properties: req.body.properties,
    };

    const result = this._wbsItemsRepository.UpdateWbsItem(item);
    if (result instanceof Error) {
      return next(new ApiError(404, result.message));
    }
    return res.status(200).json(result);
  }

  public DeleteWbsItem(req: Request, res: Response, next: NextFunction): Response | void {
    const id = req.params.id;
    const result = this._wbsItemsRepository.DeleteWbsItem(id);
    if (result instanceof Error) {
      return next(new ApiError(404, result.message));
    }
    return res.status(200).json(result);
  }
}
