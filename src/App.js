import React, { useState, useEffect } from "react";
import { userToken } from "./spotify";
import GlobalStyle from "./styles/GlobalStyles";
import Login from "./components/Login";

function App() {
  const [token, updateToken] = useState(userToken);

  useEffect(() => {
    updateToken(userToken);
  }, []);

  return (
    <>
      <GlobalStyle />
      {token ? <div>Hello there</div> : <Login />}
    </>
  );
}

export default App;
