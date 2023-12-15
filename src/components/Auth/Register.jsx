import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const baseUrl="https://food-app-five-neon.vercel.app";
  const handleRegister = async () => {
    try {
      await axios.post(`${baseUrl}/auth/register`, { username, password });
      console.log('done!');
      setModalMessage('Registration successful. You can now login.');
      setIsModalOpen(true);
      // Close modal after 2 seconds
      setTimeout(() => {
        setIsModalOpen(false);
        // Redirect to the desired route
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration failed:', error);
      setModalMessage('Registration failed. Please choose a different username.');
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>

      <Modal isOpen={isModalOpen} message={modalMessage} />
    </div>
  );
};

export default Register;
