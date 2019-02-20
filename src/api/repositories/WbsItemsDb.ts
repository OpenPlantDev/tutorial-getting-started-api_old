import { IWbsItemsRepository } from "./IWbsItemsRepository";
import { IWbsItem } from "../models/WbsItem";
import { SqliteServices } from "../../services/sqlite.service";
import { IQueryOptions } from "../../services/queryOptions.service";

const rowToWbsItem = (row: any): IWbsItem => {
  return {
    id: row.id,
    className: row.className,
    tag: row.tag,
    properties: row.properties ? JSON.parse(row.properties) : [],
  };
};

const rowsToWbsItemArray = (rows: any[]): IWbsItem[] => {
  const items: IWbsItem[] = [];
  if (rows) {
    rows.map((row) => {
      items.push(rowToWbsItem(row));
    });
  }

  return items;
};

export class WbsItemsDb implements IWbsItemsRepository {

  private _tableName = "wbsitems";
  private _sqliteServices: SqliteServices;

  constructor(sqliteServices: SqliteServices) {
    this._sqliteServices = sqliteServices;
  }

  public async GetWbsItems(queryOptions?: IQueryOptions): Promise<IWbsItem[] | Error> {
    const query = this._sqliteServices.GetQueryString(this._tableName, queryOptions);
    console.log(`query = ${query}`);
    try {
      const result = await this._sqliteServices.Query(query);
      if (result instanceof Error) {
        return result;
      }
      return(rowsToWbsItemArray(result));
    } catch (err) {
      throw err;
    }
  }

  public async GetWbsItemById(id: string): Promise<IWbsItem | Error> {
    const query = `Select * from ${this._tableName} where id=${id}`;
    try {
      const result = await this._sqliteServices.Query(query);
      if (result instanceof Error) {
        return result;
      }
      if (result.length <= 0) {
        return new Error(`No record found for id:[${id}]`);
      }
      return(rowToWbsItem(result[0]));
    } catch (err) {
      throw err;
    }
  }

  public async AddWbsItem(item: IWbsItem): Promise<string | Error> {
    const className = item.className;
    const tag = item.tag;
    const properties = item.properties ? JSON.stringify(item.properties) : "";
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

  public async UpdateWbsItem(item: IWbsItem): Promise<IWbsItem | Error> {
    const className = item.className;
    const tag = item.tag;
    const properties = item.properties ? JSON.stringify(item.properties) : "";
    const query = `Update ${this._tableName}
                   Set className='${className}',
                       tag ='${tag}',
                       properties='${properties}'
                    Where id=${item.id}`;
    try {
      const result = await this._sqliteServices.Execute(query);
      if (result instanceof Error) {
        return result;
      }
      if (result.rowsAffected <= 0) {
        return new Error(`No record found for id:[${item.id}]`);
      }
      return(item);
    } catch (err) {
      throw err;
    }
  }

  public async DeleteWbsItem(id: string): Promise<boolean | Error> {
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
