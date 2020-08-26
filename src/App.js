import React, { useState, useEffect } from "react";
import "./App.css";
import { userToken, userInfo } from "./spotify";

const LOGIN_URI = process.env.NODE_ENV !== "production" ? "http://localhost:8888/login" : "https://spotify-visuals.herokuapp.com/login";

function App() {
  const [user, updateUser] = useState("");

  useEffect(() => {
    if (userToken && userToken !== "undefined") {
      getUserInfo();
    }
  }, []);

  const getUserInfo = async () => {
    const { data } = await userInfo();
    updateUser(data);
  };

  return user ? (
    <div className="App">{user.email}</div>
  ) : (
    <div>
      <a href={LOGIN_URI}>Login</a>
    </div>
  );
}

export default App;
