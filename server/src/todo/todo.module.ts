import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService], // Export the TodoService (which contains the TodoRepository)
})
export class TodoModule {}
