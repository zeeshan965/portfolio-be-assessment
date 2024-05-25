import { getRepository } from 'typeorm';
import { Service } from 'typedi';
import Portfolio from '../entities/portfolio.entity';
import { PageInputDto, CreatePortfolioDto } from '../dto/create-portfolio.dto';
import PortfolioPage from '../entities/portfolio-page.entity';
import PortfolioVersion from '../entities/portfolio-version.entity';
import Page from '../entities/page.entity';

@Service()
export class PortfolioService {
  /**
   * @private
   * @readonly
   * @param {getRepository(Portfolio)} portfolioRepository
   */
  private readonly portfolioRepository = getRepository(Portfolio);

  /**
   * @private
   * @readonly
   * @param {getRepository(PortfolioVersion)} portfolioVersionRepository
   */
  private readonly portfolioVersionRepository = getRepository(PortfolioVersion);

  /**
   * @private
   * @readonly
   * @param {getRepository(Page)} pageRepository
   */
  private readonly pageRepository = getRepository(Page);

  /**
   * @private
   * @readonly
   * @param {getRepository(PortfolioPage)} portfolioPageRepository
   */
  private readonly portfolioPageRepository = getRepository(PortfolioPage);

  /**
   * @param {CreatePortfolioDto} createPortfolioDto
   * @return Promise<Portfolio>
   */
  async createPortFolio(createPortfolioDto: CreatePortfolioDto): Promise<Portfolio> {
    const { name, url, pages } = createPortfolioDto;
    console.log(name, url);
    // Create and save the portfolio
    // this.portfolioRepository.create({ name, url });
    const portfolio = await this.portfolioRepository.save({
      name,
      url,
    });

    // Create and save the draft version
    const version = await this.portfolioVersionRepository.save({
      ...portfolio,
      version_type: 'draft',
    });

    // Create and save the pages, linking them to the draft version
    pages.map(async (page: PageInputDto) => {
      const insertPage = await this.pageRepository.save({
        ...page,
      });
      await this.portfolioPageRepository.save({
        ...version,
        ...insertPage,
      });
    });
    return portfolio;
  }
}
