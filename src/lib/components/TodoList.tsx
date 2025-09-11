import React from 'react';
import type { Todo } from '../types/todos';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => (
  <div className="todo-list">
    {todos.map(todo => (
      <div key={todo.id} className="todo-item">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    ))}
  </div>
);

export default TodoList;
