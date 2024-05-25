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

  /**
   * @param {number} id
   * @return Promise<Portfolio>
   */
  @Query(() => Portfolio)
  async getPortfolioById(@Arg('id', () => Int) id: number): Promise<Portfolio> {
    return this.portfolioService.getPortfolioById(id);
  }

  /**
   * @param {CreatePortfolioDto} createPortfolioDto
   * @return Promise<Portfolio>
   */
  @Mutation(() => Portfolio)
  async createPortFolio(@Arg('createPortfolioDto') createPortfolioDto: CreatePortfolioDto): Promise<Portfolio> {
    return this.portfolioService.createPortFolio(createPortfolioDto);
  }

  /**
   * @param {number} id
   * @param {CreatePortfolioDto} updatePortfolioDto
   * @return Promise<Portfolio>
   */
  @Mutation(() => Portfolio)
  async updatePortFolio(
    @Arg('id', () => Int) id: number,
    @Arg('updatePortfolioDto') updatePortfolioDto: CreatePortfolioDto
  ): Promise<Portfolio> {
    return this.portfolioService.updatePortfolioDto(id, updatePortfolioDto);
  }

  /**
   * @param {number} id
   * @return Promise<Portfolio>
   */
  @Mutation(() => Portfolio)
  async publishPortfolio(@Arg('id', () => Int) id: number): Promise<any> {
    return this.portfolioService.publishPortfolio(id);
  }
}
