import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";
import { userInfo, userFollowedArtists, userTopTracks, userPlaylists, recentlyPlayedTracks } from "../spotify";
import { Header } from "./Header";
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

export default () => {
  const [user, setUser] = useState(null);
  const [artists, setArtists] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [recentTracks, setRecentTracks] = useState(null);

  useEffect(() => {
    Axios.all([userInfo(), userFollowedArtists(), userTopTracks(), userPlaylists(), recentlyPlayedTracks()]).then(
      Axios.spread((user, followedArtists, tracks, playlists, recent) => {
        setUser(user.data);
        setArtists(followedArtists.data.artists);
        setTracks(tracks.data.items);
        setPlaylists(playlists.data);
        setRecentTracks(recent.data.items);
      })
    );
  }, []);

  return (
    <Container>
      {user ? (
        <>
          <Header user={user} />
          <Router>
            <Switch>
              <Route exact path="/">
                <User artists={artists} tracks={tracks} playlists={playlists} recent={recentTracks} />
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
