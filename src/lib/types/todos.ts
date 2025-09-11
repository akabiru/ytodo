import * as Y from 'yjs';

export type YTodoItem = Y.Map<any>;
export type YTodoList = Y.Array<YTodoItem>;

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
