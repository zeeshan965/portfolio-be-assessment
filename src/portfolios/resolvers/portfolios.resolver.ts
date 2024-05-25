import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import Portfolio from '../entities/portfolio.entity';
import { PortfolioInput } from '../dto/portfolio.input';
import { PageInput } from '../dto/page.input';
import PortfolioVersion from '../entities/portfolio-version.entity';
import Page from '../entities/page.entity';

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

  @Mutation(() => Portfolio)
  async createPortfolio(
    @Arg('data') data: PortfolioInput,
    @Arg('pages', () => [PageInput]) pages: PageInput[]
  ): Promise<Portfolio> {
    const portfolioRepository = getRepository(Portfolio);
    const portfolioVersionRepository = getRepository(PortfolioVersion);
    const pageRepository = getRepository(Page);

    const portfolio = portfolioRepository.create(data);
    await portfolioRepository.save(portfolio);

    const draftVersion = portfolioVersionRepository.create({
      portfolio,
      versionType: 'draft',
      pages: []
    });
    await portfolioVersionRepository.save(draftVersion);

    for (const pageData of pages) {
      const page = pageRepository.create({
        ...pageData,
        version: draftVersion
      });
      await pageRepository.save(page);
    }

    return portfolio;
  }

}
