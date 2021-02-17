import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  25% {
    transform: scale(1.4)
  }
  75% {
    transform: scale(1);
  }
`;

const Container = styled.div`
  width: inherit;
  height: ${props => (props.full ? "100vh" : "")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.div`
  height: 20px;
  width: 20px;
  margin: 0 10px;
  border-radius: 100%;
  background-color: white;
  animation: ${rotate} 2s linear infinite;
  animation-delay: ${props => props.delay};
`;

export const Loading = ({ full }) => {
  return (
    <Container full={full}>
      <Dot delay="0s" />
      <Dot delay="0.3s" />
      <Dot delay="0.6s" />
    </Container>
  );
};
