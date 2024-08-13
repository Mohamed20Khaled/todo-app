// Interfaces for AuthSlice.ts
export interface User {
  id: number;
  username: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Interfaces for TodoSlice.ts
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoState {
  [userId: number]: Todo[];
}
