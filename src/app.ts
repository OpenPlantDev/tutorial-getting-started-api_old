import express from "express";
import * as http from "http";
import {Api} from "./api/api";
import {IApiRouter} from "./api/routers/IApiRouter";
import { ComponentsRouter } from "./api/routers/ComponentsRouter";
import { WbsItemsRouter } from "./api/routers/WbsItemsRouter";
import {ComponentsController} from "./api/controllers/ComponentsController";
import { WbsItemsController } from "./api/controllers/WbsItemsController";

import {ComponentsDb} from "./api/repositories/ComponentsDb";
// import {FakeDb} from "./api/repositories/FakeDb";
import { SqliteServices } from "./services/sqlite.service";
import { WbsItemsDb } from "./api/repositories/WbsItemsDb";
import { SocketService } from "./services/socket.service";

const app = express();
const httpServer = new http.Server(app);
const socketService = new SocketService(httpServer);

const sqliteServices: SqliteServices = new SqliteServices("model.db");

const compsDb = new ComponentsDb(sqliteServices);
const wbsItemsDb = new WbsItemsDb(sqliteServices);

const compController = new ComponentsController(compsDb, socketService);
const wbsItemsController = new WbsItemsController(wbsItemsDb, socketService);

const routers: IApiRouter[] = [
  new ComponentsRouter(compController),
  new WbsItemsRouter(wbsItemsController),
];

const api = new Api();
api.Start(app, httpServer, routers);
