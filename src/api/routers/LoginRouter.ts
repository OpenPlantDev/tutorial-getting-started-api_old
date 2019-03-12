import {Router, Request, Response, NextFunction} from "express";
import { IApiRouter } from "./IApiRouter";
import * as AuthServices from "../../services/auth.service";

// ComponentsRouter is handling routes for /api/components
export class LoginRouter implements IApiRouter {

  public route: string = "/api/login";

  public RouteHandler(): Router {

    const router = Router();

    router.get("/", async (req: Request, res: Response, next: NextFunction) => {
      if (!req.headers.authorization) {
        return next(new Error("invalid request"));
      }
      const base64Credentials =  req.headers.authorization.split(" ")[1];
      const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
      const [username, password] = credentials.split(":");
      console.log(`Username: ${username}, Password: ${password}`);

      const result = AuthServices.createToken(username, password);
      if (result instanceof Error) {
        return next(result);
      } else {
        return res.status(200).json({result});
      }
    });

    return router;
  }
}
