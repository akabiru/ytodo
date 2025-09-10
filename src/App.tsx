import { useState, useEffect } from 'react'
import * as Y from 'yjs'
import './App.css'

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTodoText, setNewTodoText] = useState('')
  
  // Initialize Y.js document and shared array
  const [ydoc] = useState(() => new Y.Doc())
  const [ytodos] = useState(() => ydoc.getArray<TodoItem>('todos'))

  // Sync Y.js state with React state
  useEffect(() => {
    const updateTodos = () => {
      setTodos(ytodos.toArray())
    }

    // Initial load
    updateTodos()

    // Listen for changes
    ytodos.observe(updateTodos)

    return () => {
      ytodos.unobserve(updateTodos)
    }
  }, [ytodos])

  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false
      }
      ytodos.push([newTodo])
      setNewTodoText('')
    }
  }

  const toggleTodo = (id: number) => {
    const index = ytodos.toArray().findIndex(todo => todo.id === id)
    if (index !== -1) {
      const todo = ytodos.get(index)
      ytodos.delete(index, 1)
      ytodos.insert(index, [{ ...todo, completed: !todo.completed }])
    }
  }

  const deleteTodo = (id: number) => {
    const index = ytodos.toArray().findIndex(todo => todo.id === id)
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
          <div key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.completed ? 'completed' : ''}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="stats">
        <p>Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}</p>
      </div>
    </div>
  )
}

export default App
