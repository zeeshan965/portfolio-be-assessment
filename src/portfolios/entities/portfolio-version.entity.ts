import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import PortfolioEntity from './portfolio.entity';
import Page from './page.entity';
import { VersionType } from '../../helpers/enum';

@ObjectType('PortfolioVersion')
@Entity()
export default class PortfolioVersion {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('enum', { enum: VersionType })
  versionType: VersionType;

  @Column()
  portfolioId: number;

  @ManyToOne(() => PortfolioEntity, (portfolio) => portfolio.versions, { nullable: false })
  portfolio: PortfolioEntity;

  @OneToMany(() => Page, (page) => page.version)
  pages: Page[];
}
