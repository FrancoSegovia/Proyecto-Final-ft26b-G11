import React from "react";
import { Routes, Route } from "react-router-dom";

//ROUTESPROTECT///////////////////////////////////////////////////////////
import ProtectedRoutes from "./routing/ProtectedRoutes";
import ProtectedLanding from "./routing/ProtectedLanding";
import ProtectedUser from "./routing/ProtectedUser";
import ProtectedPayment from "./routing/ProtectedPayment";
import ProtectedAdmin from "./routing/ProtectedAdmin";
import ProtectedOwner from "./routing/ProtectedOwner";
import ProtectedDelivery from "./routing/ProtectedDelivery";
//ROUTESPROTECT///////////////////////////////////////////////////////////

//NOUSERCOMPONENTS////////////////////////////////////////////////////////
import LandingPage from "./roles/landing/views/LandingPage/LandingPage";
import SignUp from "./roles/Auth/SignUp.jsx";
import SignIn from "./roles/Auth/SignIn.jsx";
import GitProfile from "./roles/landing/views/GitProfile/GitProfile";
//NOUSERCOMPONENTS////////////////////////////////////////////////////////

//USERCOMPONENTS//////////////////////////////////////////////////////////
import UserHome from "./roles/user/views/Home/Home.jsx";
import UserPayment from "./roles/user/views/Payment/Payment";
import UserProfile from "./roles/user/views/Profile/Profile";
//USERCOMPONENTS//////////////////////////////////////////////////////////

//DELIVERYCOMPONENTS//////////////////////////////////////////////////////
import ClickerHome from "./roles/delivery/views/ClickerHome";
//DELIVERYCOMPONENTS//////////////////////////////////////////////////////

//OWNERCOMPONENTS/////////////////////////////////////////////////////////
import OwnerHome from "./roles/owner/views/OwnerHome";
import OwnerSettings from "./roles/owner/views/OwnerSettings";
import OwnerCreateStore from "./roles/owner/views/CreateStore/OwnerCreateStore";
//OWNERCOMPONENTS/////////////////////////////////////////////////////////

//ADMINCOMPONENTS/////////////////////////////////////////////////////////
import AdminShops from "./roles/admin/views/Shops";
import AdminUsers from "./roles/admin/views/Users";
import AdminOwners from "./roles/admin/views/Owners";
import AdminClickers from "./roles/admin/views/Clickers";
import AdminOrders from "./roles/admin/views/Orders";
//ADMINCOMPONENTS/////////////////////////////////////////////////////////

export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<ProtectedLanding />}>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/profiles" element={<GitProfile />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/SignIn" element={<SignIn />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<ProtectedUser />}>
            <Route exact path="/user/home" element={<UserHome />} />
            <Route exact path="/user/profile" element={<UserProfile />} />
            <Route element={<ProtectedPayment />}>
              <Route exact path="/user/pay" element={<UserPayment />} />
            </Route>
          </Route>

          <Route element={<ProtectedDelivery />}>
            <Route exact path="/delivery" element={<ClickerHome />} />
          </Route>

          <Route element={<ProtectedOwner />}>
            <Route exact path="/owner/create" element={<OwnerCreateStore />} />
            <Route exact path="/owner/home" element={<OwnerHome />} />
            <Route exact path="/owner/settings" element={<OwnerSettings />} />
          </Route>

          <Route element={<ProtectedAdmin />}>
            <Route exact path="/admin/shops" element={<AdminShops />} />
            <Route exact path="/admin/users" element={<AdminUsers />} />
            <Route exact path="/admin/owners" element={<AdminOwners />} />
            <Route exact path="/admin/clickers" element={<AdminClickers />} />
            <Route exact path="/admin/orders" element={<AdminOrders />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
