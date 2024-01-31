import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FoodList from "./FoodList";
import AddFood from "./AddFood";
import RemoveFood from "./RemoveFood";
import ErrorPage from "./ErrorPage";
import Categories from "./FoodWithCategory";
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from './ProtectedRoute';
import './index.css'

function App() {

  console.log('hi');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRoleAdmin, setIsRoleAdmin] = useState(false);
  const handleLogout = () => {
    // Implement your logout logic here
    setIsLoggedIn(false);
    // Clear the token from local storage or perform any necessary cleanup
    localStorage.removeItem('token');
  };

  useEffect(() => {
    // Check if the user is logged in on component mount
    const token = localStorage.getItem('token');

    const user = JSON.parse(localStorage.getItem('user'));
    
    if (token) {
      // Additional checks or verification can be added here
      setIsLoggedIn(true);
    }
    if(user != undefined && user !=null){

      if(user.role === 'admin'){
        setIsRoleAdmin(true);
      }
    }
  }, []); 
  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      <div>
        <h1>Food App</h1>
        <nav>
          <ul style={{listStyle:"none"}}>
            <li>
              <Link to="/">Menu</Link>
            </li>
            {isRoleAdmin && (
      <>
        <li>
          <Link to="/add">Add Food</Link>
        </li>
        <li>
          <Link to="/remove">Remove Food</Link>
        </li>
      </>
    )}
           

            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<FoodList />} />
            
          <Route path="/add" element={<ProtectedRoute element={AddFood} role="admin" />} />
          <Route path="/remove" element={<ProtectedRoute element={RemoveFood} role="admin" />} />

          <Route path="/categories" element={<Categories />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
