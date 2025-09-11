import './App.css';
import AddTodo from './lib/components/AddTodo';
import Stats from './lib/components/Stats';
import TodoList from './lib/components/TodoList';
import { useYjsTodos } from './lib/hooks/useYjsTodos';

function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    newTodoText,
    setNewTodoText,
  } = useYjsTodos();

  return (
    <div className="todo-app">
      <h1>Y.js Collaborative Todo App</h1>
      <AddTodo
        value={newTodoText}
        onChange={setNewTodoText}
        onAdd={addTodo}
      />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      <Stats
        total={todos.length}
        completed={todos.filter(t => t.completed).length}
      />
    </div>
  );
}

export default App
