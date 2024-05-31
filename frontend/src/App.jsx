import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/auth/login/SignIn";
import SignUp from "./pages/auth/register/SignUp";
import { Header, LeftSidebar, RightSidebar } from "./components";
import { News } from "./pages";
function App() {
  return (
    <div>
      <Header />
      <div className="flex">
        <LeftSidebar />
        <div className="flex-grow xl:ml-[14%] lg:ml-[20%] ml-[60px] mt-[64px] w-[63%]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}

export default App;
