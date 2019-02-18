import {Request, Response} from "express";

export interface IComponentsController {

  GetComponents: (req: Request, res: Response) => Response;
  GetComponentById: (req: Request, res: Response) => Response;
  AddComponent: (req: Request, res: Response) => Response;
  UpdateComponent: (req: Request, res: Response) => Response;
  DeleteComponent: (req: Request, res: Response) => Response;
}

export class ComponentsController implements IComponentsController {

  public GetComponents(req: Request, res: Response): Response {
    return res.status(400).json({message: `Components controller for GET /api/components is not yet implmented`});
  }

  public GetComponentById(req: Request, res: Response): Response {
    return res.status(400).json({message: `Components controller for GET /api/components/id is not yet implmented`});
  }

  public AddComponent(req: Request, res: Response): Response {
    return res.status(400).json({message: `Components controller for POST /api/components is not yet implmented`});
  }

  public UpdateComponent(req: Request, res: Response): Response {
    return res.status(400).json({message: `Components controller for PUT /api/components/id is not yet implmented`});
  }

  public DeleteComponent(req: Request, res: Response): Response {
    return res.status(400).json({message: `Components controller for DELETE /api/components/id is not yet implmented`});
  }

}
