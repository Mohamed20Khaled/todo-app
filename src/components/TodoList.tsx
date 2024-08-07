import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import {
  deleteTodo,
  editTodo,
  toggleTodoCompletion,
} from "../features/todos/TodoSlice";
import toast from "react-hot-toast";

const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todo.todos);
  const dispatch = useAppDispatch();

  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleDelete = (id: number) => {
    dispatch(deleteTodo({ id }));
    toast.success("Todo deleted successfully!");
  };

  const handleEdit = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSave = (id: number) => {
    dispatch(editTodo({ id, text: editText }));
    setEditId(null);
    setEditText("");
    toast.success("Todo updated successfully!");
  };

  const handleToggleCompletion = (id: number) => {
    dispatch(toggleTodoCompletion({ id }));
    toast.success("Todo status updated!");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <p className="font-bold text-lg mb-4">List of TODOS</p>
      {todos.length === 0 ? (
        <p className="text-gray-500">No todos available</p>
      ) : (
        <table className="min-w-11 bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-sky-600 text-white">
              <th className="p-2 border w-2/5">Text</th>
              <th className="p-2 border w-1/5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id} className="even:bg-gray-50 odd:bg-white">
                <td
                  className={`p-2 border ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {editId === todo.id ? (
                    <input
                      type="text"
                      className="border p-1 rounded w-full"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                  ) : (
                    todo.text
                  )}
                </td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleToggleCompletion(todo.id)}
                    className="bg-yellow-500 text-white rounded-md px-2 py-1 hover:bg-yellow-600 active:bg-yellow-700 mr-2"
                  >
                    {todo.completed ? "Undo" : "Complete"}
                  </button>

                  {editId === todo.id ? (
                    <button
                      onClick={() => handleSave(todo.id)}
                      className="bg-green-500 text-white rounded-md px-2 py-1 hover:bg-green-600 active:bg-green-700 mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(todo.id, todo.text)}
                      className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-600 active:bg-blue-700 mr-2"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(todo.id)}
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
