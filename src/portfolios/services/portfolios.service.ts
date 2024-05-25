import { getRepository } from 'typeorm';
import { Service } from 'typedi';
import Portfolio from '../entities/portfolio.entity';
import { PageInputDto, CreatePortfolioDto } from '../dto/create-portfolio.dto';
import PortfolioPage from '../entities/portfolio-page.entity';
import PortfolioVersion from '../entities/portfolio-version.entity';
import Page from '../entities/page.entity';
import { VersionType } from '../../helpers/enum';

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

    // Create and save the portfolio
    const portfolio = await this.portfolioRepository.save({
      name,
      url,
    });

    // Create and save the draft version
    const version = await this.portfolioVersionRepository.save({
      version_type: 'draft',
      portfolio: {
        id: portfolio.id,
      },
    });

    // Create and save the pages, linking them to the draft version
    pages.map(async (page: PageInputDto) => {
      const insertPage = await this.pageRepository.save({
        ...page,
      });
      await this.portfolioPageRepository.save({
        version: {
          id: version.id,
        },
        page: {
          id: insertPage.id,
        },
      });
    });
    return portfolio;
  }

  /**
   * @return Promise<Portfolio[]>
   */
  async listPublishedPortfolio(): Promise<Portfolio[]> {
    return this.portfolioRepository
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.portfolioVersions', 'pv', 'pv.version_type = :type', { type: VersionType.PUBLISHED })
      .getMany();
  }

  async getPortfolioById(id: number): Promise<Portfolio> {
    const portfolioRepository = getRepository(Portfolio);
    const data = await portfolioRepository.findOne({
      relations: ['portfolioVersions', 'portfolioVersions.portfolioPages'],
      where: { id },
    });
    console.log(data);
    return this.portfolioRepository.findOneOrFail(id, {
      relations: ['portfolioVersions', 'portfolioVersions.portfolioPages', 'portfolioVersions.portfolioPages.page'],
    });
  }
}
