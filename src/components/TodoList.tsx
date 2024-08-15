import React from "react";
import { useAppDispatch } from "../store";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { setTodos } from "../features/todos/TodoSlice";
import TodoItem from "./TodoItem";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  userId: number | undefined;
}

const TodoList: React.FC<TodoListProps> = ({ todos, userId }) => {
  const dispatch = useAppDispatch();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex((item) => item.id === Number(active.id));
      const newIndex = todos.findIndex((item) => item.id === Number(over?.id));

      const reorderedItems = arrayMove(todos, oldIndex, newIndex);
      if (userId !== undefined) {
        dispatch(setTodos({ userId, todos: reorderedItems }));
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <p className="font-bold text-lg mb-4 dark:text-gray-200">List of TODOS</p>

      {todos.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No todos found</p>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={todos} strategy={verticalListSortingStrategy}>
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-sky-600 text-white">
                  <th className="p-2 border dark:border-gray-600 w-2/5">
                    Text
                  </th>
                  <th className="p-2 border dark:border-gray-600 w-1/5">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} userId={userId} />
                ))}
              </tbody>
            </table>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default TodoList;
