import sqlite3 from "sqlite3";

export interface IExecuteResults {
  rowsAffected: number;
  lastId: string;
}

export class SqliteServices {

  private _db: sqlite3.Database | undefined = undefined;

  constructor(path: string) {
    this.Connect(path);
  }

  public Connect(path: string): boolean | Error {

    const db: sqlite3.Database = new sqlite3.Database(path);
    if (!db) {
      return (new Error(`Unable to connect to ${path}`));
    }
    this._db = db;
    return true;
  }

  public async Query(sql: string): Promise<any[] | Error> {
    return new Promise((resolve, reject) => {
      if (this._db === undefined) {
        reject(new Error("Not connected"));
      } else {
        this._db.all(sql, [], (err, rows) => {
          if (err) {
            console.log(`Query error: ${err.message}`);
            resolve(err);
          } else {
            resolve(rows);
          }
      });
      }
    });
  }

  public async Execute(sql: string, params: any = []): Promise<IExecuteResults> {
    return new Promise((resolve, reject) => {
      if (this._db === undefined) {
        reject(new Error("Not connected"));
      } else {
        // can't use arrow function here because this is updated by calling method
        // tslint:disable-next-line:only-arrow-functions
        this._db.run(sql, params, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({rowsAffected: this.changes, lastId: this.lastID.toString()});
          }
        });
      }
    });
  }
}
