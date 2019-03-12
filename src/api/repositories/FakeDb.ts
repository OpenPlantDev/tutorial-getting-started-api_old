import { IComponentsRepository } from "./IComponentsRepository";
import { IWbsItemsRepository } from "./IWbsItemsRepository";
import { IComponent } from "../models/Component";
import { IWbsItem } from "../models/WbsItem";
import {Guid} from "guid-typescript";

export class FakeDb implements IComponentsRepository, IWbsItemsRepository {

  private _components: IComponent[] = [];
  private _wbsItems: IWbsItem[] = [];

  public SeedDb(components: IComponent[], wbsItems: IWbsItem[]) {
    this._components = components;
    this._wbsItems = wbsItems;
  }

  public async GetComponents(): Promise<IComponent[]> {
    return new Promise((resolve, reject) => resolve(this._components));
  }

  public async GetComponentById(id: string): Promise<IComponent | Error> {

    return new Promise((resolve, reject) => {
      const comp = this._components.find((c) => c.id === id);
      if (comp) {
        return resolve(comp);
      }
      return resolve(new Error(`Component with id: ${id} was not found`));
    });

  }

  public async AddComponent(comp: IComponent): Promise<string | Error> {

    return new Promise((resolve, reject) => {
        // validate data
      const className: string = (comp.className ? comp.className : "").trim();
      if (!className) {
        return resolve(new Error(`className not specified`));
      }
      const tag: string = (comp.tag ? comp.tag : "").trim();
      if (!tag) {
        return resolve(new Error(`tag not specified`));
      }
      // force new id
      comp.id = Guid.create().toString();
      this._components.push(comp);
      return resolve(comp.id);
    });
  }

  public async UpdateComponent(comp: IComponent): Promise<IComponent | Error> {
    return new Promise((resolve, reject) => {
        // should validate data here, something for tests to find
      const index = this._components.findIndex((c) => c.id === comp.id);
      if (index >= 0) {
        this._components.splice(index, 1);
        this._components.push(comp);
        return resolve(comp);
      }
      return resolve(new Error(`Component with id: ${comp.id} was not found`));
    });
  }

  public async DeleteComponent(id: string): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const index = this._components.findIndex((c) => c.id === id);
      if (index >= 0) {
        this._components.splice(index, 1);
        return resolve(true);
      }
      return resolve(new Error(`Component with id: ${id} was not found`));
    });
  }

  // WbsItems

  public async GetWbsItems(): Promise<IWbsItem[] | Error> {
    return new Promise((resolve, reject) => {
      resolve(this._wbsItems);
    });
  }

  public async GetWbsItemById(id: string): Promise<IWbsItem | Error> {

    return new Promise((resolve, reject) => {
      const item = this._components.find((c) => c.id === id);
      if (item) {
        return resolve(item);
      }
      return resolve(new Error(`WbsItem with id: ${id} was not found`));
    });

  }

  public async AddWbsItem(item: IWbsItem): Promise<string | Error> {

    return new Promise((resolve, reject) => {
      const className: string = (item.className ? item.className : "").trim();
      if (!className) {
        return resolve(new Error(`className not specified`));
      }
      const tag: string = (item.tag ? item.tag : "").trim();
      if (!tag) {
        return resolve(new Error(`tag not specified`));
      }
      // force new id
      item.id = Guid.create().toString();
      this._wbsItems.push(item);
      return resolve(item.id);
      });
  }

  public async UpdateWbsItem(item: IWbsItem): Promise<IWbsItem | Error> {

    return new Promise((resolve, reject) => {

      const index = this._wbsItems.findIndex((c) => c.id === item.id);
      if (index >= 0) {
        this._wbsItems.splice(index, 1);
        this._wbsItems.push(item);
        return resolve(item);
      }
      return resolve(new Error(`WbsItem with id: ${item.id} was not found`));
    });
  }

  public async DeleteWbsItem(id: string): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const index = this._wbsItems.findIndex((c) => c.id === id);
      if (index >= 0) {
        this._wbsItems.splice(index, 1);
        return resolve(true);
      }
      return resolve(new Error(`WbsItem with id: ${id} was not found`));
    });
  }
}
