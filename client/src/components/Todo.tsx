import React from 'react';
import style from '../style/style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faCheck,
  faPersonDigging,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { TodoTask } from './TodoWrapper';
interface TodoProps {
  todotask: TodoTask;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
}
const Todo: React.FC<TodoProps> = ({
  todotask,
  toggleComplete,
  deleteTodo,
  editTodo,
}) => {
  return (
    <div className={style.todo}>
      <p className={`${todotask.completed && style.completed}`}>
        {todotask.task}
      </p>

      <div>
        {todotask.completed ? (
          <FontAwesomeIcon
            icon={faCheck}
            onClick={() => toggleComplete(todotask.id)}
            className={`${todotask.completed ? style.completed__icon : ''} ${
              style['icon__hover__effect']
            }`}
          />
        ) : (
          <FontAwesomeIcon
            icon={faPersonDigging}
            onClick={() => toggleComplete(todotask.id)}
            className={style['icon__hover__effect']}
          />
        )}

        <FontAwesomeIcon
          onClick={() => editTodo(todotask.id)}
          icon={faPenToSquare}
          className={style['icon__hover__effect']}
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => deleteTodo(todotask.id)}
          className={style['icon__hover__effect']}
        />
      </div>
    </div>
  );
};

export default Todo;
