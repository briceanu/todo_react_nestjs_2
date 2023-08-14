import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('/save')
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }

  @Get('/getTodos')
  async findAll(): Promise<Todo[]> {
    return await this.todoService.findAll();
  }
  //
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.todoService.findOne(id);
  }
  //
  @Put('/update/:id')
  update(@Param('id') id: string): Promise<Todo> {
    return this.todoService.update(id);
  }
  //
  @Put('/updateEdit/:id')
  updateEdit(@Param('id') id: string): Promise<Todo> {
    return this.todoService.updateEdit(id);
  }
  //
  @Put('/updateTodo/:id')
  updateTodo(
    @Param('id') id: string,
    @Body('task') task: string,
  ): Promise<Todo> {
    return this.todoService.updateTodo(id, task);
  }
  //
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.todoService.remove(id);
  }
}
