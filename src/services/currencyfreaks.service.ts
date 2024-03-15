interface CurrencyRatesResponse {
  date: string;
  base: string;
  rates: Record<string, string>
}


class CurrencyfreaksService {
  constructor(
    private readonly apiKey: string,
    private readonly currencyNames: string[]
  ) {}

  async getRates(): Promise<CurrencyRatesResponse> {
    try {
      const resp = await fetch(
        `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${
          this.apiKey
        }&symbols=${this.currencyNames.join(",")}
      `
      );

      if (!resp.ok) {
        throw new Error("Failed to fetch rates: Bad response from server");
      }

      return resp.json();
    } catch (err) {
      throw new err();
    }
  }
}

const currencyfreaksService = new CurrencyfreaksService(
  process.env.API_KEY,
  process.env.CURRENCY_NAMES.split(",")
);

export {
  CurrencyfreaksService,
  currencyfreaksService
}