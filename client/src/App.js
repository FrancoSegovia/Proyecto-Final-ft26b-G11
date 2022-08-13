import { Routes, Route } from "react-router-dom";

import LandingPage from "./roles/landing/views/LandingPage/LandingPage";

import Home from "./roles/user/views/Home/Home.jsx";

import CreateStore from "./roles/user/views/CreateStore/CreateStore.jsx";
import Payment from "./roles/user/views/Payment/Payment"


import Shops from "./roles/admin/views/Shops";
import Users from "./roles/admin/views/Users";
import Owners from "./roles/admin/views/Owners";
import Clickers from "./roles/admin/views/Clickers";


function App() {
  return (
    <div>
      <Routes>
                    {/* General Views */}
        <Route exact path="/landing" element={<LandingPage />} />

                    {/* User Views */}
        <Route exact path="/user/home" element={<Home />} />

        <Route exact path="/create" element={<CreateStore />} />


                    {/* Admin Views */}
        <Route exact path="/admin/shops" element={<Shops />} /> 
        <Route exact path="/admin/users" element={<Users />} /> 
        <Route exact path="/admin/owners" element={<Owners />} /> 
        <Route exact path="/admin/clickers" element={<Clickers />} /> 
        
        
        <Route exact path="/pay" element={<Payment />} />

      </Routes>
    </div>
  );
}

export default App;
