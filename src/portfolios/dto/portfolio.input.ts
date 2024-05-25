import { InputType, Field } from 'type-graphql';

@InputType()
export class PortfolioInput {
  @Field()
  name: string;

  @Field()
  url: string;
}
