import { Arg, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Service } from 'typedi';
import PortfolioVersionEntity from '../entities/PortfolioVersionEntity';
import PageEntity from '../entities/PageEntity';

@Resolver()
@Service()
export default class PortfolioVersionResolver {
  @Query(() => [PortfolioVersionEntity])
  async portfolioVersions(): Promise<PortfolioVersionEntity[]> {
    const portfolioVersionRepository = getRepository(PortfolioVersionEntity);
    return portfolioVersionRepository.find({ relations: ['pages'] });
  }

  @Query(() => [PageEntity])
  async portfolioPages(@Arg('versionId') versionId: number): Promise<PageEntity[]> {
    const pageRepository = getRepository(PageEntity);
    return pageRepository.find({ where: { version: { id: versionId } } });
  }
}
