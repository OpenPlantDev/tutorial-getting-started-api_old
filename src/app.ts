import {Api} from "./api/api";
import {IApiRouter} from "./api/routers/IApiRouter";
import { ComponentsRouter } from "./api/routers/ComponentsRouter";
import { WbsItemsRouter } from "./api/routers/WbsItemsRouter";
import {ComponentsController} from "./api/controllers/ComponentsController";
import { WbsItemsController } from "./api/controllers/WbsItemsController";

const api = new Api();

const compController = new ComponentsController();
const wbsItemsController = new WbsItemsController();

const routers: IApiRouter[] = [
  new ComponentsRouter(compController),
  new WbsItemsRouter(wbsItemsController),
];

api.Start(routers);
