import { useEffect, useState } from 'react'
import * as Y from 'yjs'
import './App.css'

type TodoItem = Y.Map<any>
type TodoList = Y.Array<TodoItem>

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTodoText, setNewTodoText] = useState('')

  // Initialize Y.js document and shared array
  // Source of truth for collaborative state
  const [ydoc] = useState(() => new Y.Doc())
  const [ytodos] = useState<TodoList>(() => ydoc.getArray<TodoItem>('todos'))

  // Sync Y.js state with React state
  useEffect(() => {
    const observedTodos = new Set<TodoItem>();

    const updateTodos = () => {
      setTodos(ytodos.toArray());
    };

    const observeTodo = (todo: TodoItem) => {
      if (!observedTodos.has(todo)) {
        todo.observe(updateTodos);
        observedTodos.add(todo);
      }
    };

    const unobserveTodo = (todo: TodoItem) => {
      if (observedTodos.has(todo)) {
        todo.unobserve(updateTodos);
        observedTodos.delete(todo);
      }
    };

    const handleArrayChange = () => {
      const currentTodos = ytodos.toArray();
      currentTodos.forEach(observeTodo);

      // Remove observers from todos no longer in the array
      observedTodos.forEach(todo => {
        if (!currentTodos.includes(todo)) {
          unobserveTodo(todo);
        }
      });

      updateTodos();
    };

    ytodos.observe(handleArrayChange);
    handleArrayChange(); // Initial sync

    return () => {
      ytodos.unobserve(handleArrayChange);
      observedTodos.forEach(unobserveTodo);
    };
  }, [ytodos])

  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodoMap = new Y.Map<string | number | boolean>();
      newTodoMap.set('id', Date.now());
      newTodoMap.set('text', newTodoText.trim());
      newTodoMap.set('completed', false);

      ytodos.push([newTodoMap])
      setNewTodoText('')
    }
  }

  const toggleTodo = (id: number) => {
    const index = ytodos.toArray().findIndex(todo => todo.get('id') === id)
    if (index !== -1) {
      const todo = ytodos.get(index)
      const currentCompleted = todo.get('completed')
      todo.set('completed', !currentCompleted)
    }
  }

  const deleteTodo = (id: number) => {
    const index = ytodos.toArray().findIndex(todo => todo.get('id') === id)
    if (index !== -1) {
      ytodos.delete(index, 1)
    }
  }

  const getTodoProps = (todo: TodoItem) => ({
    id: todo.get('id'),
    text: todo.get('text'),
    completed: todo.get('completed'),
  });

  return (
    <div className="todo-app">
      <h1>Y.js Collaborative Todo App</h1>

      <div className="add-todo">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="todo-list">
        {todos.map((todo) => {
          const { id, text, completed } = getTodoProps(todo);
          return (
            <div key={id} className="todo-item">
              <input
                type="checkbox"
                checked={completed}
                onChange={() => toggleTodo(id)}
              />
              <span className={completed ? 'completed' : ''}>{text}</span>
              <button onClick={() => deleteTodo(id)}>Delete</button>
            </div>
          );
        })}
      </div>

      <div className="stats">
        <p>Total: {todos.length} | Completed: {todos.filter(t => t.get('completed')).length}</p>
      </div>
    </div>
  )
}

export default App
