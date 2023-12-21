// FoodList.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import './FoodList.css'; // Import the CSS file

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const baseUrl = "https://food-app-five-neon.vercel.app";



  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDescription,setSelectedDescription] = useState(null);
  //const modalRef = useRef(null);
  const handleImageClick = (image,description) => {
    setSelectedImage(image);
    setSelectedDescription(description);
  };

  const handleCloseModal = (event) => {
      
    if (event.target.className === 'modal show') {
      setSelectedImage(null);
    }
  
  };
  
  useEffect(() => {
    // Fetch food data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/food`);
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Food List</h2>
      <ul>
        {foods.map((food, index) => (
          <li key={food._id}>
            <div className="container">
            {food.image && <img src={food.image} alt={food.name} onClick={() => handleImageClick(food.image,food.description)} />}
              <div className="food-info">
                <p><strong className='text-xs sm:text-sm md:text-base lg:text-lg'>{food.name}</strong></p>
                <p className='text-xs sm:text-sm md:text-base lg:text-lg'>{food.description}</p>
                <p className='text-xs sm:text-sm md:text-base lg:text-lg'>{food.price} $</p>

              </div>
            </div>
          </li>
        ))}

     
      </ul>

      {selectedImage && (
        <div className="modal show" onClick={handleCloseModal}>
          <img src={selectedImage} alt="Selected Food" /> 
          <details>
          <summary>See description</summary>
             <p>
              {selectedDescription}
             </p>
            
          </details>
        </div>
        
      )}
    

    </div>
  );
};

export default FoodList;
