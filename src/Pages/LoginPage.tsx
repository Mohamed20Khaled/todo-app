import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { loginUser } from "../features/auth/AuthSlice";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector((state) => !!state.auth.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todos", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    const resultAction = await dispatch(loginUser({ username, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/todos", { replace: true });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border rounded-md p-4 shadow-md w-96">
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border p-2 rounded-md w-full mb-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 rounded-md w-full mb-2"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
