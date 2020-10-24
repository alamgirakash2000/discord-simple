import React, { useEffect } from "react";
import "./App.scss";
import Sidebar from "./components/Sidebar/Sidebar";
import Chatbox from "./components/Chatbox/Chatbox";
import Login from "./components/Login";
import { selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./FirebaseConfig";
import { login, logout } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            name: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user ? (
        <div className="row">
          <Sidebar />
          <Chatbox />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
