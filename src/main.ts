import { config } from "dotenv";
config()

import { init } from "./app";
import { AppDataSource } from "./utils/data-source";
import { scheduleNextUpdate } from "./utils/scheduler";
import {
  updateCurrencyRates,
  initCurrencyRatesInDB,
  getCourseForCurrentDay,
} from "./utils/currency-operations";
import { Publisher } from "./utils/publisher";


AppDataSource.initialize().then(async () => {
  await Publisher.connect()
  await initCurrencyRatesInDB();
  await getCourseForCurrentDay();
  scheduleNextUpdate(updateCurrencyRates);
  init();
}).catch((err) => {
  console.log(err);
});