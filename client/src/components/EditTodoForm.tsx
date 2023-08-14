import React, { useRef, useEffect, useState } from 'react';
import style from '../style/style.module.scss';
import { TodoTask } from './TodoWrapper';
import { EditTaskFunction } from './TodoWrapper';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import { basicSchema } from '../schemas';

interface EditTodoFormProps {
  editTodo: EditTaskFunction;
  todoTask: TodoTask;
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({ editTodo, todoTask }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const [value] = useState(todoTask.task);
  const onSubmit = async (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => {
    editTodo(values.task, todoTask.id);
    const { resetForm, setSubmitting } = formikHelpers;
    setSubmitting(true);
    resetForm();
  };
  const { touched, isSubmitting, errors, handleChange, values, handleSubmit } =
    useFormik<FormikValues>({
      initialValues: {
        task: value,
      },
      validationSchema: basicSchema,
      onSubmit: onSubmit,
    });
  return (
    <>
      <form className={style.todo__form} onSubmit={handleSubmit}>
        <input
          type='text'
          className={style.todo__input}
          placeholder='Update Task'
          value={values.task}
          onChange={handleChange}
          ref={inputRef}
          id='task'
          name='task'
        />
        {errors.task && touched.task && (
          <p className={style.error}>{String(errors.task)}</p>
        )}
        <button
          type='submit'
          className={style.todo__btn}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Updating Task...' : 'Update Task'}
        </button>
      </form>
    </>
  );
};

export default EditTodoForm;
