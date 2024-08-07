import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./features/todos/TodoSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({ reducer: { todo: todoSlice.reducer } });

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
