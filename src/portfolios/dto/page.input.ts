import { Field, InputType } from 'type-graphql';

@InputType()
export class PageInput {
  @Field()
  name: string;

  @Field()
  url: string;
}
