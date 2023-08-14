import style from './style/style.module.scss';
import TodoWrapper from './components/TodoWrapper';

function App() {
  return (
    <div className={style.todo__app}>
      <TodoWrapper />
    </div>
  );
}

export default App;
