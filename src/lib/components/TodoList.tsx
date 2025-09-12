import React from 'react';
import * as Y from 'yjs';
import type { Todo } from '../types/todos';
import EditableText from './EditableText';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  getYTextForTodo: (id: number) => Y.Text | null;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, getYTextForTodo }) => {
  const [editingId, setEditingId] = React.useState<number | null>(null);

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <div key={todo.id} className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          {editingId === todo.id ? (
            <EditableText
              className={todo.completed ? 'completed' : ''}
              ytext={getYTextForTodo(todo.id) ?? new Y.Text()}
            />
          ) : (
            <span onClick={() => setEditingId(todo.id)}>{todo.text}</span>
          )}
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
