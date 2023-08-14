import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  task: string;

  @Column()
  completed: boolean;

  @Column()
  isEditing: boolean;
}
