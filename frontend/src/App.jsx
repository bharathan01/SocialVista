import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/auth/login/SignIn";
import SignUp from "./pages/auth/register/SignUp";
import { Header, LeftSidebar, RightSidebar } from "./components";
import {
  News,
  Notification,
  Profile,
  Messages,
  Explore,
  Search,
} from "./pages";
import Check from "./pages/Check";
function App() {
  return (
    <div>
      <Header />
      <div className="flex">
        {/* <LeftSidebar /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/news" element={<News />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/message" element={<Messages />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/search" element={<Search />} />
          <Route path="/just" element={<Check/>} />
        </Routes>

        {/* <RightSidebar /> */}
      </div>
    </div>
  );
}

export default App;
