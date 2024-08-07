import React, { useState } from "react";
import { useAppDispatch } from "../store";
import { addTodo } from "../features/todos/TodoSlice";
import toast from "react-hot-toast";

const TodoInput: React.FC = () => {
  const [text, setText] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleAddTodo = () => {
    // checks if the input text is not empty after trimming whitespace
    if (text.trim().length > 0) {
      // dispatch the 'addTodo' action with the text as the payload
      dispatch(addTodo({ text }));
      toast.success("Todo added successfully!");
      setText("");
    } else {
      toast.error("Todo text cannot be empty!");
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex items-center">
        <input
          id="todo-input"
          type="text"
          className="border rounded-md p-2 mx-2 w-64"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleAddTodo}
          className="bg-violet-500 text-white rounded-md px-4 py-2 cursor-pointer hover:bg-violet-600 active:bg-violet-700"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoInput;
