import {Api} from "./api/api";
import {IApiRouter} from "./api/routers/IApiRouter";
import { ComponentsRouter } from "./api/routers/ComponentsRouter";
import { WbsItemsRouter } from "./api/routers/WbsItemsRouter";

const api = new Api();

const routers: IApiRouter[] = [
  new ComponentsRouter(),
  new WbsItemsRouter(),
];

api.Start(routers);
