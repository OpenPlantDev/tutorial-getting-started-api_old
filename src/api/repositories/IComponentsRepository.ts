import { IComponent } from "../models/Component";

export interface IComponentsRepository {

  GetComponents: () => Promise<IComponent[] | Error>;
  GetComponentById: (id: string) => Promise<IComponent | Error>;
  AddComponent: (comp: IComponent) => Promise<string | Error>;
  UpdateComponent: (comp: IComponent) => Promise<IComponent | Error>;
  DeleteComponent: (id: string) => Promise<boolean | Error>;
}
