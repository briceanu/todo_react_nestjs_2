import React, { useEffect, useRef } from 'react';
import style from '../style/style.module.scss';
import { TodoTask } from './TodoWrapper';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import { basicSchema } from '../schemas';

interface TodoFormProps {
  setTodos: (todos: TodoTask[]) => void;
  todos: TodoTask[];
}
const API = 'http://localhost:3001';

const TodoForm: React.FC<TodoFormProps> = ({ setTodos, todos }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onSubmit = async (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ): Promise<void> => {
    const { resetForm, setSubmitting } = formikHelpers;
    setSubmitting(true);
    const { task } = values;
    try {
      const response = await fetch(`${API}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task: task,
          completed: false,
          isEditing: false,
        }),
      });

      if (!response.ok) {
        // Successfully added todo
        throw new Error('Failed to add new todo');
      }
      const savedTodo = await response.json();
      setTodos([...todos, savedTodo]);
      resetForm();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const { touched, isSubmitting, errors, handleChange, values, handleSubmit } =
    useFormik<FormikValues>({
      initialValues: {
        task: '',
        completed: false,
        isEditing: false,
      },
      validationSchema: basicSchema,
      onSubmit: onSubmit,
    });

  return (
    <>
      <form className={style.todo__form} onSubmit={handleSubmit}>
        <input
          type='text'
          id='task'
          name='task'
          className={`${style.todo__input} ${
            errors.task && touched.task && style.input__error
          }`}
          placeholder='What is the task today?'
          value={values.task}
          onChange={handleChange}
          ref={inputRef}
        />
        {errors.task && touched.task && (
          <p className={style.error}>{String(errors.task)}</p>
        )}
        <button
          type='submit'
          className={style.todo__btn}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Task...' : 'Add Task'}
        </button>
      </form>
    </>
  );
};

export default TodoForm;
