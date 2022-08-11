import { Routes, Route } from "react-router-dom";
import CreateStore from "./roles/user/views/CreateStore/CreateStore.jsx";
import Home from './roles/user/views/Home.jsx';
import UserSignUp from "./roles/Auth/UserSignUp.jsx";
import UserSignIn from "./roles/Auth/UserSignIn.jsx";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadUser } from './redux/actions/index';

function App() {

  const dispatch = useDispatch();

  //!no usar hasta que esté lista la ruta del back
  // useEffect(()=> {
  //   dispatch(loadUser());
  // },[])

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/create" element={<CreateStore />} />
        <Route exact path="/SignUp" element={<UserSignUp />} />
        <Route exact path="/SignIn" element={<UserSignIn/>} />
      </Routes>
    </div>
  );
}

export default App;
