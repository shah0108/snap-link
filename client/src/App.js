import React, { useEffect, createContext, useReducer, useContext } from "react";
import NavBar from "./components/Navbar";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/screens/Home";
import Signin from "./components/screens/SignIn";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import UserProfile from "./components/screens/UserProfile";
import SubscribedUserPost from "./components/screens/SubscribesUserPost"
import { reducer, initialState } from './reducers/userReducer';

export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      if (window.location.pathname !== "/signup") {
        navigate('/signin');
      }
    } else {
      dispatch({ type: "USER", payload: user });
    }
  }, [navigate, dispatch]);
  

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/profile/:userid" element={<UserProfile />} />
      <Route path="/myfollowingpost" element={<SubscribedUserPost />} />
    </Routes>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
