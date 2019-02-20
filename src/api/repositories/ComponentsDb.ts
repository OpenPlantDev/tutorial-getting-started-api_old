import { IComponentsRepository } from "./IComponentsRepository";
import { IComponent } from "../models/Component";
import { SqliteServices } from "../../services/sqlite.service";

const rowToComponent = (row: any): IComponent => {
  return {
    id: row.id,
    className: row.className,
    tag: row.tag,
    properties: row.properties ? JSON.parse(row.properties) : [],
  };
};

const rowsToComponentArray = (rows: any[]): IComponent[] => {
  const comps: IComponent[] = [];
  if (rows) {
    rows.map((row) => {
      comps.push(rowToComponent(row));
    });
  }

  return comps;
};

export class ComponentsDb implements IComponentsRepository {

  private _tableName = "components";
  private _sqliteServices: SqliteServices;

  constructor(sqliteServices: SqliteServices) {
    this._sqliteServices = sqliteServices;
  }

  public async GetComponents(): Promise<IComponent[] | Error> {
    const query = `Select * from ${this._tableName}`;
    try {
      const result = await this._sqliteServices.Query(query);
      if (result instanceof Error) {
        return result;
      }
      return(rowsToComponentArray(result));
    } catch (err) {
      throw err;
    }
  }

  public async GetComponentById(id: string): Promise<IComponent | Error> {
    const query = `Select * from ${this._tableName} where id=${id}`;
    try {
      const result = await this._sqliteServices.Query(query);
      if (result instanceof Error) {
        return result;
      }
      if (result.length <= 0) {
        return new Error(`No record found for id:[${id}]`);
      }
      return(rowToComponent(result[0]));
    } catch (err) {
      throw err;
    }
  }

  public async AddComponent(comp: IComponent): Promise<string | Error> {
    const className = comp.className;
    const tag = comp.tag;
    const properties = comp.properties ? JSON.stringify(comp.properties) : "";
    const query = `Insert into ${this._tableName} (className, tag, properties) Values
                    ('${className}', '${tag}', '${properties}')`;
    try {
      const result = await this._sqliteServices.Execute(query);
      if (result instanceof Error) {
        return result;
      }
      return(result.lastId);
    } catch (err) {
      throw err;
    }
}

  public async UpdateComponent(comp: IComponent): Promise<IComponent | Error> {
    const className = comp.className;
    const tag = comp.tag;
    const properties = comp.properties ? JSON.stringify(comp.properties) : "";
    const query = `Update ${this._tableName}
                   Set className='${className}',
                       tag ='${tag}',
                       properties='${properties}'
                    Where id=${comp.id}`;
    try {
      const result = await this._sqliteServices.Execute(query);
      if (result instanceof Error) {
        return result;
      }
      if (result.rowsAffected <= 0) {
        return new Error(`No record found for id:[${comp.id}]`);
      }
      return(comp);
    } catch (err) {
      throw err;
    }
  }

  public async DeleteComponent(id: string): Promise<boolean | Error> {
    const query = `Delete from ${this._tableName} where id=${id}`;
    try {
      const result = await this._sqliteServices.Execute(query);
      if (result instanceof Error) {
        return result;
      }
      if (result.rowsAffected <= 0) {
        return new Error(`No record found for id:[${id}]`);
      }
      return(true);
    } catch (err) {
      throw err;
    }
  }

}
