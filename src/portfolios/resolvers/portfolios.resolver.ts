import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import Portfolio from '../entities/portfolio.entity';

@Resolver()
@Service()
export default class ListPortfoliosResolver {
  @Query(() => [Portfolio],{ description: 'List all portfolios' })
  async listPortfolios(): Promise<Portfolio[]> {
    const portfolioRepository = getRepository(Portfolio);

    return portfolioRepository
      .createQueryBuilder('p')
      .getMany();
  }

  @Query(() => String)
  index(): string {
    return 'Nest JS GQL';
  }
}
