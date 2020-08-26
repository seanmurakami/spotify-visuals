import React, { useState, useEffect } from "react";
import "./App.css";
import { userToken, userInfo } from "./spotify";

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
      <a href="http://localhost:8888/login">Login</a>
    </div>
  );
}

export default App;
