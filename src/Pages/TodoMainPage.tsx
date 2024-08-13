import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import ThemeToggle from "../components/ThemeToggle";
import { useAppDispatch, useAppSelector } from "../store";
import { logoutUser } from "../features/auth/AuthSlice";
import { setTodos } from "../features/todos/TodoSlice";
import toast from "react-hot-toast";
import useBackButtonLogout from "../hooks/useBackButtonLogout";

const TodoMainPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const todos = useAppSelector((state) => (user ? state.todo[user.id] : []));
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  // Custom hook to make the back button behave the same as the logout button
  useBackButtonLogout();

  // Load todos from persisted store on component mount
  useEffect(() => {
    if (user) {
      dispatch(setTodos({ userId: user.id, todos }));
    }
  }, [dispatch, user, todos]);

  // Filter todos based on search term
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between mb-4">
        <ThemeToggle />

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col items-center mb-4">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border rounded-md w-full max-w-md dark:bg-gray-600 dark:text-gray-200"
        />
        <TodoInput userId={user?.id} />
      </div>

      <TodoList todos={filteredTodos} userId={user?.id} />
    </div>
  );
};

export default TodoMainPage;
