import { useEffect, useState } from 'react'
import * as Y from 'yjs'
import './App.css'

type TodoItem = Y.Map<any>

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTodoText, setNewTodoText] = useState('')

  // Initialize Y.js document and shared array
  const [ydoc] = useState(() => new Y.Doc())
  const [ytodos] = useState<Y.Array<TodoItem>>(() => ydoc.getArray<TodoItem>('todos'))

  // Sync Y.js state with React state
  useEffect(() => {
    const updateTodos = () => {
      console.log(`Updating todos from Y.js: ${JSON.stringify(ytodos.toJSON())} items`)
      setTodos(ytodos.toArray())
    }

    // Observe Y.Array changes (add/delete todos)
    ytodos.observe(updateTodos)

    // Also observe each individual Y.Map for property changes
    const observeAllTodos = () => {
      ytodos.toArray().forEach(todo => {
        todo.observe(updateTodos) // Listen to each todo's property changes
      })
    }

    // Initial setup
    updateTodos()
    observeAllTodos()

    // Re-observe when array changes (new todos added)
    ytodos.observe(observeAllTodos)

    return () => {
      ytodos.unobserve(updateTodos)
      ytodos.unobserve(observeAllTodos)
      // Clean up individual todo observers
      ytodos.toArray().forEach(todo => {
        todo.unobserve(updateTodos)
      })
    }
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
    console.log(`Toggling todo with id ${id} at index ${index}`)
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

  return (
    <div className="todo-app">
      <h1>Y.js Collaborative Todo App</h1>

      <div className="add-todo">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.get('id')} className="todo-item">
            <input
              type="checkbox"
              checked={todo.get('completed')}
              onChange={() => toggleTodo(todo.get('id'))}
            />
            <span className={todo.get('completed') ? 'completed' : ''}>
              {todo.get('text')}
            </span>
            <button onClick={() => deleteTodo(todo.get('id'))}>Delete</button>
          </div>
        ))}
      </div>

      <div className="stats">
        <p>Total: {todos.length} | Completed: {todos.filter(t => t.get('completed')).length}</p>
      </div>
    </div>
  )
}

export default App
