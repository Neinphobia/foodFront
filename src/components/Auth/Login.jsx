import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../Modal/Modal';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3333/auth/login', { username, password });
      const { token , user } = response.data;

      // Store the JWT in a secure manner (e.g., HTTP-only cookie or local storage)
      // Note: Ensure proper security measures for storing JWTs in your application
  
        localStorage.setItem('token', token);
       localStorage.setItem('user', JSON.stringify(user));

      // Display a modal message (you can customize this part)
      setModalMessage(`Logged in as ${username}`);
      setIsModalOpen(true);

      // Close the modal after 2 seconds
      setTimeout(() => {
        setIsModalOpen(false);

        // Redirect to the desired route
        //navigate('/');
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      console.error('Login failed:', error);
      setModalMessage('Login failed. Please check your credentials.');
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Redirect to the desired route after closing the modal
    navigate('/login');
  };

  useEffect(() => {
    // Check if the user is already logged in (token present in local storage)
    const token = localStorage.getItem('token');

    if (token) {
      // Optionally, you can decode the token to get user information
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded Token:', decodedToken);

      // Update your UI to indicate that the user is logged in
      setModalMessage(`Already logged in as ${decodedToken.username}`);
      setIsModalOpen(true);

      // Close the modal after 2 seconds
      setTimeout(() => {
        setIsModalOpen(false);

        // Redirect to the desired route
        navigate('/');
      }, 2000);
    }
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h2>Login</h2>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <Modal isOpen={isModalOpen} message={modalMessage} onClose={handleCloseModal} />
    </div>
  );
};

export default Login;
