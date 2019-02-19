import "mocha";
import {expect} from "chai";
import * as sinon from "sinon";
import { Request, Response, NextFunction } from "express";
import {ComponentsController} from "../../../src/api/controllers/ComponentsController";
import {ApiError} from "../../../src/api/ApiError";
import {MockRepo, MockRepoErrorState} from "./MockRepo";

describe("ComponentsController Tests", () => {

  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: sinon.SinonSpy;
  let mockRepo: MockRepo;
  let componentsController: ComponentsController;

  beforeEach(() => {
    req = {body: {}};

    // this way does not allow for chaining res calls, for example: res.status(200).json(data);
    // res = {
    //   status: sinon.spy(),
    //   json: sinon.spy(),
    // };

    // use stub for res.status to support chained call like res.status(200).json(data)
    // note that calls to json and next can be mocked with spies because they end the chain
    const statusStub = sinon.stub();
    const jsonSpy = sinon.spy();
    res = {
      status: statusStub,
      json: jsonSpy,
    };
    statusStub.returns(res);

    // this could be written like this
    // const status = sinon.stub();
    // const json = sinon.spy();
    // res = { status, json };
    // status.returns(res);

    next = sinon.spy();

    mockRepo = new MockRepo();
    componentsController = new ComponentsController(mockRepo);
  });

  describe("GetComponents Tests", () => {
    it("should set status to 200 if no error", () => {

      componentsController.GetComponents(req as Request, res as Response, next as NextFunction);
      expect((res.status as sinon.SinonStub).calledWith(200), `Expecting status 200, status returned ${(res.status as sinon.SinonStub).args[0]}`).to.be.true;
    });

    it("should call next with ApiError with status 400 if repository returns an error", () => {

      mockRepo.SetErrorState(MockRepoErrorState.ReturnError);
      componentsController.GetComponents(req as Request, res as Response, next as NextFunction);
      expect(next.calledWith(sinon.match.instanceOf(ApiError)), `Expecting error of type ApiError`).to.be.true;
      expect(next.calledWith(sinon.match.has("status", 400)), `Expecting status 400, status returned ${next.args[0][0].status}`).to.be.true;
    });

    it("should call next with ApiError with status 500 if repository throws an error", () => {

      mockRepo.SetErrorState(MockRepoErrorState.ThrowError);
      componentsController.GetComponents(req as Request, res as Response, next as NextFunction);
      expect(next.calledWith(sinon.match.instanceOf(ApiError)), `Expecting error of type ApiError`).to.be.true;
      expect(next.calledWith(sinon.match.has("status", 500)), `Expecting status 500, status returned ${next.args[0][0].status}`).to.be.true;
    });

  });


  describe("GetComponentById Tests", () => {
    beforeEach(() => {
      // set the id params on req
      req = {params: {id: "1"}};
    });

    it("should set status to 200 if no error", () => {
      componentsController.GetComponentById(req as Request, res as Response, next as NextFunction);
      expect((res.status as sinon.SinonStub).calledWith(200), `Expecting status 200, status returned ${(res.status as sinon.SinonStub).args[0]}`).to.be.true;
    });

    it("should call next with ApiError with status 404 if repository returns an error", () => {
      mockRepo.SetErrorState(MockRepoErrorState.ReturnError);
      componentsController.GetComponentById(req as Request, res as Response, next as NextFunction);
      expect(next.calledWith(sinon.match.instanceOf(ApiError)), `Expecting error of type ApiError`).to.be.true;
      expect(next.calledWith(sinon.match.has("status", 404)), `Expecting status 404, status returned ${next.args[0][0].status}`).to.be.true;
    });

    it("should call next with ApiError with status 500 if repository throws an error", () => {
      mockRepo.SetErrorState(MockRepoErrorState.ThrowError);
      componentsController.GetComponentById(req as Request, res as Response, next as NextFunction);
      expect(next.calledWith(sinon.match.instanceOf(ApiError)), `Expecting error of type ApiError`).to.be.true;
      expect(next.calledWith(sinon.match.has("status", 500)), `Expecting status 500, status returned ${next.args[0][0].status}`).to.be.true;
    });
  });

  describe("AddComponent Tests", () => {
    it("should set status to 201 if no error", () => {

      componentsController.AddComponent(req as Request, res as Response, next as NextFunction);
      expect((res.status as sinon.SinonStub).calledWith(201), `Expecting status 201, status returned ${(res.status as sinon.SinonStub).args[0]}`).to.be.true;
    });

    it("should call next with ApiError with status to 400 if no body in request", () => {

      // override req to be an empty object (no body)
      req = {};
      componentsController.AddComponent(req as Request, res as Response, next as NextFunction);
      expect(next.calledWith(sinon.match.instanceOf(ApiError)), `Expecting error of type ApiError`).to.be.true;
      expect(next.calledWith(sinon.match.has("status", 400)), `Expecting status 400, status returned ${next.args[0][0].status}`).to.be.true;
    });

    it("should call next with ApiError with status 400 if repository returns an error", () => {

      mockRepo.SetErrorState(MockRepoErrorState.ReturnError);
      componentsController.AddComponent(req as Request, res as Response, next as NextFunction);
      expect(next.calledWith(sinon.match.instanceOf(ApiError)), `Expecting error of type ApiError`).to.be.true;
      expect(next.calledWith(sinon.match.has("status", 400)), `Expecting status 400, status returned ${next.args[0][0].status}`).to.be.true;
    });

    it("should call next with ApiError with status 500 if repository throws an error", () => {

      mockRepo.SetErrorState(MockRepoErrorState.ThrowError);
      componentsController.AddComponent(req as Request, res as Response, next as NextFunction);
      expect(next.calledWith(sinon.match.instanceOf(ApiError)), `Expecting error of type ApiError`).to.be.true;
      expect(next.calledWith(sinon.match.has("status", 500)), `Expecting status 500, status returned ${next.args[0][0].status}`).to.be.true;
    });
  });

  describe("UpdateComponent Tests", () => {
    beforeEach(() => {
      // set the id params on req
      req = {params: {id: "1"}, body: {}};
    });

    it("should set status to 200 if no error", () => {

      componentsController.UpdateComponent(req as Request, res as Response, next as NextFunction);
      expect((res.status as sinon.SinonStub).calledWith(200), `Expecting status 200, status returned ${(res.status as sinon.SinonStub).args[0]}`).to.be.true;
    });

    it("should call next with ApiError with status to 400 if no body in request", () => {

      // override req to have no body
      req = {params: {id: "1"}};
      componentsController.UpdateComponent(req as Request, res as Response, next as NextFunction);
      expect(next.calledWith(sinon.match.instanceOf(ApiError)), `Expecting error of type ApiError`).to.be.true;
      expect(next.calledWith(sinon.match.has("status", 400)), `Expecting status 400, status returned ${next.args[0][0].status}`).to.be.true;
    });

    it("should call next with ApiError with status 400 if repository returns an error", () => {

      mockRepo.SetErrorState(MockRepoErrorState.ReturnError);
      componentsController.UpdateComponent(req as Request, res as Response, next as NextFunction);
      expect(next.calledWith(sinon.match.instanceOf(ApiError)), `Expecting error of type ApiError`).to.be.true;
      expect(next.calledWith(sinon.match.has("status", 404)), `Expecting status 404, status returned ${next.args[0][0].status}`).to.be.true;
    });

    it("should call next with ApiError with status 500 if repository throws an error", () => {

      mockRepo.SetErrorState(MockRepoErrorState.ThrowError);
      componentsController.UpdateComponent(req as Request, res as Response, next as NextFunction);
      expect(next.calledWith(sinon.match.instanceOf(ApiError)), `Expecting error of type ApiError`).to.be.true;
      expect(next.calledWith(sinon.match.has("status", 500)), `Expecting status 500, status returned ${next.args[0][0].status}`).to.be.true;
    });
  });

  describe("DeleteComponent Tests", () => {
    beforeEach(() => {
      // set the id params on req
      req = {params: {id: "1"}};
    });

    it("should set status to 200 if no error", () => {
      componentsController.DeleteComponent(req as Request, res as Response, next as NextFunction);
      expect((res.status as sinon.SinonStub).calledWith(200), `Expecting status 200, status returned ${(res.status as sinon.SinonStub).args[0]}`).to.be.true;
    });

    it("should call next with ApiError with status 404 if repository returns an error", () => {
      mockRepo.SetErrorState(MockRepoErrorState.ReturnError);
      componentsController.DeleteComponent(req as Request, res as Response, next as NextFunction);
      expect(next.calledWith(sinon.match.instanceOf(ApiError)), `Expecting error of type ApiError`).to.be.true;
      expect(next.calledWith(sinon.match.has("status", 404)), `Expecting status 404, status returned ${next.args[0][0].status}`).to.be.true;
    });

    it("should call next with ApiError with status 500 if repository throws an error", () => {
      mockRepo.SetErrorState(MockRepoErrorState.ThrowError);
      componentsController.DeleteComponent(req as Request, res as Response, next as NextFunction);
      expect(next.calledWith(sinon.match.instanceOf(ApiError)), `Expecting error of type ApiError`).to.be.true;
      expect(next.calledWith(sinon.match.has("status", 500)), `Expecting status 500, status returned ${next.args[0][0].status}`).to.be.true;
    });
  });


});
