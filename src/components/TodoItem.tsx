import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Todo } from "./TodoList";
import { useAppDispatch } from "../store";
import {
  deleteTodo,
  editTodo,
  toggleTodoCompletion,
} from "../features/todos/TodoSlice";
import toast from "react-hot-toast";

interface TodoListProps {
  todo: Todo;
  userId: number | undefined;
}

const TodoItem: React.FC<TodoListProps> = ({ todo, userId }) => {
  const {
    attributes,
    listeners, // object comes from the useSortable hook and contains event handlers that enable the drag-and-drop functionality (e.g., onMouseDown, onTouchStart)
    setNodeRef, // used to reference the HTML element in the DOM for drag-and-drop
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
  });

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

  // object is applied for visual transformations
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} className="cursor-grab">
      <td
        className={`p-2 border dark:border-gray-600 ${
          todo.completed ? "line-through text-gray-500 dark:text-gray-400" : ""
        }`}
        //ensures that the drag-and-drop functionality is disabled while the todo item is being edited
        {...(editId !== todo.id && listeners)} // Only apply listeners when not in edit mode
      >
        {editId === todo.id ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="p-1 border rounded w-full dark:bg-gray-700 dark:text-gray-200"
            // onBlur={() => handleSaveEdit(todo.id)} // Save on blur to exit edit mode
            // Automatically focus the input when editing
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
  );
};

export default TodoItem;
