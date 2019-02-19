import {Request, Response, NextFunction} from "express";
import { IComponentsRepository } from "../repositories/IComponentsRepository";
import { ApiError } from "../ApiError";
import {IComponent} from "../models/Component";

export interface IComponentsController {

  GetComponents: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  GetComponentById: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  AddComponent: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  UpdateComponent: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  DeleteComponent: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
}

export class ComponentsController implements IComponentsController {

  private _componentsRepository: IComponentsRepository;

  constructor(componentsRepository: IComponentsRepository) {
    this._componentsRepository = componentsRepository;
  }

  public async GetComponents(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const result = await this._componentsRepository.GetComponents();
      if (result instanceof Error) {
        return next(new ApiError(400, result.message));
      }
      return res.status(200).json(result);
    } catch (err) {
      return next(new ApiError(500, err.message));
    }
  }

  public async GetComponentById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const id = req.params.id;
    try {
      const result = await this._componentsRepository.GetComponentById(id);
      if (result instanceof Error) {
        return next(new ApiError(404, result.message));
      }
      return res.status(200).json(result);
      } catch (err) {
        return next(new ApiError(500, err.message));
      }

  }

  public async AddComponent(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    if (!req.body) {
      return next(new ApiError(400, "No body specified in request"));
    }
    const comp: IComponent = {
      id: "",
      className: req.body.className,
      tag: req.body.tag,
      properties: req.body.properties,
    };

    try {
      const result = await this._componentsRepository.AddComponent(comp);
      if (result instanceof Error) {
        return next(new ApiError(400, result.message));
      }
      return res.status(201).json(result);
    } catch (err) {
      return next(new ApiError(500, err.message));
    }
  }

  public async UpdateComponent(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    if (!req.body) {
      return next(new ApiError(400, "No body specified in request"));
    }
    const comp: IComponent = {
      id: req.params.id,
      className: req.body.className,
      tag: req.body.tag,
      properties: req.body.properties,
    };

    try {
      const result = await this._componentsRepository.UpdateComponent(comp);
      if (result instanceof Error) {
        return next(new ApiError(404, result.message));
      }
      return res.status(200).json(result);
    } catch (err) {
      return next(new ApiError(500, err.message));
  }
}

  public async DeleteComponent(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const id = req.params.id;
    try {
      const result = await this._componentsRepository.DeleteComponent(id);
      if (result instanceof Error) {
        return next(new ApiError(404, result.message));
      }
      return res.status(200).json(result);
      } catch (err) {
      return next(new ApiError(500, err.message));
    }
  }

}
