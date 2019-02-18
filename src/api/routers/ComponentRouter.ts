import {Router} from "express";
import { IApiRouter } from "./IApiRouter";

// ComponentRouter handles routes for /api/components
export class ComponentRouter implements IApiRouter {

  public route: string = "/api/components";

  public RouteHandler(): Router {

    const router = Router();
    router.get("/", (req, res) => {
      return res.status(400).json({message: `Route GET /api/components is not yet handled`});
    });

    router.get("/:id", (req, res) => {
      return res.status(400).json({message: `Route GET /api/components/:id is not yet handled`});

    });

    router.post("/", (req, res) => {
      return res.status(400).json({message: `Route POST /api/components is not yet handled`});

    });

    router.put("/:id", (req, res) => {
      return res.status(400).json({message: `Route PUT /api/components/:id is not yet handled`});

    });

    router.delete("/:id", (req, res) => {
      return res.status(400).json({message: `Route DELETE /api/components/:id is not yet handled`});

    });

    return router;
  }
}
