import * as yup from 'yup';

export const basicSchema = yup.object().shape({
  task: yup.string().required('Please add a todo').trim(),
});
