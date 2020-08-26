import React, { useState, useEffect } from "react";
import { userToken, userInfo } from "./spotify";
import Login from "./components/Login";

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

  return user ? <div>{user.email}</div> : <Login />;
}

export default App;
