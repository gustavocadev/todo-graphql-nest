import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int, { description: 'The id of the todo' })
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => String, { description: 'The title of the todo', nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @IsOptional()
  description?: string;

  @Field(() => Boolean, {
    description: 'The status of the todo',
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
