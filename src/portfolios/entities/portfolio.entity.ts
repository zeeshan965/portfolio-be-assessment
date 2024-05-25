import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import PortfolioVersion from './portfolio-version.entity';

@ObjectType('Portfolio')
@Entity()
export default class Portfolio {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('varchar', { nullable: false })
  name: string;

  @Field()
  @Column('varchar', { nullable: false, unique: true })
  url: string;

  @OneToMany(() => PortfolioVersion, (version) => version.portfolio)
  versions: PortfolioVersion[];
}
