import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store";

interface PrivateRouteProps {
  children: React.ReactElement;
  redirectPath?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  redirectPath = "/todos",
}) => {
  const isAuthenticated = useAppSelector((state) => !!state.auth.user);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (location.pathname === "/login") {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PrivateRoute;
