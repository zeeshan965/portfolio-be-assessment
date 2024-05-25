import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import Page from './page.entity';
import { VersionType } from '../../helpers/enum';
import Portfolio from './portfolio.entity';
import { AbstractEntity } from './abstract-entity';

@ObjectType('PortfolioVersion')
@Entity('portfolio_versions')
export default class PortfolioVersion extends AbstractEntity {
  @Field()
  @Column('enum', { name: 'version_type', enum: VersionType })
  versionType: VersionType;

  @Column({ name: 'version_number', type: 'int' })
  versionNumber: number;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.portfolioVersions)
  portfolio: Portfolio;

  @ManyToOne(() => Page, (page) => page.portfolioVersions)
  page: Page;
}
