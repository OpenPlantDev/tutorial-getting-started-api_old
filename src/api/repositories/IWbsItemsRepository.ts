import { IWbsItem } from "../models/WbsItem";

export interface IWbsItemsRepository {

  GetWbsItems: () => IWbsItem[] | Error;
  GetWbsItemById: (id: string) => IWbsItem | Error;
  AddWbsItem: (item: IWbsItem) => string | Error;
  UpdateWbsItem: (item: IWbsItem) => IWbsItem | Error;
  DeleteWbsItem: (id: string) => boolean | Error;
}
