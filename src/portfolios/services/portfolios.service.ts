import { getRepository } from 'typeorm';
import { Service } from 'typedi';
import Portfolio from '../entities/portfolio.entity';
import { CreatePortfolioDto, PageInputDto } from '../dto/create-portfolio.dto';
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

    // Create the portfolio
    const portfolio: Portfolio = await this.createOrUpdatePortfolio({ name, url });

    // Create the draft version
    const version: PortfolioVersion = await this.createOrUpdatePortfolioVersion(portfolio.id, {
      versionType: VersionType.DRAFT,
    });

    // Create the pages, linking them to version
    await this.createOrUpdatePages(pages, version);
    return portfolio;
  }

  /**
   * @return Promise<Portfolio[]>
   */
  async getAllAvailablePortfolioVersions(): Promise<Portfolio[]> {
    return this.portfolioRepository
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.portfolioVersions', 'pv')
      .innerJoinAndSelect('pv.portfolioPages', 'pp')
      .innerJoinAndSelect('pp.page', 'pg')
      .where('pv.version_type = :type', { type: VersionType.SNAPSHOT })
      .getMany();
  }

  /**
   * @param {number} id
   * @return Promise<Portfolio>
   */
  async getPortfolioById(id: number): Promise<Portfolio> {
    return this.portfolioRepository.findOneOrFail(id, {
      relations: ['portfolioVersions', 'portfolioVersions.portfolioPages', 'portfolioVersions.portfolioPages.page'],
    });
  }

  /**
   * @param {number} versionId
   * @return Promise<Portfolio>
   */
  async getPortfolioPagesByVersion(versionId: number): Promise<PortfolioVersion> {
    return this.portfolioVersionRepository.findOneOrFail(versionId, {
      relations: ['portfolio', 'portfolioPages', 'portfolioPages.page'],
    });
  }

  /**
   * @param {number} portfolioId
   * @param {CreatePortfolioDto} updatePortfolioDto
   * @return Promise<Portfolio>
   */
  async updatePortfolioDto(portfolioId: number, updatePortfolioDto: CreatePortfolioDto): Promise<any> {
    const { name, url, pages } = updatePortfolioDto;
    const { id, portfolioVersions } = await this.portfolioRepository.findOneOrFail({
      where: { id: portfolioId },
      relations: ['portfolioVersions', 'portfolioVersions.portfolioPages', 'portfolioVersions.portfolioPages.page'],
    });

    const portfolio: Portfolio = await this.createOrUpdatePortfolio({ id, name, url });
    const version: PortfolioVersion = await this.createOrUpdatePortfolioVersion(id, {
      versionType: VersionType.DRAFT,
    });
    await this.createOrUpdatePages(pages, version);

    // Check for an existing draft version
    const draftVersion = this.filterPortfolioVersion(portfolioVersions, VersionType.DRAFT);
    if (draftVersion) {
      await this.createOrUpdatePortfolioVersion(id, { versionType: VersionType.SNAPSHOT, id: draftVersion.id });
    }

    return portfolio;
  }

  /**
   * @param {number} portfolioId
   * @return Promise<Portfolio>
   */
  async publishPortfolio(portfolioId: number): Promise<Portfolio> {
    const portfolio = await this.portfolioRepository.findOneOrFail({
      where: { id: portfolioId },
      relations: ['portfolioVersions', 'portfolioVersions.portfolioPages', 'portfolioVersions.portfolioPages.page'],
    });
    const { id, portfolioVersions } = portfolio;
    const draftVersion = this.filterPortfolioVersion(portfolioVersions, VersionType.DRAFT);
    const publishVersion = this.filterPortfolioVersion(portfolioVersions, VersionType.PUBLISHED);
    if (draftVersion) {
      const { portfolioPages } = draftVersion;
      const pages = portfolioPages.map((portfolioPage) => portfolioPage.page);

      const version: PortfolioVersion = await this.createOrUpdatePortfolioVersion(id, {
        versionType: VersionType.SNAPSHOT,
      });
      await this.createOrUpdatePages(pages, version);
      await this.createOrUpdatePortfolioVersion(id, { versionType: VersionType.PUBLISHED, id: draftVersion.id });
      if (publishVersion) {
        await this.createOrUpdatePortfolioVersion(id, { versionType: VersionType.SNAPSHOT, id: publishVersion.id });
      }
    }
    return portfolio;
  }

  /**
   * @param {PortfolioVersion[]} portfolioVersions
   * @param {VersionType} versionType
   * @return Promise<PortfolioVersion>
   * @private
   */
  private filterPortfolioVersion(portfolioVersions: PortfolioVersion[], versionType: VersionType): PortfolioVersion {
    const draftVersionIndex = portfolioVersions.findIndex((portVersion) => portVersion.versionType === versionType);
    return portfolioVersions[draftVersionIndex];
  }

  /**
   * @param {object} args
   * @return Promise<Portfolio>
   * @private
   */
  private async createOrUpdatePortfolio(args: object): Promise<Portfolio> {
    return this.portfolioRepository.save({ ...args });
  }

  /**
   * @param {number} portfolioId
   * @param {object} args
   * @return Promise<PortfolioVersion>
   * @private
   */
  private async createOrUpdatePortfolioVersion(portfolioId: number, args: object): Promise<PortfolioVersion> {
    return this.portfolioVersionRepository.save({
      ...args,
      portfolio: { id: portfolioId },
    });
  }

  /**
   * @param {PageInputDto[]} pages
   * @param {PortfolioVersion} version
   * @return Promise<void>
   * @private
   */
  private async createOrUpdatePages(pages: PageInputDto[], version: PortfolioVersion): Promise<void> {
    await pages.reduce(async (previousPromise, page) => {
      await previousPromise;
      const insertPage: Page = await this.pageRepository.save({ ...page });
      await this.portfolioPageRepository.save({
        version: { id: version.id },
        page: { id: insertPage.id },
      });
    }, Promise.resolve());
  }
}
