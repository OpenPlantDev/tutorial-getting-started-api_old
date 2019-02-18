import {Router, Request, Response} from "express";
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
    router.get("/", (req: Request, res: Response) => {
      return this._componentsController.GetComponents(req, res);
    });

    // handle GET for /api/components/:componentId
    router.get("/:id", (req: Request, res: Response) => {
      return this._componentsController.GetComponentById(req, res);

    });

    // handle POST for /api/components
    router.post("/", (req: Request, res: Response) => {
      return this._componentsController.AddComponent(req, res);

    });

    // handle PUT for /api/components/:componentId
    router.put("/:id", (req: Request, res: Response) => {
      return this._componentsController.UpdateComponent(req, res);

    });

    // handle DELETE for /api/components/:componentId
    router.delete("/:id", (req: Request, res: Response) => {
      return this._componentsController.DeleteComponent(req, res);
    });

    return router;
  }
}
