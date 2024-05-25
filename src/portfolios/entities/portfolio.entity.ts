import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import PortfolioVersion from './portfolio-version.entity';
import Page from './page.entity';
import { AbstractEntity } from './abstract-entity';

@ObjectType('Portfolio')
@Entity()
export default class Portfolio extends AbstractEntity {
  @Field()
  @Column('varchar', { name: 'name', nullable: false, length: 255 })
  name: string;

  @Field()
  @Column('varchar', { name: 'url', nullable: false, unique: true, length: 255 })
  url: string;

  @OneToMany(() => Page, (page) => page.portfolio)
  pages: Page[];

  @OneToMany(() => PortfolioVersion, (portfolioVersion) => portfolioVersion.portfolio)
  portfolioVersions: PortfolioVersion[];
}
