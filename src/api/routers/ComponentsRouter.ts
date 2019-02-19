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
    router.get("/", async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await this._componentsController.GetComponents(req, res, next);
      } catch (err) {
        throw err;
      }
    });

    // handle GET for /api/components/:componentId
    router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await this._componentsController.GetComponentById(req, res, next);
      } catch (err) {
        throw err;
      }

    });

    // handle POST for /api/components
    router.post("/", async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await this._componentsController.AddComponent(req, res, next);
      } catch (err) {
        throw err;
      }

    });

    // handle PUT for /api/components/:componentId
    router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await this._componentsController.UpdateComponent(req, res, next);
      } catch (err) {
        throw err;
      }

    });

    // handle DELETE for /api/components/:componentId
    router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await this._componentsController.DeleteComponent(req, res, next);
      } catch (err) {
        throw err;
      }
    });

    return router;
  }
}
