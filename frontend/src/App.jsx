import { Routes, Route, Router, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/auth/login/SignIn";
import SignUp from "./pages/auth/register/SignUp";
import {
  Header,
  LeftSidebar,
  LogOutConfirm,
  RightSidebar,
  FollowerUser,
  FollowingUser,
} from "./components";
import {
  News,
  Notification,
  Profile,
  Messages,
  Explore,
  Search,
  User,
} from "./pages";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isUserLoggedIn, children }) => {
  return isUserLoggedIn ? children : <Navigate to="/signin" />;
};
const RedirectIfAuthenticated = ({ isUserLoggedIn, children }) => {
  return isUserLoggedIn ? <Navigate to="/" /> : children;
};
function App() {
  const { isUserLoggedIn } = useSelector((state) => state.userAuth);
  return (
    <div>
      {isUserLoggedIn && (
        <dialog id="openLogOutcard" className="modal">
          <div className="modal-box flex items-center justify-center">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <LogOutConfirm />
          </div>
        </dialog>
      )}

      {isUserLoggedIn && <Header />}
      <div className="flex ">
        {isUserLoggedIn && <LeftSidebar />}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isUserLoggedIn={isUserLoggedIn}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/news"
            element={
              <ProtectedRoute isUserLoggedIn={isUserLoggedIn}>
                <News />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute isUserLoggedIn={isUserLoggedIn}>
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoute isUserLoggedIn={isUserLoggedIn}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/message"
            element={
              <ProtectedRoute isUserLoggedIn={isUserLoggedIn}>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute isUserLoggedIn={isUserLoggedIn}>
                <User />
              </ProtectedRoute>
            }
          >
            <Route path="following" element={<FollowingUser />}></Route>
            <Route path="Follower" element={<FollowerUser />}></Route>
          </Route>
          <Route
            path="/explore"
            element={
              <ProtectedRoute isUserLoggedIn={isUserLoggedIn}>
                <Explore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute isUserLoggedIn={isUserLoggedIn}>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <RedirectIfAuthenticated isUserLoggedIn={isUserLoggedIn}>
                <SignIn />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectIfAuthenticated isUserLoggedIn={isUserLoggedIn}>
                <SignUp />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="*"
            element={<Navigate to={isUserLoggedIn ? "/" : "/signin"} />}
          />
        </Routes>
        {isUserLoggedIn && <RightSidebar />}
      </div>
    </div>
  );
}
export default App;
