import { Args, Query, Resolver, Int, Mutation } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { StatusArgs } from './dto/args/status.args';
import { AggregationType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo])
  findAll(
    @Args('statusArgs', { nullable: true })
    statusArgs?: StatusArgs,
  ): Todo[] {
    return this.todoService.findAll(statusArgs);
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Boolean)
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.remove(id);
  }

  // agregations
  @Query(() => Int, { name: 'totalTodos' })
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  // completed todos
  @Query(() => Int, { name: 'completedTodos' })
  completedTodos(): number {
    return this.todoService.completedTodos;
  }

  // pending todos
  @Query(() => Int, { name: 'pendingTodos' })
  pendingTodos(): number {
    return this.todoService.pendingTodos;
  }

  @Query(() => AggregationType)
  aggregations(): AggregationType {
    return {
      completed: this.todoService.completedTodos,
      pending: this.todoService.pendingTodos,
      total: this.todoService.totalTodos,
    };
  }
}
