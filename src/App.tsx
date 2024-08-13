import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import TodoMainPage from "./Pages/TodoMainPage";
import PrivateRoute from "./utils/PrivateRoute";
import { ThemeProvider } from "./contexts/ThemeContext";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/todos"
              element={
                <PrivateRoute>
                  <TodoMainPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
