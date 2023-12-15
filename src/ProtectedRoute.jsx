// ProtectedRoute.jsx
import React, { useEffect,useState } from 'react';


import { useNavigate} from 'react-router-dom';

import { getUserInfo } from './Utils/AuthUtil';
import swal from 'sweetalert';


const ProtectedRoute = ({ element: Element, role, ...rest }) => {
  const navigate = useNavigate(); //dont forget to use this hook in the body. :)
  const user = getUserInfo();
  const userRole = user ? user.role : null;
  
  const [signedInOnce , setSignedInOnce] = useState(null);
  useEffect(() => {
    if(!user) {
        swal(`You need to log in first.`, {
            buttons: false,
            timer: 2000,
            icon: "error",
          });
          navigate('/login');
    
          
      }
      if(user.role != 'admin'){
        swal(`You have no permission to add or remove food.`, {
            buttons: false,
            timer: 2000,
            icon: "error",
          });
          navigate('/login');
    
      }
    //   if(!signedInOnce){

    //       setSignedInOnce(true); //ill add another logic sometime later
    //     swal("You can add or remove food with this page.", {
    //         title:'Welcome admin.',
    //         buttons:false,
    //         timer:3000,
    //         // className: "red-bg",
    //       });
    //   }
      

  }, []);
  // You can perform additional checks or logic here if needed

  return <Element />;
};

export default ProtectedRoute;
