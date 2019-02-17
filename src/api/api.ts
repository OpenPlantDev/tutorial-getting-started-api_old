import express from "express";
import {ApiError} from "./ApiError";
import {ComponentRouter} from "./routers/ComponentRouter";
import { WbsItemsRouter } from "./routers/WbsItemsRouter";

export class Api {

  public Start(): void {
    const api = express();

    api.use("/api/components", ComponentRouter.RouterHandler());
    api.use("/api/wbsitems", WbsItemsRouter.RouterHandler());
    api.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      // create new error with status 404
      const err = new ApiError(404, `Route not found`);
      next(err);
    });

    api.use((error: ApiError, req: express.Request, res: express.Response, next: express.NextFunction) => {
      const status = error.status ? error.status : 500;
      const msg = error.message ? error.message : `Server error`;

      res.status(status).json({msg});

    });

    // Start the server
    const port = process.env.PORT || 4040;

    api.listen(port, () => {
      console.log(`Api is listening on http://localhost:${port}`);
    });
  }
}
