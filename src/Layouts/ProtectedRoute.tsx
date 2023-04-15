import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { auth, loadingAuthentication } = useContext<any>(AuthContext);

  if (loadingAuthentication) {
    return <p>Loading...</p>
  }

  return <>{auth._id ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoute;
