import {IComponent} from "../../../src/api/models/Component";
import {IComponentsRepository} from "../../../src/api/repositories/IComponentsRepository";
import {Guid} from "guid-typescript";

export enum MockRepoErrorState {
  NoError,
  ReturnError,
  ThrowError,
}

export class MockRepo implements IComponentsRepository {

  private _errorState: MockRepoErrorState = MockRepoErrorState.NoError;
  constructor() {
  }

  public SetErrorState(errorState: MockRepoErrorState) {
    this._errorState = errorState;
  }

  private ReturnSomething(validData: any): any {
    switch (this._errorState) {
      case MockRepoErrorState.ReturnError: {
        return new Error("Returned error");
      }
      case MockRepoErrorState.ThrowError: {
        throw new Error("Thrown repository error");
      }
      default: {
        // return valid data
        validData;
      }
    }
  }

  public GetComponents(): IComponent[] | Error {
    return this.ReturnSomething([]);
  }

  public GetComponentById(id: string): IComponent | Error {
    return this.ReturnSomething({id, className: "", tag: ""});
  }

  public AddComponent(comp: IComponent): string | Error {
    return this.ReturnSomething(Guid.create().toString());
  }

  public UpdateComponent(comp: IComponent): IComponent | Error {
    return this.ReturnSomething(comp);
  }

  public DeleteComponent(id: string): boolean | Error {
    return this.ReturnSomething(true);
  }

}
