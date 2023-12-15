// RouteGuard.jsx
import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator'; // Import the LoadingIndicator component

const RouteGuard = ({ component: Component, authorized, ...props }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is logged in (you can customize this logic)
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    // Render a loading indicator while checking authentication status
    return <LoadingIndicator />;
  }
//maybe use this in another logic
  return (
    <Route
      {...props}
      element={
        isLoggedIn ? (
          authorized ? (
            <Component />
          ) : (
            <Navigate to="/forbidden" replace />
          )
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
};

export default RouteGuard;
