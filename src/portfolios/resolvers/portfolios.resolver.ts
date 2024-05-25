import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
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
  async listPublishedPortfolio(): Promise<Portfolio[]> {
    return this.portfolioService.listPublishedPortfolio();
  }

  @Query(() => Portfolio, { description: 'Get a portfolio by ID' })
  async getPortfolioById(@Arg('id', () => Int) id: number): Promise<Portfolio> {
    return this.portfolioService.getPortfolioById(id);
  }

  @Mutation(() => Portfolio)
  async createPortFolio(@Arg('createPortfolioDto') createPortfolioDto: CreatePortfolioDto): Promise<Portfolio> {
    return this.portfolioService.createPortFolio(createPortfolioDto);
  }
}
