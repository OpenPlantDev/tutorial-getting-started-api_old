import {Request, Response} from "express";

export interface IWbsItemsController {

  GetWbsItems: (req: Request, res: Response) => Response;
  GetWbsItemById: (req: Request, res: Response) => Response;
  AddWbsItem: (req: Request, res: Response) => Response;
  UpdateWbsItem: (req: Request, res: Response) => Response;
  DeleteWbsItem: (req: Request, res: Response) => Response;
}

export class WbsItemsController implements IWbsItemsController {

  public GetWbsItems(req: Request, res: Response): Response {
    return res.status(400).json({message: `WbsItems controller for GET /api/wbsitems is not yet implmented`});
  }

  public GetWbsItemById(req: Request, res: Response): Response {
    return res.status(400).json({message: `WbsItems controller for GET /api/wbsitems/id is not yet implmented`});
  }

  public AddWbsItem(req: Request, res: Response): Response {
    return res.status(400).json({message: `WbsItems controller for POST /api/wbsitems is not yet implmented`});
  }

  public UpdateWbsItem(req: Request, res: Response): Response {
    return res.status(400).json({message: `WbsItems controller for PUT /api/wbsitems/id is not yet implmented`});
  }

  public DeleteWbsItem(req: Request, res: Response): Response {
    return res.status(400).json({message: `WbsItems controller for DELETE /api/wbsitems/id is not yet implmented`});
  }

}
