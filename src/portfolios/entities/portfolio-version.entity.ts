import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { VersionType } from '../../helpers/enum';
import Portfolio from './portfolio.entity';
import { AbstractEntity } from './abstract-entity';
import PortfolioPage from './portfolio-page.entity';

@ObjectType('PortfolioVersion')
@Entity('portfolio_versions')
export default class PortfolioVersion extends AbstractEntity {
  @Field()
  @Column('enum', { name: 'version_type', enum: VersionType })
  versionType: VersionType;

  @Field(() => Portfolio)
  @ManyToOne(() => Portfolio, (portfolio) => portfolio.portfolioVersions)
  @JoinColumn({ name: 'portfolio_id' })
  portfolio: Portfolio;

  @Field(() => [PortfolioPage], { nullable: 'itemsAndList' })
  @OneToMany(() => PortfolioPage, (portfolioPage) => portfolioPage.version)
  portfolioPages: PortfolioPage[];
}
