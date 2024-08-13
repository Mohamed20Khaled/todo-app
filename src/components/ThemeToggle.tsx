import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
        className="sr-only peer"
      />
      <div className="w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full peer-checked:bg-blue-600">
        <div
          className={`absolute top-2 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
            theme === "dark" ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {theme === "light" ? "🌑 Dark " : "☀️ Light "}
      </span>
    </label>
  );
};

export default ThemeToggle;
