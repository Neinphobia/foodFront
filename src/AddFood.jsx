// AddFood.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddFood.css'; 
import swal from 'sweetalert';
const AddFood = () => {
  const navigate = useNavigate();
  const [latestItem, setLatestItem] = useState(null);
  const [newFood, setNewFood] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category:'',
  });
 
  const token = localStorage.getItem('token'); // Retrieve the token from local storage
//console.log(token);

  const headers = {
    Authorization: `${token}`,
    'Content-Type': 'application/json', // Assuming you are sending JSON data
  };
  //console.log('Headers:', headers);

  const addFood = async () => { //this is adding function: 
    try {
      // Update the API endpoint and the data sent in the request
      console.log('Adding food...');
      await axios.post('http://localhost:3333/api/food/addFood', newFood,{ headers });
      // Optionally, you can update the local state to reflect the changes
      console.log('Food Added Successfully');
      setNewFood({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
      });
      swal(`${newFood.name} added successfully!`, {
        buttons: false,
        timer: 990,
        icon: "success",
      });
      setTimeout(() => {
    
        navigate('/');  // Navigate to the food list page after adding the food
      }, 1500);
    } catch (error) {

      console.error('Error adding food:', error.response.data.message);
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
  // a function to be appended to a button's onclick attribute
// that redirects them through the repl auth flow

// Example:
// <button onclick="LoginWithReplit()">Login With Replit</button>
function LoginWithReplit() {
  window.addEventListener('message', authComplete);
  var h = 500;
  var w = 350;
  var left = screen.width / 2 - w / 2;
  var top = screen.height / 2 - h / 2;

  var authWindow = window.open(
    'https://repl.it/auth_with_repl_site?domain=' + location.host,
    '_blank',
    'modal =yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
      w +
      ', height=' +
      h +
      ', top=' +
      top +
      ', left=' +
      left,
  );

  function authComplete(e) {
    if (e.data !== 'auth_complete') {
      return;
    }

    window.removeEventListener('message', authComplete);

    authWindow.close();
    location.reload();
  }
}

//fetches from /__replauthuser to get the user info

// Example:
// <script type="module"> const user = await getUserInfo() </script>
async function getUserInfo() {
  return fetch('/__replauthuser')
    .then((e) => e.json())
    .then((userInfo) => {
      if (!userInfo) {
        return null;
      }

      return userInfo;
    })
    .catch(() => {
      return null;
    });
}

  const LoginWithReplt = async () => {
    await LoginWithReplit();
  }

  
  return (
    <div>
     
      {/* <button onClick={LoginWithReplt}> Login With Replit </button>  */}
      <h2>Add Food</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={newFood.name}
          onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={newFood.description}
          onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="text"
          value={newFood.price}
          onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          value={newFood.image}
          onChange={(e) => setNewFood({ ...newFood, image: e.target.value })}
        />
      </div>
      <label>Category:</label>
        <input
          type="text"
          value={newFood.category}
          onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
        />
      <button onClick={addFood}>Add</button>
      <button onClick={handleGetLatestItem}>Get Latest Food</button>

      {latestItem &&  (<>
        <ul>
          <h4>{latestItem.name}</h4>
          <input type="text" value={latestItem._id} readOnly/>
          <li>
            {latestItem.description}
          </li>
        </ul>
      </>)}
    </div>
  );
};

export default AddFood;
