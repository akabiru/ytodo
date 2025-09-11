import { useEffect, useState } from 'react';
import * as Y from 'yjs';
import type { Todo, YTodoItem } from '../types/todos';

export function useYjsTodos() {
  const [ydoc] = useState(() => new Y.Doc());
  const [ytodos] = useState(() => ydoc.getArray<YTodoItem>('todos'));
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    const observedTodos = new Set<YTodoItem>();

    const updateTodos = () => {
      setTodos(
        ytodos.toArray().map(todo => ({
          id: todo.get('id'),
          text: todo.get('text').toString(),
          completed: todo.get('completed'),
        }))
      );
    };

    const observeTodo = (todo: Y.Map<any>) => {
      if (!observedTodos.has(todo)) {
        todo.observe(updateTodos);
        const text = todo.get('text');
        if (text instanceof Y.Text) text.observe(updateTodos);
        observedTodos.add(todo);
      }
    };

    const unobserveTodo = (todo: Y.Map<any>) => {
      if (observedTodos.has(todo)) {
        todo.unobserve(updateTodos);
        const text = todo.get('text');
        if (text instanceof Y.Text) text.unobserve(updateTodos);
        observedTodos.delete(todo);
      }
    };

    const handleArrayChange = () => {
      const currentTodos = ytodos.toArray();
      currentTodos.forEach(observeTodo);
      observedTodos.forEach(todo => {
        if (!currentTodos.includes(todo)) {
          unobserveTodo(todo);
        }
      });
      updateTodos();
    };

    ytodos.observe(handleArrayChange);
    handleArrayChange();

    return () => {
      ytodos.unobserve(handleArrayChange);
      observedTodos.forEach(unobserveTodo);
    };
  }, [ytodos]);

  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodoYText = new Y.Text(newTodoText.trim()); // collaborative text
      const newTodoMap = new Y.Map();

      newTodoMap.set('id', Date.now());
      newTodoMap.set('text', newTodoYText);
      newTodoMap.set('completed', false);

      ytodos.push([newTodoMap]);
      setNewTodoText('');
    }
  };

  const toggleTodo = (id: number) => {
    const index = ytodos.toArray().findIndex(todo => todo.get('id') === id);
    if (index !== -1) {
      const todo = ytodos.get(index);
      todo.set('completed', !todo.get('completed'));
    }
  };

  const deleteTodo = (id: number) => {
    const index = ytodos.toArray().findIndex(todo => todo.get('id') === id);
    if (index !== -1) {
      ytodos.delete(index, 1);
    }
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    newTodoText,
    setNewTodoText,
  };
}
