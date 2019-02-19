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
    router.get("/", async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await this._wbsItemsController.GetWbsItems(req, res, next);
      } catch (err) {
        throw err;
      }
    });

    // handle GET for /api/wbsitems/:wbsItemId
    router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await this._wbsItemsController.GetWbsItemById(req, res, next);
      } catch (err) {
        throw err;
      }
    });

    // handle POST for /api/wbsitems
    router.post("/", async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await this._wbsItemsController.AddWbsItem(req, res, next);
      } catch (err) {
        throw err;
      }
    });

    // handle PUT for /api/wbsitems/:wbsItemId
    router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await this._wbsItemsController.UpdateWbsItem(req, res, next);

      } catch (err) {
        throw err;
      }
    });

    // handle DELETE for /api/wbsitems/:wbsitemId
    router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await this._wbsItemsController.DeleteWbsItem(req, res, next);
      } catch (err) {
        throw err;
      }
    });

    return router;
  }
}
