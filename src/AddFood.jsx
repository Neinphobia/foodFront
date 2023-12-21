// AddFood.js
import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import './react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddFood.css'; 
import swal from 'sweetalert';

import { useSpring, animated } from 'react-spring'; 


const AddFood = () => {




  const baseUrl = "https://food-app-five-neon.vercel.app";
  const navigate = useNavigate();
  const [latestItem, setLatestItem] = useState(null);
  const [orders, setOrders] = useState(null);
  const [newFood, setNewFood] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category:'',
  });
  const [newOrder, setNewOrder] = useState({
    name:'',
  })
 
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
      await axios.post(`${baseUrl}/api/food/addFood`, newFood,{ headers });
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
      const latest = await axios.get(`${baseUrl}/api/food/latest`);
      setLatestItem(latest.data);
    } catch (error) {
      console.log('latest fail');
    }
   
  }
  const handleNotification = ()=>{
        Notification.requestPermission().then(perm => {
            if (perm === "granted") {
                const notification = new Notification("Example notification", {
                    body: "Click notification test",
                    data: { text: "test" },
                })
                
            }
            else {
              console.log('denied');
            }
        })

  }
  const handleAddOrder = async () => {
    try {
      await axios.post(`${baseUrl}/order/post`, newOrder,{ headers });
      swal(`${newOrder.name}`, {
        buttons: false,
        timer: 3000,
        icon: "success",
        title:`Added your order Successfully! Your order: `,
      });
      setNewOrder({
        name:''
      })
    } catch (error) {
      
    }
  }

  const getOrders = async () => {
    try {
      const orders = await axios.get(`${baseUrl}/order/order/`);
      setOrders(orders.data);
      console.log(orders.data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`${baseUrl}/order/${id}`,{headers});
      swal(`${id}`, {
        buttons: false,
        timer: 2000,
        icon: "success",
        title:`Deleted Successfully!`,
      });
    } catch (error) {
      console.log(error);
    }

  } 
  const handleDeleteOrder = (orderId) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete this order?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
         
            deleteOrder(orderId);
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
   };

  useEffect(() => {
    // Fetch food data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/order/`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [orders]);


  
  return (
    <div>
    
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
      <br />
      <button onClick={handleNotification}>Allow Notification</button>
      <br />
      <button onClick={getOrders}>See the Orders:</button>
      <br />
      <label>Order Name:</label>
        <input
          type="text"
          value={newOrder.name}
          onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
          placeholder='Type your order...'
        />
          <button onClick={handleAddOrder}>Order</button>

      {latestItem &&  (<>
        <ul>
          <h4>{latestItem.name}</h4>
          <input type="text" value={latestItem._id} readOnly/>
          <li>
            {latestItem.description}
          </li>
        </ul>
      </>)}
      {orders &&  (<>
        <ul>
        
          {orders
            .slice() // Create a copy of the array to avoid modifying the original
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by date in descending order
            .map((order, index) => (
            <div className="orderContainer">

            <li key={order._id}>
            <p>{order.name}</p>
            <button onClick={() => handleDeleteOrder(order._id)}>Delete Order</button>
            <input type="text" value={order._id} readOnly/>
            </li>
            </div>
        ))}
        </ul>
      </>)}
      
    </div>
  );
};

export default AddFood;
