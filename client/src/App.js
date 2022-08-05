import { Routes, Route } from "react-router-dom";
import Home from './roles/user/views/Home.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
