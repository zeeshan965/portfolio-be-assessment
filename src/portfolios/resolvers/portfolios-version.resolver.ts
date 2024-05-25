import { Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Service } from 'typedi';
import PortfolioVersionEntity from '../entities/portfolio-version.entity';

@Resolver()
@Service()
export default class PortfolioVersionResolver {
  /**
   * @return Promise<PortfolioVersionEntity[]>
   */
  @Query(() => [PortfolioVersionEntity])
  async portfolioVersions(): Promise<PortfolioVersionEntity[]> {
    const portfolioVersionRepository = getRepository(PortfolioVersionEntity);
    return portfolioVersionRepository.find({ relations: ['pages'] });
  }
}
