import express from "express";
import {ApiError} from "./ApiError";
import {IApiRouter} from "./routers/IApiRouter";

export class Api {

  public Start(routers: IApiRouter[]): void {
    const api = express();

    // call api.use for each router
    routers.map((router) => {
      api.use(router.route, router.RouteHandler());
    });

    // hanle error for routes not handled by routers
    api.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      // create new error with status 404
      const err = new ApiError(404, `Route not found`);
      next(err);
    });

    // handle errors thrown during the handling of the request
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
