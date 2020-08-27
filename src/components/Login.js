import React from "react";
import styled from "styled-components";
import Theme from "../styles/Theme";

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
  color: ${({ theme: { colors } }) => colors.green};
`;

const LoginBtn = styled.a`
  background-color: #1db954;
  color: white;
  border-radius: 30px;
  padding: 17px 35px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-align: center;
`;

export default () => {
  return (
    <Theme>
      <LoginContainer>
        <Title>Please Log In</Title>
        <LoginBtn href={LOGIN_URI}>Log In</LoginBtn>
      </LoginContainer>
    </Theme>
  );
};
