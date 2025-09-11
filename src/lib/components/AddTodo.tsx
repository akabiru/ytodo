import React from 'react';

interface AddTodoProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ value, onChange, onAdd }) => (
  <div className="add-todo">
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => e.key === 'Enter' && onAdd()}
      placeholder="Add a new todo..."
    />
    <button onClick={onAdd}>Add</button>
  </div>
);

export default AddTodo;
