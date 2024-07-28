/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('userData'));

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
