import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/auth/login/SignIn";
import SignUp from "./pages/auth/register/SignUp";
import { Header, LeftSidebar, RightSidebar } from "./components";
function App() {
  return (
    <div>
      <Header/>
      <div className="flex mx-auto ">
        <LeftSidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <RightSidebar />
      </div>
    </div>
  );
}

export default App;
