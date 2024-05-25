import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import PortfolioEntity from './PortfolioEntity';
import PageEntity from './PageEntity';

@ObjectType('PortfolioVersion')
@Entity()
export default class PortfolioVersionEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('varchar', { nullable: false })
  versionType: string; // draft, published, snapshot

  @ManyToOne(() => PortfolioEntity, (portfolio) => portfolio.versions, { nullable: false })
  portfolio: PortfolioEntity;

  @OneToMany(() => PageEntity, (page) => page.version)
  pages: PageEntity[];
}
