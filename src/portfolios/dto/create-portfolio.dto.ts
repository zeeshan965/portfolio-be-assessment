import { Field, InputType } from 'type-graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class PageInputDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String)
  @IsOptional()
  @IsString()
  @IsUrl()
  url?: string;
}

@InputType()
export class CreatePortfolioDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @IsUrl()
  url?: string;

  @Field(() => [PageInputDto])
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PageInputDto)
  pages: PageInputDto[];
}
