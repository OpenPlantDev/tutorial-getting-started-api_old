import {Router} from "express";
import { IApiRouter } from "./IApiRouter";

// WbsItemsRouter handles routes for /api/wbsitems
export class WbsItemsRouter implements IApiRouter {

  public route: string = "/api/wbsitems";

  public RouteHandler(): Router {

    const router = Router();
    router.get("/", (req, res) => {
      return res.status(400).json({message: `Route GET /api/wbsitems is not yet handled`});

    });

    router.get("/:id", (req, res) => {
      return res.status(400).json({message: `Route GET /api/wbsitems/:id is not yet handled`});

    });

    router.post("/", (req, res) => {
      return res.status(400).json({message: `Route POST /api/wbsitems is not yet handled`});

    });

    router.put("/:id", (req, res) => {
      return res.status(400).json({message: `Route PUT /api/wbsitems/:id is not yet handled`});

    });

    router.delete("/:id", (req, res) => {
      return res.status(400).json({message: `Route DELETE /api/wbsitems/:id is not yet handled`});

    });

    return router;
  }
}
