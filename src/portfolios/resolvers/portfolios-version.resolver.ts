import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Service } from 'typedi';
import PortfolioVersionEntity, { VersionType } from '../entities/portfolio-version.entity';
import Page from '../entities/page.entity';

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

  /**
   * @param {number} draftVersionId
   * @return Promise<PortfolioVersionEntity>
   */
  @Mutation(() => PortfolioVersionEntity)
  async createSnapshotVersion(@Arg('draftVersionId') draftVersionId: number): Promise<PortfolioVersionEntity> {
    const portfolioVersionRepository = getRepository(PortfolioVersionEntity);
    const pageRepository = getRepository(Page);

    // Find the draft version by ID
    const draftVersion = await portfolioVersionRepository.findOne(draftVersionId, { relations: ['portfolio', 'pages'] });
    if (!draftVersion || draftVersion.versionType !== VersionType.DRAFT) {
      throw new Error('Draft version not found');
    }

    // Create a new snapshot version
    const snapshotVersion = portfolioVersionRepository.create({
      portfolio: draftVersion.portfolio,
      versionType: VersionType.SNAPSHOT
    });

    await portfolioVersionRepository.save(snapshotVersion);

    // Copy all pages from the draft version to the new snapshot version
    const pagePromises = draftVersion.pages.map(page => {
      const newPage = pageRepository.create({
        name: page.name,
        url: page.url,
        version: snapshotVersion
      });
      return pageRepository.save(newPage);
    });

    await Promise.all(pagePromises);
    return snapshotVersion;
  }
}
