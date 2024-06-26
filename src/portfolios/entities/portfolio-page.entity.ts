import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { AbstractEntity } from './abstract-entity';
import PortfolioVersion from './portfolio-version.entity';
import Page from './page.entity';

@ObjectType('PortfolioPage')
@Entity('portfolio_pages')
export default class PortfolioPage extends AbstractEntity {
  @ManyToOne(() => PortfolioVersion, (portfolioVersion) => portfolioVersion.portfolioPages)
  @JoinColumn({ name: 'version_id' })
  version: PortfolioVersion;

  @Field(() => Page)
  @ManyToOne(() => Page, (page) => page.portfolioPages)
  @JoinColumn({ name: 'page_id' })
  page: Page;
}
