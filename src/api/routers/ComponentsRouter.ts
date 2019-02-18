import {Router, Request, Response, NextFunction} from "express";
import { IApiRouter } from "./IApiRouter";
import { IComponentsController } from "../controllers/ComponentsController";

// ComponentsRouter is handling routes for /api/components
export class ComponentsRouter implements IApiRouter {

  public route: string = "/api/components";
  private _componentsController: IComponentsController;
  constructor(compController: IComponentsController) {
    this._componentsController = compController;
  }

  public RouteHandler(): Router {

    const router = Router();
    // handle GET for /api/components
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      return this._componentsController.GetComponents(req, res, next);
    });

    // handle GET for /api/components/:componentId
    router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
      return this._componentsController.GetComponentById(req, res, next);

    });

    // handle POST for /api/components
    router.post("/", (req: Request, res: Response, next: NextFunction) => {
      return this._componentsController.AddComponent(req, res, next);

    });

    // handle PUT for /api/components/:componentId
    router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
      return this._componentsController.UpdateComponent(req, res, next);

    });

    // handle DELETE for /api/components/:componentId
    router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
      return this._componentsController.DeleteComponent(req, res, next);
    });

    return router;
  }
}
