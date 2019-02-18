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

  public GetComponents(): IComponent[] {
    return this._components;
  }

  public GetComponentById(id: string) {
    const comp = this._components.find((c) => c.id === id);
    if (comp) {
      return comp;
    }
    return new Error(`Component with id: ${id} was not found`);
  }

  public AddComponent(comp: IComponent) {

    // validate data
    const className: string = (comp.className ? comp.className : "").trim();
    if (!className) {
      return new Error(`className not specified`);
    }
    const tag: string = (comp.tag ? comp.tag : "").trim();
    if (!tag) {
      return new Error(`tag not specified`);
    }
    // force new id
    comp.id = Guid.create().toString();
    this._components.push(comp);
    return comp.id;
  }

  public UpdateComponent(comp: IComponent) {
    const index = this._components.findIndex((c) => c.id === comp.id);
    if (index >= 0) {
      this._components.splice(index, 1);
      this._components.push(comp);
      return comp;
    }
    return new Error(`Component with id: ${comp.id} was not found`);
  }

  public DeleteComponent(id: string) {
    const index = this._components.findIndex((c) => c.id === id);
    if (index >= 0) {
      this._components.splice(index, 1);
      return true;
    }
    return new Error(`Component with id: ${id} was not found`);
  }

  // WbsItems

  public GetWbsItems(): IWbsItem[] {
    return this._wbsItems;
  }

  public GetWbsItemById(id: string) {
    const comp = this._wbsItems.find((c) => c.id === id);
    if (comp) {
      return comp;
    }
    return new Error(`WbsItem with id: ${id} was not found`);
  }

  public AddWbsItem(item: IWbsItem) {

    // validate data
    const className: string = (item.className ? item.className : "").trim();
    if (!className) {
      return new Error(`className not specified`);
    }
    const tag: string = (item.tag ? item.tag : "").trim();
    if (!tag) {
      return new Error(`tag not specified`);
    }
    // force new id
    item.id = Guid.create().toString();
    this._wbsItems.push(item);
    return item.id;
  }

  public UpdateWbsItem(item: IWbsItem) {
    const index = this._wbsItems.findIndex((c) => c.id === item.id);
    if (index >= 0) {
      this._wbsItems.splice(index, 1);
      this._wbsItems.push(item);
      return item;
    }
    return new Error(`WbsItem with id: ${item.id} was not found`);
  }

  public DeleteWbsItem(id: string) {
    const index = this._wbsItems.findIndex((c) => c.id === id);
    if (index >= 0) {
      this._wbsItems.splice(index, 1);
      return true;
    }
    return new Error(`WbsItem with id: ${id} was not found`);
  }
}
