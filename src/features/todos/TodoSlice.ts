import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<{ text: string }>) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload.text,
        completed: false,
      });
      const userId = localStorage.getItem("userId");
      if (userId) {
        localStorage.setItem(`todos_${userId}`, JSON.stringify(state.todos));
      }
    },
    deleteTodo: (state, action: PayloadAction<{ id: number }>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      const userId = localStorage.getItem("userId");
      if (userId) {
        localStorage.setItem(`todos_${userId}`, JSON.stringify(state.todos));
      }
    },
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
      const userId = localStorage.getItem("userId");
      if (userId) {
        localStorage.setItem(`todos_${userId}`, JSON.stringify(state.todos));
      }
    },
    toggleTodoCompletion: (state, action: PayloadAction<{ id: number }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
      const userId = localStorage.getItem("userId");
      if (userId) {
        localStorage.setItem(`todos_${userId}`, JSON.stringify(state.todos));
      }
    },
  },
});

export const { setTodos, addTodo, deleteTodo, editTodo, toggleTodoCompletion } =
  todoSlice.actions;
export default todoSlice.reducer;
