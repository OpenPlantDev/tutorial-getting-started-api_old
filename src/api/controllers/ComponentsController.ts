import {Request, Response, NextFunction} from "express";
import { IComponentsRepository } from "../repositories/IComponentsRepository";
import { ApiError } from "../ApiError";
import {IComponent} from "../models/Component";

export interface IComponentsController {

  GetComponents: (req: Request, res: Response, next: NextFunction) => Response | void;
  GetComponentById: (req: Request, res: Response, next: NextFunction) => Response | void;
  AddComponent: (req: Request, res: Response, next: NextFunction) => Response | void;
  UpdateComponent: (req: Request, res: Response, next: NextFunction) => Response | void;
  DeleteComponent: (req: Request, res: Response, next: NextFunction) => Response | void;
}

export class ComponentsController implements IComponentsController {

  private _componentsRepository: IComponentsRepository;

  constructor(componentsRepository: IComponentsRepository) {
    this._componentsRepository = componentsRepository;
  }

  public GetComponents(req: Request, res: Response, next: NextFunction): Response | void {
    const result = this._componentsRepository.GetComponents();
    if (result instanceof Error) {
      return next(new ApiError(400, result.message));
    }
    return res.status(200).json(result);
  }

  public GetComponentById(req: Request, res: Response, next: NextFunction): Response | void {
    const id = req.params.id;
    const result = this._componentsRepository.GetComponentById(id);
    if (result instanceof Error) {
      return next(new ApiError(404, result.message));
    }
    return res.status(200).json(result);
  }

  public AddComponent(req: Request, res: Response, next: NextFunction): Response | void {
    const comp: IComponent = {
      id: "",
      className: req.body.className,
      tag: req.body.tag,
      properties: req.body.properties,
    };

    const result = this._componentsRepository.AddComponent(comp);
    if (result instanceof Error) {
      return next(new ApiError(400, result.message));
    }
    return res.status(200).json(result);
  }

  public UpdateComponent(req: Request, res: Response, next: NextFunction): Response | void {
    const comp: IComponent = {
      id: req.params.id,
      className: req.body.className,
      tag: req.body.tag,
      properties: req.body.properties,
    };

    const result = this._componentsRepository.UpdateComponent(comp);
    if (result instanceof Error) {
      return next(new ApiError(404, result.message));
    }
    return res.status(200).json(result);
  }

  public DeleteComponent(req: Request, res: Response, next: NextFunction): Response | void {
    const id = req.params.id;
    const result = this._componentsRepository.DeleteComponent(id);
    if (result instanceof Error) {
      return next(new ApiError(404, result.message));
    }
    return res.status(200).json(result);
  }

}