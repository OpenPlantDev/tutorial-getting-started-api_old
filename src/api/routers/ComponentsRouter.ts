import {Router, Request, Response} from "express";
import { IApiRouter } from "./IApiRouter";

// ComponentsRouter is handling routes for /api/components
export class ComponentsRouter implements IApiRouter {

  public route: string = "/api/components";

  public RouteHandler(): Router {

    const router = Router();
    // handle GET for /api/components
    router.get("/", (req: Request, res: Response) => {
      res.status(400).json({message: `Route GET /api/components in not yet handled`});
    });

    // handle GET for /api/components/:componentId
    router.get("/:id", (req: Request, res: Response) => {
      const id = req.params.id;
      res.status(400).json({message: `Route GET /api/components/${id} in not yet handled`});

    });

    // handle POST for /api/components
    router.post("/", (req: Request, res: Response) => {
      res.status(400).json({message: `Route POST /api/components in not yet handled`});

    });

    // handle PUT for /api/components/:componentId
    router.put("/:id", (req: Request, res: Response) => {
      const id = req.params.id;
      res.status(400).json({message: `Route PUT /api/components/${id} in not yet handled`});

    });

    // handle DELETE for /api/components/:componentId
    router.delete("/:id", (req: Request, res: Response) => {
      const id = req.params.id;
      res.status(400).json({message: `Route DELETE /api/components/${id} in not yet handled`});

    });

    return router;
  }
}
