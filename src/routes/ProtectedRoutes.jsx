// import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>; // You can add a loading spinner or skeleton UI
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;
