import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { Logger } from '@nestjs/common';

//in the service we handle the exception errors

@Injectable()
export class TodoService {
  private logger = new Logger();
  constructor(
    //this InjectRepository is from typeORM
    @InjectRepository(Todo)
    private readonly taskRepository: Repository<Todo>,
  ) {}
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { task, completed, isEditing } = createTodoDto;
    const saveTodo = this.taskRepository.create({
      task,
      completed,
      isEditing,
    });
    await this.taskRepository.save(saveTodo);
    return saveTodo;
  }

  async findAll(): Promise<Todo[]> {
    const todos = await this.taskRepository.find();
    return todos;
  }

  async findOne(id: string) {
    const todo = await this.taskRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: string): Promise<Todo> {
    const update = await this.taskRepository.findOne({ where: { id } });
    if (!update) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    update.completed = !update.completed;
    await this.taskRepository.save(update);
    return update;
  }
  //
  async updateEdit(id: string): Promise<Todo> {
    const updateEdit = await this.taskRepository.findOne({ where: { id } });
    if (!updateEdit) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    updateEdit.isEditing = !updateEdit.isEditing;
    if (updateEdit.completed === true) {
      updateEdit.completed = false;
    }
    await this.taskRepository.save(updateEdit);
    // this.logger.verbose(updateEdit.isEditing);
    return updateEdit;
  }

  async updateTodo(id: string, task: string): Promise<Todo> {
    const updateTodo = await this.taskRepository.findOne({ where: { id } });
    if (!updateTodo) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    updateTodo.task = task;
    updateTodo.isEditing = !updateTodo.isEditing;
    await this.taskRepository.save(updateTodo);
    return updateTodo;
  }

  async remove(id: string): Promise<void> {
    const result = await this.taskRepository.delete({
      id: id.toString(),
    });
    if (result.affected === 0) {
      //user.affected is a property of the user object console.log(user)
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
