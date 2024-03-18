import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {
  #todos: Todo[] = [
    {
      id: 1,
      description: 'Pierdra del alma',
      done: false,
    },
    {
      id: 2,
      description: 'Pierdra del espacio',
      done: false,
    },
    {
      id: 3,
      description: 'Pierdera del poder',
      done: false,
    },
  ];

  get totalTodos() {
    return this.#todos.length;
  }

  get completedTodos() {
    return this.#todos.filter((todo) => todo.done).length;
  }

  get pendingTodos() {
    return this.#todos.filter((todo) => !todo.done).length;
  }

  findAll(statusArgs?: StatusArgs): Todo[] {
    console.log('statusArgs', statusArgs);

    if (statusArgs?.status !== undefined) {
      return this.#todos.filter((todo) => todo.done === statusArgs?.status);
    }

    return this.#todos;
  }

  findOne(id: number): Todo {
    const todo = this.#todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.id = this.#todos.length + 1;

    this.#todos.push(todo);

    return todo;
  }

  update(updateTodoInput: UpdateTodoInput) {
    const todoToUpdate = this.findOne(updateTodoInput.id);

    if (updateTodoInput.description) {
      todoToUpdate.description = updateTodoInput.description;
    }

    if (updateTodoInput.done !== undefined) {
      todoToUpdate.done = updateTodoInput.done;
    }

    this.#todos = this.#todos.map((todo) =>
      todo.id === todoToUpdate.id ? todoToUpdate : todo,
    );

    return todoToUpdate;
  }

  remove(id: number): boolean {
    const todo = this.findOne(id);

    this.#todos.splice(this.#todos.indexOf(todo), 1);

    return true;
  }
}
