import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class StatusArgs {
  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
