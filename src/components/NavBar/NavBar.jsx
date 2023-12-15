// NavBar.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if the user is logged in (you can customize this logic)
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);

      // Decode the token to get user information
      const decodedToken = parseJwt(token);
      if (decodedToken) {
        setUsername(decodedToken.username);
        // console.log(decodedToken.username);
      }
    }
  },  []);

  const handleLogout = () => {
    // Perform logout actions (clear token, reset state, etc.)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
  };

  // Helper function to parse JWT token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Logged in as: {username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Not logged in</p>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
