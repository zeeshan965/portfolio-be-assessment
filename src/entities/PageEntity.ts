import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import PortfolioEntity from './PortfolioEntity';

@Entity()
export default class PageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false, unique: true })
  url: string;

  @ManyToOne(() => PortfolioEntity, { nullable: false })
  portfolio: PortfolioEntity;
}
