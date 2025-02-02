import React, { useContext } from 'react';
import { Navigate,Outlet } from 'react-router-dom';
import { AuthContext } from './AuthLogin';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/loginPage" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
