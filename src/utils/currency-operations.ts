import { Rate } from "../entity/Rate";
import { currencyfreaksService } from "../services/currencyfreaks.service";
import { AppDataSource } from "./data-source";
import { Publisher } from "./publisher";

const data = [
  {
    base_currency: "USD",
    currency: "RUB",
    rate: "89.64824114820752",
    date: "2024-03-13 00:00:00+00",
  },
  {
    base_currency: "USD",
    currency: "USD",
    rate: "1.0",
    date: "2024-03-13 00:00:00+00",
  },
  {
    base_currency: "USD",
    currency: "EUR",
    rate: "0.9151507761140946",
    date: "2024-03-13 00:00:00+00",
  },
  {
    base_currency: "USD",
    currency: "JPY",
    rate: "147.64349979342043",
    date: "2024-03-13 00:00:00+00",
  },

  {
    base_currency: "USD",
    currency: "RUB",
    rate: "88.64824114820752",
    date: "2024-03-12 00:00:00+00",
  },
  {
    base_currency: "USD",
    currency: "USD",
    rate: "1.0",
    date: "2024-03-12 00:00:00+00",
  },
  {
    base_currency: "USD",
    currency: "EUR",
    rate: "0.8151507761140946",
    date: "2024-03-12 00:00:00+00",
  },
  {
    base_currency: "USD",
    currency: "JPY",
    rate: "137.64349979342043",
    date: "2024-03-12 00:00:00+00",
  },

  {
    base_currency: "USD",
    currency: "RUB",
    rate: "85.64824114820752",
    date: "2024-03-11 00:00:00+00",
  },
  {
    base_currency: "USD",
    currency: "USD",
    rate: "1.0",
    date: "2024-03-11 00:00:00+00",
  },
  {
    base_currency: "USD",
    currency: "EUR",
    rate: "0.6651507761140946",
    date: "2024-03-11 00:00:00+00",
  },
  {
    base_currency: "USD",
    currency: "JPY",
    rate: "107.64349979342043",
    date: "2024-03-11 00:00:00+00",
  },

  {
    base_currency: "USD",
    currency: "RUB",
    rate: "77.64824114820752",
    date: "2024-03-10 00:00:00+00",
  },
  {
    base_currency: "USD",
    currency: "USD",
    rate: "1.0",
    date: "2024-03-10 00:00:00+00",
  },
  {
    base_currency: "USD",
    currency: "EUR",
    rate: "0.5151507761140946",
    date: "2024-03-10 00:00:00+00",
  },
  {
    base_currency: "USD",
    currency: "JPY",
    rate: "200.64349979342043",
    date: "2024-03-10 00:00:00+00",
  },
];

async function initCurrencyRatesInDB() {
  const rateRepository = AppDataSource.getRepository(Rate);

  for (const element of data) {
    const rate = new Rate();
    rate.base_currency = element.base_currency;
    rate.currency = element.currency;
    rate.rate = element.rate;
    rate.date = new Date(element.date);

    await rateRepository.save(rate);
  }
}

async function updateCurrencyRates() {
  const result = await currencyfreaksService.getRates();
  const rateRepository = AppDataSource.getRepository(Rate);

  for (const key of Object.keys(result.rates)) {
    const r = new Rate();
    r.base_currency = result.base;
    r.currency = key;
    r.rate = result.rates[key];
    r.date = new Date(result.date);

    await Publisher.publish("new_currency", JSON.stringify(r))
    await rateRepository.save(r);
  }
}

async function getCourseForCurrentDay() {
  const rateRepository = AppDataSource.getRepository(Rate);

  const resultCount = await rateRepository.count({
    where: {
      date: new Date(),
    }
  })

  if (resultCount > 0) return;

  await updateCurrencyRates();
}

export { initCurrencyRatesInDB, updateCurrencyRates, getCourseForCurrentDay };
