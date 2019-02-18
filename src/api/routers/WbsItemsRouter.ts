import {Router, Request, Response, NextFunction} from "express";
import { IApiRouter } from "./IApiRouter";
import { IWbsItemsController } from "../controllers/WbsItemsController";

// WbsItemsRouter is handling routes for /api/wbsItems
export class WbsItemsRouter implements IApiRouter {

  public route: string = "/api/wbsitems";
  private _wbsItemsController: IWbsItemsController;

  constructor(wbsItemsController: IWbsItemsController) {
    this._wbsItemsController = wbsItemsController;
  }

  public RouteHandler(): Router {

    const router = Router();
    // handle GET for /api/wbsitems
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      return this._wbsItemsController.GetWbsItems(req, res, next);
    });

    // handle GET for /api/wbsitems/:wbsItemId
    router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
      return this._wbsItemsController.GetWbsItemById(req, res, next);
    });

    // handle POST for /api/wbsitems
    router.post("/", (req: Request, res: Response, next: NextFunction) => {
      return this._wbsItemsController.AddWbsItem(req, res, next);
    });

    // handle PUT for /api/wbsitems/:wbsItemId
    router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
      return this._wbsItemsController.UpdateWbsItem(req, res, next);
    });

    // handle DELETE for /api/wbsitems/:wbsitemId
    router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
      return this._wbsItemsController.DeleteWbsItem(req, res, next);
    });

    return router;
  }
}
