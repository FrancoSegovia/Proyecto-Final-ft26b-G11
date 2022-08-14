import { Routes, Route } from "react-router-dom";

import LandingPage from "./roles/landing/views/LandingPage/LandingPage";

import Home from "./roles/user/views/Home/Home.jsx";

import CreateStore from "./roles/user/views/CreateStore/CreateStore.jsx";

import UserSignUp from "./roles/Auth/UserSignUp.jsx";
import UserSignIn from "./roles/Auth/UserSignIn.jsx";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadUser } from './redux/actions/index';

import Payment from "./roles/user/views/Payment/Payment"


import Shops from "./roles/admin/views/Shops";
import Users from "./roles/admin/views/Users";
import Owners from "./roles/admin/views/Owners";
import Clickers from "./roles/admin/views/Clickers";
import Orders from "./roles/admin/views/Orders";

import ClickerHome from "./roles/delivery/views/ClickerHome"


function App() {

  const dispatch = useDispatch();

  //!no usar hasta que esté lista la ruta del back
  // useEffect(()=> {
  //   dispatch(loadUser());
  // },[])

  return (
    <div>
      <Routes>

        <Route exact path="/owner/create" element={<CreateStore />} />
        <Route exact path="/SignUp" element={<UserSignUp />} />
        <Route exact path="/SignIn" element={<UserSignIn/>} />
        
                    {/* General Views */}
        <Route exact path="/landing" element={<LandingPage />} />

                    {/* User Views */}
        <Route exact path="/user/home" element={<Home />} />


                    {/* Admin Views */}
        <Route exact path="/admin/shops" element={<Shops />} /> 
        <Route exact path="/admin/users" element={<Users />} /> 
        <Route exact path="/admin/owners" element={<Owners />} /> 
        <Route exact path="/admin/clickers" element={<Clickers />} />
        <Route exact path="/admin/orders" element={<Orders />} />  

                    {/* Delivery Views */}
        <Route exact path="/delivery/home" element={<ClickerHome />} />  
        
        <Route exact path="/pay" element={<Payment />} />

      </Routes>
    </div>
  );
}

export default App;
