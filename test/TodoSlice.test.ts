import { describe, it, expect } from "vitest";
import reducer, {
  setTodos,
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodoCompletion,
} from "../src/features/todos/TodoSlice";
import { TodoState } from "../src/types/types";

// Groups related tests together
describe("todoSlice reducer", () => {
  it("should handle setTodos", () => {
    const initialState: TodoState = {};
    const action = setTodos({
      userId: 1,
      todos: [{ id: 1, text: "Learn Vitest", completed: false }],
    });
    const newState = reducer(initialState, action);
    expect(newState[1]).toEqual([
      { id: 1, text: "Learn Vitest", completed: false },
    ]);
  });

  it("should handle addTodo", () => {
    const initialState: TodoState = { 1: [] };
    const action = addTodo({
      userId: 1,
      text: "Learn Redux",
    });
    const newState = reducer(initialState, action);
    expect(newState[1]).toHaveLength(1);
    expect(newState[1][0].text).toBe("Learn Redux");
    expect(newState[1][0].completed).toBe(false);
  });

  it("should handle deleteTodo", () => {
    const initialState: TodoState = {
      1: [{ id: 1, text: "Learn Redux", completed: false }],
    };
    const action = deleteTodo({
      userId: 1,
      id: 1,
    });
    const newState = reducer(initialState, action);
    expect(newState[1]).toHaveLength(0);
  });

  it("should handle editTodo", () => {
    const initialState: TodoState = {
      1: [{ id: 1, text: "Learn Redux", completed: false }],
    };
    const action = editTodo({
      userId: 1,
      id: 1,
      text: "Learn Redux Toolkit",
    });
    const newState = reducer(initialState, action);
    expect(newState[1][0].text).toBe("Learn Redux Toolkit");
  });

  it("should handle toggleTodoCompletion", () => {
    const initialState: TodoState = {
      1: [{ id: 1, text: "Learn Redux", completed: false }],
    };
    const action = toggleTodoCompletion({
      userId: 1,
      id: 1,
    });
    const newState = reducer(initialState, action);
    expect(newState[1][0].completed).toBe(true);
  });
});
