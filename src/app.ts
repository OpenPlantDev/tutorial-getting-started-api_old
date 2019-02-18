import {Api} from "./api/api";
import {IApiRouter} from "./api/routers/IApiRouter";
import { ComponentsRouter } from "./api/routers/ComponentsRouter";
import { WbsItemsRouter } from "./api/routers/WbsItemsRouter";
import {ComponentsController} from "./api/controllers/ComponentsController";
import { WbsItemsController } from "./api/controllers/WbsItemsController";

import {FakeDb} from "./api/repositories/FakeDb";

const api = new Api();

const fakeDb = new FakeDb();
fakeDb.SeedDb(
  [
    {id: "1", className: "valve", tag: "V-100", properties: {desc: "Gate Valve"}},
    {id: "2", className: "valve", tag: "V-101", properties: {desc: "Globe Valve"}},
    {id: "3", className: "pump", tag: "P-100", properties: {desc: "Pump"}},
    {id: "4", className: "vessel", tag: "H-100", properties: {desc: "Tank"}},
  ],
  [
    {id: "11", className: "unit", tag: "U1", properties: {desc: "Unit #1"}},
    {id: "12", className: "unit", tag: "U2", properties: {desc: "Unit #2"}},
    {id: "13", className: "service", tag: "S1", properties: {desc: "Service #1"}},
    {id: "14", className: "area", tag: "S2", properties: {desc: "Area #1"}},
  ],

);

const compController = new ComponentsController(fakeDb);
const wbsItemsController = new WbsItemsController(fakeDb);

const routers: IApiRouter[] = [
  new ComponentsRouter(compController),
  new WbsItemsRouter(wbsItemsController),
];

api.Start(routers);
