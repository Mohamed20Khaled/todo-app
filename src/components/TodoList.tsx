import React, { useState } from "react";
import { useAppDispatch } from "../store";
import {
  deleteTodo,
  editTodo,
  toggleTodoCompletion,
} from "../features/todos/TodoSlice";
import toast from "react-hot-toast";

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
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleDeleteTodo = (id: number) => {
    if (userId !== undefined) {
      dispatch(deleteTodo({ userId, id }));
      toast.success("Todo deleted successfully!");
    }
  };

  const handleToggleTodoCompletion = (id: number) => {
    if (userId !== undefined) {
      dispatch(toggleTodoCompletion({ userId, id }));
      toast.success("Todo status updated!");
    }
  };

  const handleEditTodo = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id: number) => {
    if (userId !== undefined && editText.trim().length > 0) {
      dispatch(editTodo({ userId, id, text: editText }));
      setEditId(null);
      setEditText("");
      toast.success("Todo edited successfully!");
    } else {
      toast.error("Todo text cannot be empty!");
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <p className="font-bold text-lg mb-4 dark:text-gray-200">List of TODOS</p>
      {todos.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No todos available</p>
      ) : (
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-sky-600 text-white">
              <th className="p-2 border dark:border-gray-600 w-2/5">Text</th>
              <th className="p-2 border dark:border-gray-600 w-1/5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr
                key={todo.id}
                className="even:bg-gray-50 odd:bg-white dark:even:bg-gray-700 dark:odd:bg-gray-800"
              >
                <td
                  className={`p-2 border dark:border-gray-600 ${
                    todo.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : ""
                  }`}
                >
                  {editId === todo.id ? (
                    <input
                      type="text"
                      className="border p-1 rounded w-full dark:bg-gray-600 dark:text-gray-200"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                  ) : (
                    todo.text
                  )}
                </td>
                <td className="p-2 border dark:border-gray-600 text-center">
                  <button
                    onClick={() => handleToggleTodoCompletion(todo.id)}
                    className="bg-yellow-500 text-white rounded-md px-2 py-1 hover:bg-yellow-600 active:bg-yellow-700 mr-2"
                  >
                    {todo.completed ? "Undo" : "Complete"}
                  </button>

                  {editId === todo.id ? (
                    <button
                      onClick={() => handleSaveEdit(todo.id)}
                      className="bg-green-500 text-white rounded-md px-2 py-1 hover:bg-green-600 active:bg-green-700 mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditTodo(todo.id, todo.text)}
                      className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-600 active:bg-blue-700 mr-2"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-600 active:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TodoList;
