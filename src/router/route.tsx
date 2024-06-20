import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

interface User {
  token: string;
}

const PrivateRoute = () => {
  const user = useAuth() as User;
  if (!user.token) {
    return <Navigate to="/auth/login"/>;
  }
  return <Outlet />;
};

export default PrivateRoute;
