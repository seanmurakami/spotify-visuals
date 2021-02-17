import React, { useState, useEffect } from "react";
import { userToken } from "./spotify";
import GlobalStyle from "./styles/GlobalStyles";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile";
import Theme from "./styles/Theme";

function App() {
  const [token, updateToken] = useState(userToken);

  useEffect(() => {
    updateToken(userToken);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Theme>{token ? <Profile /> : <Login />}</Theme>
    </>
  );
}

export default App;
