import React from "react";
import styled from "styled-components";

const LOGIN_URI = process.env.NODE_ENV !== "production" ? "http://localhost:8888/login" : "https://spotify-visuals.herokuapp.com/login";

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export default () => {
  return (
    <LoginContainer>
      <Title>Please Sign In</Title>
      <a href={LOGIN_URI}>Login</a>
    </LoginContainer>
  );
};
