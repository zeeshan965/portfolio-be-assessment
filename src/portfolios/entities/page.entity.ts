import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { AbstractEntity } from './abstract-entity';
import PortfolioPage from './portfolio-page.entity';

@ObjectType('Page')
@Entity('pages')
export default class Page extends AbstractEntity {
  @Field()
  @Column('varchar', { name: 'name', nullable: false, length: 255 })
  name: string;

  @Field()
  @Column('varchar', { name: 'url', nullable: false, length: 255 })
  url: string;

  @OneToMany(() => PortfolioPage, (portfolioPage) => portfolioPage.page)
  portfolioPages: PortfolioPage[];
}
