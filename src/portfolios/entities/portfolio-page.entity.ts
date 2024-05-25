import { Entity, ManyToOne } from 'typeorm';
import { ObjectType } from 'type-graphql';
import { AbstractEntity } from './abstract-entity';
import PortfolioVersion from './portfolio-version.entity';
import Page from './page.entity';

@ObjectType('PortfolioPage')
@Entity('portfolio_pages')
export default class PortfolioPage extends AbstractEntity {
  @ManyToOne(() => PortfolioVersion, (portfolioVersion) => portfolioVersion.portfolioPages)
  version: PortfolioVersion;

  @ManyToOne(() => Page, (page) => page.portfolioPages)
  page: Page;
}
