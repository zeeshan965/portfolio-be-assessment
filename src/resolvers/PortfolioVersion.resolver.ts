import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import PortfolioVersionEntity from '../entities/PortfolioVersionEntity';
import PageEntity from '../entities/PageEntity';

@Resolver()
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

  @Mutation(() => PortfolioVersionEntity)
  async createSnapshotVersion(@Arg('draftVersionId') draftVersionId: number): Promise<PortfolioVersionEntity> {
    const portfolioVersionRepository = getRepository(PortfolioVersionEntity);
    const pageRepository = getRepository(PageEntity);

    const draftVersion = await portfolioVersionRepository.findOne(draftVersionId, { relations: ['portfolio', 'pages'] });
    if (!draftVersion) {
      throw new Error('Draft version not found');
    }

    const snapshotVersion = portfolioVersionRepository.create({
      portfolio: draftVersion.portfolio,
      versionType: 'snapshot',
      pages: []
    });

    await portfolioVersionRepository.save(snapshotVersion);

    for (const page of draftVersion.pages) {
      const newPage = pageRepository.create({
        name: page.name,
        url: page.url,
        version: snapshotVersion
      });
      await pageRepository.save(newPage);
    }

    return snapshotVersion;
  }
}
