// RemoveFood.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RemoveFood = () => {
  const navigate = useNavigate();
  const [foodId, setFoodId] = useState('');
  const [latestItem, setLatestItem] = useState('');
  
  const token = localStorage.getItem('token')
  const headers = {
    Authorization: `${token}`,
    'Content-Type': 'application/json', // Assuming you are sending JSON data
  };
  const removeFood = async () => { //fnc
    try {
      await axios.delete(`http://localhost:3333/api/food/${foodId}`,{headers});
      // Optionally, you can update the local state to reflect the changes
      setFoodId('');
      navigate('/');
    } catch (error) {
      console.error('Error removing food:', error);
    }
  };

  const handleGetLatestItem = async() => { //gets the latest item
    try {
      const latest = await axios.get('http://localhost:3333/api/food/latest');
      setLatestItem(latest.data);
    } catch (error) {
      console.log('latest fail');
    }
   
  }
  return (
    <div>
      <h2>Remove Food</h2>
      <input
        type="text"
        placeholder="Food ID"
        value={foodId}
        onChange={(e) => setFoodId(e.target.value)}
      />
      <button onClick={removeFood}>Remove</button>
      <button onClick={handleGetLatestItem}>Get Latest Item</button>

      {latestItem && (
        <>
        <h2>
          {latestItem.name}
        </h2>
        <p>{latestItem.description}</p><span>{latestItem.price}</span>
        <input type="text" value={latestItem._id} readOnly />

        </>
        
      )}
    </div>
  );
};

export default RemoveFood;
