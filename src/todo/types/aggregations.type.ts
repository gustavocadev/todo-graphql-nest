import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Aggregation type',
})
export abstract class AggregationType {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pending: number;

  @Field(() => Int)
  completed: number;
}
