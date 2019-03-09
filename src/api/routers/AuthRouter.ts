import {Router, Request, Response, NextFunction} from "express";
import { IApiRouter } from "./IApiRouter";
import * as AuthServices from "../../services/auth.service";

// ComponentsRouter is handling routes for /api/components
export class AuthRouter implements IApiRouter {

  public route: string = "/api/auth";

  public RouteHandler(): Router {

    const router = Router();
    // handle GET for /api/components
    router.get("/:email", async (req: Request, res: Response, next: NextFunction) => {
      const email: string = req.params.email;
      const token = AuthServices.createToken(email);
      if (token instanceof Error) {
        return next(token);
      } else {
        return res.status(200).json({token});
      }
    });

    router.get("/", async (req: Request, res: Response, next: NextFunction) => {
      if (!req.headers.authorization) {
        return next(new Error("invalid request"));
      }
      const base64Credentials =  req.headers.authorization.split(" ")[1];
      const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
      const [username, password] = credentials.split(":");
      console.log(`Username: ${username}, Password: ${password}`);

      const token = AuthServices.createToken(username);
      if (token instanceof Error) {
        return next(token);
      } else {
        return res.status(200).json({token});
      }
    });

    return router;
  }
}
