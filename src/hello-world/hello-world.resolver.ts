import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    name: 'hello',
    description: 'A simple hello world query',
  })
  helloWorld(): string {
    return 'Hello, World!';
  }

  @Query(() => Float, { name: 'randomNumber', description: 'A random' })
  randomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomFromZeroTo',
    description: 'A random number from 0 to 10',
  })
  getRandomFromZeroTo(
    @Args('to', { type: () => Int, nullable: true })
    to = 6,
  ): number {
    return Math.round(Math.random() * to);
  }
}
