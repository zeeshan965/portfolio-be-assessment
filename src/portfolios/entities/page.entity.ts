import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import PortfolioVersion from './portfolio-version.entity';
import Portfolio from './portfolio.entity';
import { AbstractEntity } from './abstract-entity';

@ObjectType('Page')
@Entity('pages')
export default class Page extends AbstractEntity {
  @Field()
  @Column('varchar', { name: 'name', nullable: false, length: 255 })
  name: string;

  @Field()
  @Column('varchar', { name: 'url', nullable: false, unique: true, length: 255 })
  url: string;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.pages)
  portfolio: Portfolio;

  @OneToMany(() => PortfolioVersion, (portfolioVersion) => portfolioVersion.page)
  portfolioVersions: PortfolioVersion[];
}
