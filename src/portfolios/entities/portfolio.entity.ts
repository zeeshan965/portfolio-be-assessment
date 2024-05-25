import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import PortfolioVersion from './portfolio-version.entity';

@ObjectType('Portfolio')
@Entity('portfolios')
export default class Portfolio extends AbstractEntity {
  @Field()
  @Column('varchar', { name: 'name', nullable: false, length: 255 })
  name: string;

  @Field()
  @Column('varchar', { name: 'url', nullable: false, length: 255 })
  url: string;

  @Field(() => [PortfolioVersion], { nullable: 'itemsAndList' })
  @OneToMany(() => PortfolioVersion, (portfolioVersion) => portfolioVersion.portfolio)
  portfolioVersions: PortfolioVersion[];
}
