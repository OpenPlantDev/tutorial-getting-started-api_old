import { Router } from "express";

export interface IApiRouter {
  route: string;
  RouteHandler: () => Router;
}
