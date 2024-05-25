import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import PortfolioEntity from './portfolio.entity';
import Page from './page.entity';

@ObjectType('PortfolioVersion')
@Entity()
export default class PortfolioVersion {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('varchar', { nullable: false })
  versionType: string; // draft, published, snapshot

  @ManyToOne(() => PortfolioEntity, (portfolio) => portfolio.versions, { nullable: false })
  portfolio: PortfolioEntity;

  @OneToMany(() => Page, (page) => page.version)
  pages: Page[];
}
