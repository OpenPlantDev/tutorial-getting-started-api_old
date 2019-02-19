import { IWbsItem } from "../models/WbsItem";

export interface IWbsItemsRepository {

  GetWbsItems: () => Promise<IWbsItem[] | Error>;
  GetWbsItemById: (id: string) => Promise<IWbsItem | Error>;
  AddWbsItem: (item: IWbsItem) => Promise<string | Error>;
  UpdateWbsItem: (item: IWbsItem) => Promise<IWbsItem | Error>;
  DeleteWbsItem: (id: string) => Promise<boolean | Error>;
}
