
import {Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/auth/login/SignIn";
import SignUp from "./pages/auth/register/SignUp";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/signin"  element={<SignIn/>}/>
        <Route path="/signup"  element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
