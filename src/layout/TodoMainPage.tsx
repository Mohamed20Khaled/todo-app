import React, { useEffect } from "react";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { useAppDispatch } from "../store";
import { setTodos } from "../features/todos/TodoSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TodoMainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      // Clear the user session data, but not the todos
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
    }
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const todos = JSON.parse(localStorage.getItem(`todos_${userId}`) || "[]");
      dispatch(setTodos(todos));
    }
  }, [dispatch]);

  return (
    <div className="p-4">
      <button
        onClick={handleLogout}
        className="self-end bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mb-4"
      >
        Logout
      </button>
      <TodoInput />
      <TodoList />
    </div>
  );
};

export default TodoMainPage;
