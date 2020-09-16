import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";
import { userInfo, userFollowedArtists, userTopTracks, userPlaylists, logout } from "../spotify";
import User from "./User";
import Artist from "./Artist";
import FollowedArtists from "./FollowedArtists";
import Playlist from "./Playlist";
import styled from "styled-components";
import Loading from "../components/Loading";

const Container = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 50px 20px;
`;

const ProfileContainer = styled.div`
  padding: 0 20px;
  width: 100%;
  text-align: center;
  h1 {
    font-size: 40px;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }
  img {
    border-radius: 50%;
    max-width: 228px;
    width: 100%;
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

const LogOutBtn = styled.button`
  background-color: ${({ theme: { colors } }) => colors.black};
  border: 1px solid ${({ theme: { colors } }) => colors.white};
  border-radius: 30px;
  color: ${({ theme: { colors } }) => colors.white};
  font-weight: 700;
  padding: 12px 24px;
  letter-spacing: 2px;
  transition: all 0.3s ease-in-out;
  &:hover,
  &:focus {
    background-color: ${({ theme: { colors } }) => colors.white};
    color: ${({ theme: { colors } }) => colors.black};
  }
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export default () => {
  const [user, setUser] = useState(null);
  const [artists, setArtists] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    Axios.all([userInfo(), userFollowedArtists(), userTopTracks(), userPlaylists()]).then(
      Axios.spread((user, followedArtists, tracks, playlists) => {
        setUser(user.data);
        setArtists(followedArtists.data.artists);
        setTracks(tracks.data.items);
        setPlaylists(playlists.data);
      })
    );
  }, []);

  const renderProfile = () => {
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

  return (
    <Container>
      {user ? (
        <>
          {renderProfile()}
          <Router>
            <Switch>
              <Route exact path="/">
                <User artists={artists} tracks={tracks} playlists={playlists} />
              </Route>
              <Route path="/artist/:id">
                <Artist />
              </Route>
              <Route path="/artist">
                <FollowedArtists />
              </Route>
              <Route path="/playlist/:id">
                <Playlist />
              </Route>
            </Switch>
          </Router>
        </>
      ) : (
        <Loading full />
      )}
    </Container>
  );
};
