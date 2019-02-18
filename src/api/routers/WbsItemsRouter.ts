import {Router, Request, Response} from "express";
import { IApiRouter } from "./IApiRouter";

// WbsItemsRouter is handling routes for /api/wbsItems
export class WbsItemsRouter implements IApiRouter {

  public route: string = "/api/wbsitems";

  public RouteHandler(): Router {

    const router = Router();
    // handle GET for /api/wbsitems
    router.get("/", (req: Request, res: Response) => {
      res.status(400).json({message: `Route GET /api/wbsitems in not yet handled`});

    });

    // handle GET for /api/wbsitems/:wbsItemId
    router.get("/:id", (req: Request, res: Response) => {
      const id = req.params.id;
      res.status(400).json({message: `Route GET /api/wbsitems/${id} in not yet handled`});

    });

    // handle POST for /api/wbsitems
    router.post("/", (req: Request, res: Response) => {
      res.status(400).json({message: `Route POST /api/wbsitems in not yet handled`});

    });

    // handle PUT for /api/wbsitems/:wbsItemId
    router.put("/:id", (req: Request, res: Response) => {
      const id = req.params.id;
      res.status(400).json({message: `Route PUT /api/wbsitems/${id} in not yet handled`});

    });

    // handle DELETE for /api/wbsitems/:wbsitemId
    router.delete("/:id", (req: Request, res: Response) => {
      const id = req.params.id;
      res.status(400).json({message: `Route DELETE /api/wbsitems/${id} in not yet handled`});

    });

    return router;
  }
}
