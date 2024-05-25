import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import Portfolio from '../entities/portfolio.entity';
import { PortfolioInput } from '../dto/portfolio.input';
import { PageInput } from '../dto/page.input';
import PortfolioVersion, { VersionType } from '../entities/portfolio-version.entity';
import Page from '../entities/page.entity';

@Resolver()
@Service()
export default class ListPortfoliosResolver {
  /**
   * @return Promise<Portfolio[]>
   */
  @Query(() => [Portfolio],{ description: 'List all portfolios' })
  async listPortfolios(): Promise<Portfolio[]> {
    const portfolioRepository = getRepository(Portfolio);

    return portfolioRepository
      .createQueryBuilder('p')
      .getMany();
  }

  /**
   * @param {PortfolioInput} data
   * @param {PageInput} pages
   * @return Promise<Portfolio>
   */
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
      versionType: VersionType.DRAFT,
      pages: []
    });
    await portfolioVersionRepository.save(draftVersion);

    const pagePromises = pages.map(pageData => {
      const page = pageRepository.create({
        ...pageData,
        version: draftVersion
      });
      return pageRepository.save(page);
    });
    await Promise.all(pagePromises);

    return portfolio;
  }

  /**
   * @param {number} id
   * @param {PortfolioInput} data
   * @param {PageInput[]} pages
   * @return Promise<Portfolio>
   */
  @Mutation(() => Portfolio)
  async updatePortfolio(
    @Arg('id') id: number,
    @Arg('data') data: PortfolioInput,
    @Arg('pages', () => [PageInput]) pages: PageInput[]
  ): Promise<Portfolio> {
    const portfolioRepository = getRepository(Portfolio);
    const portfolioVersionRepository = getRepository(PortfolioVersion);
    const pageRepository = getRepository(Page);

    const portfolio = await portfolioRepository.findOne(id);
    if (!portfolio) throw new Error('Portfolio not found');

    const draftVersion = await portfolioVersionRepository.findOne({
      where: { portfolio, versionType: VersionType.DRAFT },
      relations: ['pages']
    });
    if (!draftVersion) throw new Error('Draft version not found');

    portfolioRepository.merge(portfolio, data);
    await portfolioRepository.save(portfolio);

    const pagePromises = pages.map(pageData => {
      const page = pageRepository.create({
        ...pageData,
        version: draftVersion
      });
      return pageRepository.save(page);
    });

    // Remove old pages that are no longer in the updated set
    const pageUrls = pages.map(page => page.url);
    const pagesToRemove = draftVersion.pages.filter(page => !pageUrls.includes(page.url));
    await pageRepository.remove(pagesToRemove);

    // Save new and updated pages
    await Promise.all(pagePromises);

    return portfolio;
  }

}
