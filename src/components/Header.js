import React from "react";
import styled from "styled-components";
import { logout } from "../spotify";

const ProfileContainer = styled.div`
  padding: 0 20px;
  width: 100%;
  text-align: center;
  h1 {
    font-size: 40px;
    letter-spacing: 1px;
    margin-bottom: 20px;
    @media (max-width: 768px) {
      font-size: 30px;
    }
  }
  img {
    border-radius: 50%;
    max-width: 228px;
    width: 100%;
    @media (max-width: 768px) {
      max-width: 180px;
    }
  }
`;

const LogOutBtn = styled.button`
  background-color: ${({ theme: { colors } }) => colors.black};
  border: 1px solid ${({ theme: { colors } }) => colors.white};
  border-radius: 30px;
  color: ${({ theme: { colors } }) => colors.white};
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 20px;
  padding: 12px 24px;
  transition: all 0.3s ease-in-out;
  &:hover,
  &:focus {
    cursor: pointer;
    background-color: ${({ theme: { colors } }) => colors.white};
    color: ${({ theme: { colors } }) => colors.black};
  }
`;

const DefaultIcon = styled.div`
  width: 228px;
  height: 228px;
  background-color: ${props => props.theme.colors.green};
  border-radius: 50%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 80px;
`;

export const Header = ({ user }) => {
  return (
    <ProfileContainer>
      {user.images.length > 0 ? <img src={user.images[0].url} alt="user profile"></img> : <DefaultIcon>{user.display_name[0]}</DefaultIcon>}
      <div>
        <h1>{user.display_name}</h1>
        <LogOutBtn onClick={logout}>LOG OUT</LogOutBtn>
      </div>
    </ProfileContainer>
  );
};
