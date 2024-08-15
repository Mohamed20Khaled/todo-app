import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import TodoList from "../src/components/TodoList";
import SortableItem from "../src/components/TodoItem";
import { Provider } from "react-redux";
import { store } from "../src/store";
import { setTodos } from "../src/features/todos/TodoSlice";
import { Todo } from "../src/types/types";
import "@testing-library/jest-dom";

describe("TodoList Component", () => {
  let todos: Todo[];

  beforeEach(() => {
    todos = [
      { id: 1, text: "Learn Vitest", completed: false },
      { id: 2, text: "Implement Drag and Drop", completed: false },
      { id: 3, text: "Write Unit Tests", completed: false },
    ];

    store.dispatch(setTodos({ userId: 1, todos }));
  });

  it("renders the todos correctly", () => {
    render(
      <Provider store={store}>
        <TodoList todos={todos} userId={1} />
      </Provider>
    );

    expect(screen.getByText("Learn Vitest")).toBeInTheDocument();
    expect(screen.getByText("Implement Drag and Drop")).toBeInTheDocument();
    expect(screen.getByText("Write Unit Tests")).toBeInTheDocument();
  });

  it("reorders the todos when dragged and dropped", async () => {
    render(
      <Provider store={store}>
        <DndContext>
          <SortableContext items={todos} strategy={verticalListSortingStrategy}>
            <table>
              <tbody>
                {todos.map((todo) => (
                  <SortableItem key={todo.id} todo={todo} userId={1} />
                ))}
              </tbody>
            </table>
          </SortableContext>
        </DndContext>
      </Provider>
    );

    const firstTodo = screen.getByText("Learn Vitest");
    const secondTodo = screen.getByText("Implement Drag and Drop");

    // Simulate dragging the first todo to the second position
    fireEvent.dragStart(firstTodo);
    fireEvent.dragEnter(secondTodo);
    fireEvent.dragEnd(secondTodo);

    // Assert the todos have been reordered
    const reorderedTodos = arrayMove(todos, 0, 1);
    expect(reorderedTodos[0].text).toBe("Implement Drag and Drop");
    expect(reorderedTodos[1].text).toBe("Learn Vitest");
  });
});
