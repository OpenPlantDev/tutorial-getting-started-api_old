import express from "express";
import {ApiError} from "./ApiError";
import {IApiRouter} from "./routers/IApiRouter";

export class Api {

  public Start(routers: IApiRouter[]): void {
    const api = express();

    // add middleware to read body of request
    api.use(express.json());
    api.use(express.urlencoded({extended: true}));

    // allow CORS
    api.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET POST PUT DELETE");
        return res.status(200).json({});
      }
      return next();
    });

    // call api.use for each router
    routers.map((router) => {
      api.use(router.route, router.RouteHandler());
    });

    // handle error for non-handled routes
    api.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      // create new error with status 404
      const err = new ApiError(404, `Route not found`);
      next(err);
    });

    // handle errors thrown during the handling of the request
    api.use((err: ApiError, req: express.Request, res: express.Response, next: express.NextFunction) => {
      const status = err.status ? err.status : 500;
      const message = err.message ? err.message : "Server error";

      res.status(status).json({message});

    });

    // Start the server
    const port = process.env.PORT || 4040;

    api.listen(port, () => {
      console.log(`Api is listening on http://localhost:${port}`);
    });
  }
}
