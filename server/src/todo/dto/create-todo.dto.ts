import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  task: string;

  @IsNotEmpty()
  @IsBoolean()
  completed: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isEditing: boolean;
}
