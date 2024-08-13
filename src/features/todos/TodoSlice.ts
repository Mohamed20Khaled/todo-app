import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Todo, TodoState } from "../../types/types";

const initialState: TodoState = {};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (
      state,
      action: PayloadAction<{ userId: number; todos: Todo[] }>
    ) => {
      state[action.payload.userId] = action.payload.todos;
    },
    addTodo: (
      state,
      action: PayloadAction<{ userId: number; text: string }>
    ) => {
      const userTodos = state[action.payload.userId] || [];
      userTodos.push({
        id: Date.now(),
        text: action.payload.text,
        completed: false,
      });
      state[action.payload.userId] = userTodos;
    },
    deleteTodo: (
      state,
      action: PayloadAction<{ userId: number; id: number }>
    ) => {
      const userTodos = state[action.payload.userId] || [];
      state[action.payload.userId] = userTodos.filter(
        (todo) => todo.id !== action.payload.id
      );
    },
    editTodo: (
      state,
      action: PayloadAction<{ userId: number; id: number; text: string }>
    ) => {
      const userTodos = state[action.payload.userId] || [];
      const todo = userTodos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    toggleTodoCompletion: (
      state,
      action: PayloadAction<{ userId: number; id: number }>
    ) => {
      const userTodos = state[action.payload.userId] || [];
      const todo = userTodos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { setTodos, addTodo, deleteTodo, editTodo, toggleTodoCompletion } =
  todoSlice.actions;

export default todoSlice.reducer;
