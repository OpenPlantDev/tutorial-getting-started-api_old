import {Api} from "./api/api";
import { ComponentRouter } from "./api/routers/ComponentRouter";
import { WbsItemsRouter } from "./api/routers/WbsItemsRouter";
import { IApiRouter } from "./api/routers/IApiRouter";

const api = new Api();

const routers: IApiRouter[] = [
  new ComponentRouter(),
  new WbsItemsRouter(),
];

api.Start(routers);
