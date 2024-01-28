import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodWithCategory.css';
import './FoodList.css'; 
const FoodWithCategory = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // Added state for category filter
  const baseUrl = "https://food-app-five-neon.vercel.app";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/food`);
        setFoods(response.data);
        setFilteredFoods(response.data); // Initially set filteredFoods to all foods
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    filterFoods(term, selectedCategory);
    
  };


  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category); // Toggle category
    filterFoods(searchTerm, category);
  };
  // Function to handle category filter
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    filterFoods(searchTerm, category);
  };

  // Function to filter foods based on search term and category
  const filterFoods = (searchTerm, category) => {
    let filtered = [...foods];

    if (searchTerm) {
      filtered = filtered.filter((food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
        
      );
    }

    if (category) {
      filtered = filtered.filter((food) => food.category === category);
    }

    setFilteredFoods(filtered);
  };



  const [selectedImage, setSelectedImage] = useState(null);

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
  return (
    <div>
      <h2>Food List</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Clickable list of categories */}
      <div className="category-list">
        <span
          className={selectedCategory === '' ? 'selected' : ''}
          onClick={() => handleCategoryClick('')}
        >
          All Categories
        </span>
        {/* Dynamically generate category spans based on available categories */}
        {Array.from(new Set(foods.map((food) => food.category))).map((category) => (
          <span
            key={category}
            className={selectedCategory === category ? 'selected' : ''}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </span>
        ))}
      </div>

      <ul>
        {filteredFoods.map((food) => (
          <li key={food._id}>
            <div className="container animate-fadeIn">
              {food.image && <img src={food.image} alt={food.name} onClick={() => handleImageClick(food.image) }  />}
              <div className="food-info">
                <p>{food.name}</p>
                <p>{food.description}</p>
                <p>{food.price}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {selectedImage && (
        <div className="modal show" onClick={handleCloseModal}>
          <img src={selectedImage} alt="Selected Food" /> 
        </div>
        
      )}
    </div>
  );
};

export default FoodWithCategory;