import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Inject, Service } from 'typedi';
import Portfolio from '../entities/portfolio.entity';
import { PortfolioService } from '../services/portfolios.service';
import { CreatePortfolioDto } from '../dto/create-portfolio.dto';

@Resolver()
@Service()
export default class PortfoliosResolver {
  @Inject(() => PortfolioService)
  private readonly portfolioService: PortfolioService;

  /**
   * @return Promise<Portfolio[]>
   */
  @Query(() => [Portfolio], { description: 'List all portfolios' })
  async listPortfolios(): Promise<Portfolio[]> {
    const portfolioRepository = getRepository(Portfolio);
    return portfolioRepository.createQueryBuilder('p').getMany();
  }

  @Mutation(() => Portfolio)
  async createPortFolio(@Arg('createPortfolioDto') createPortfolioDto: CreatePortfolioDto): Promise<Portfolio> {
    return this.portfolioService.createPortFolio(createPortfolioDto);
  }
}
