import React, { useState, useEffect } from "react";
import "./App.css";
import { userToken } from "./spotify";

function App() {
  const [token, updateToken] = useState("");

  useEffect(() => {
    if (userToken) {
      updateToken(userToken);
    }
  }, []);

  return token ? (
    <div className="App">{token}</div>
  ) : (
    <div>
      <a href="http://localhost:8888/login">Login</a>
    </div>
  );
}

export default App;
