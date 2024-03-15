import { Server } from "@hapi/hapi";
import * as Joi  from 'joi';
import { mainController } from "../controllers/main.controller";
import { format } from "path";

const mainRoutes = (server: Server) => {
  server.route({
    method: "GET",
    path: "/rates",
    options: {
      validate: {
        query: Joi.object({
          date: Joi.date().required(),
        }),
      },
    },
    handler: (req, h) => mainController.getRatesByDate(req, h),
  });

  server.route({
    method: "GET",
    path: "/currency-pairs-rates",
    options: {
      validate: {
        query: Joi.object({
          base: Joi.string()
            .valid(...process.env.CURRENCY_NAMES.split(","))
            .required(),
          target: Joi.string()
            .valid(...process.env.CURRENCY_NAMES.split(","))
            .required(),
        }),
      },
    },
    handler: (req, h) => mainController.getRatesForCurrencyPairs(req, h),
  });
};

export { mainRoutes };
