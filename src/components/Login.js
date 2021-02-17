import React from "react";
import styled from "styled-components";

const LOGIN_URI = process.env.NODE_ENV !== "production" ? "http://localhost:8888/login" : "https://spotify-visuals.herokuapp.com/login";

const LoginContainer = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-image: -webkit-gradient(linear, left top, right top, from(#c074b2), to(#8ab5e8));
  background-image: linear-gradient(90deg, #c074b2, #8ab5e8);
`;

const Gradient = styled.div`
  width: 100%;
  height: inherit;
  position: absolute;
  background-image: -webkit-gradient(linear, left top, left bottom, from(transparent), to(#000));
  background-image: linear-gradient(transparent, #000);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: inherit;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 40px;
  letter-spacing: 2px;
  color: ${({ theme: { colors } }) => colors.white};
`;

const LoginBtn = styled.a`
  background-color: ${({ theme: { colors } }) => colors.green};
  color: ${({ theme: { colors } }) => colors.white};
  border-radius: 30px;
  padding: 17px 35px;
  margin-bottom: 100px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  transition: background-color 0.3s ease-in-out;
  &:hover,
  &:focus {
    background-color: ${({ theme: { colors } }) => colors.lightGreen};
  }
`;

export const Login = () => {
  return (
    <LoginContainer>
      <Gradient />
      <Container>
        <Title>Spotify Visuals</Title>
        <LoginBtn href={LOGIN_URI}>LOGIN TO SPOTIFY</LoginBtn>
      </Container>
    </LoginContainer>
  );
};
