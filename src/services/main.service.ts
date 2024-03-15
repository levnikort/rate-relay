import { Repository, ObjectLiteral } from "typeorm";
import { AppDataSource } from "../utils/data-source";
import { Rate } from "../entity/Rate";

class MainService {
  constructor(private readonly rateRepository: Repository<Rate>) {}

  async getRatesByDate(date: Date) {
    return this.rateRepository.find({
      where: {
        date: date,
      },
    });
  }

  async getRatesForCurrencyPairs(base: string, target: string) {
    let rates: Rate[];
    
    rates = await this.rateRepository.find({
      where: {
        date: new Date(),
      },
    });

    const baseRate = rates.find((el) => el.currency === base);
    const targetRate = rates.find((el) => el.currency === target);

    return {
      date: rates[0].date,
      rate: (parseFloat(targetRate.rate) / parseFloat(baseRate.rate)).toString(),
    };
  }
}

const mainService = new MainService(AppDataSource.getRepository(Rate));

export {
  MainService,
  mainService
}