import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { MainService, mainService } from "../services/main.service";

class MainController {
  constructor(private readonly ms: MainService) {}

  async getRatesByDate(
    req: Request,
    h: ResponseToolkit
  ): Promise<ResponseObject> {
    try {
      return h.response(
        await mainService.getRatesByDate(req.query.date)
      );
    } catch (err) {
      console.error(err);
      return h.response({ error: "Internal Server Error" });
    }
  }

  async getRatesForCurrencyPairs(req: Request, h: ResponseToolkit) {
    let result: {date: Date, rate: string};
    
    try {
      result = await mainService.getRatesForCurrencyPairs(
        req.query.base,
        req.query.target
      );
    } catch (err) {
      console.error(err);
      return h.response({ error: "Internal Server Error" });
    }

    return h.response({
      base: req.query.base,
      data: result.date,
      rate: {
        [req.query.target]: result.rate,
      },
    });
  }
}

const mainController = new MainController(mainService);

export {
  MainController,
  mainController
}