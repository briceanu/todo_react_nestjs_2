import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import style from '../style/style.module.scss';
import Todo from './Todo';
import EditTodoForm from './EditTodoForm';
const API = 'http://localhost:3001';

export interface TodoTask {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
}
export type EditTaskFunction = (task: string, id: string) => void;

const TodoWrapper = () => {
  const [todos, setTodos] = useState<TodoTask[]>([]);
  //

  const getAllTodos = async (): Promise<void> => {
    await fetch(`${API}/getTodos`, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('data not fetch');
        }
        return res.json();
      })
      .then((data) => setTodos(data))
      .catch((error) => console.log('Error:', error));
  };
  useEffect(() => {
    getAllTodos();
  }, [todos]);

  //
  let toggleComplete = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to update completion status');
      }

      const updateTodo = await response.json();
      //takes the updateTodo.completed from DB and updates the state in the UI
      setTodos(
        todos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                completed: updateTodo.completed,
              }
            : todo
        )
      );
    } catch (error) {
      console.log('Error updating todo:', error);
    }
  };
  //

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error response from server:', errorResponse);
        throw new Error('Network response was not ok');
      }
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  //
  let editTodo = async (id: string): Promise<void> => {
    const data = await fetch(`${API}/updateEdit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!data.ok) {
      throw new Error('Failed to update isEditing status');
    }
    const response = await data.json();
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isEditing: !response.isEditing,
            }
          : todo
      )
    );
  };

  //this is the one we have to work update Task
  const editTask: EditTaskFunction = async (task, id) => {
    const data = await fetch(`${API}/updateTodo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
    });
    if (!data.ok) {
      throw new Error('Failed to update isEditing status');
    }
    const response = await data.json();
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              task: response.task,
            }
          : todo
      )
    );
  };

  return (
    <div className={style.todo__wrapper}>
      <h1>Get Things Done !</h1>
      <TodoForm setTodos={setTodos} todos={todos} />

      {todos
        .sort((a, b) => a.id.localeCompare(b.id))
        .map((todo, index) =>
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} todoTask={todo} key={index} />
          ) : (
            <Todo
              //this todotask is a property from the TodoProps in Todo.tsx
              todotask={todo}
              key={index}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          )
        )}
    </div>
  );
};

export default TodoWrapper;
