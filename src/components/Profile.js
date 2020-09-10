import React, { useState, useEffect } from "react";
import { userInfo, userFollowedArtists, userTopTracks, userPlaylists } from "../spotify";
import { numberWithCommas, msToMinutes } from "../utils/utilities";
import styled from "styled-components";
import Loading from "../components/Loading";
import Axios from "axios";

const Container = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 50px 20px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProfileContainer = styled.div`
  padding: 0 20px;
  width: 100%;
  text-align: center;
  h1 {
    font-size: 40px;
    letter-spacing: 1px;
  }
  img {
    border-radius: 50%;
    max-width: 228px;
    width: 100%;
  }
`;

const ArtistsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Artist = styled.div`
  border-radius: 10px;
  background-color: #2a2a2a;
  display: flex;
  flex-basis: 33%;
  @media (max-width: 768px) {
    flex-basis: 49%;
  }
  @media (max-width: 556px) {
    flex-basis: 100%;
  }
  width: 100%;
  align-items: center;
  margin: 0 0 10px 0;
  padding: 8px;
  letter-spacing: 0.8px;
  transition: background-color 300ms ease-in-out;
  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 20px;
  }
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.darkGreen};
  }
`;

const FollowerCount = styled.div`
  color: grey;
  font-size: 12px;
  margin-top: 3px;
`;

const TracksContainer = styled.section`
  width: 100%;
  max-width: 550px;
`;

const Track = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 0 8px;
  img {
    height: 50px;
    width: 50px;
    margin-right: 20px;
  }
  &:hover {
    cursor: pointer;
  }
  &:hover {
    & .track-name {
      color: ${props => props.theme.colors.green};
    }
  }
`;

const TrackTime = styled.div`
  color: grey;
  font-size: 12px;
  margin-top: 3px;
`;

const PlaylistContainer = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-between;
  @media (min-width: 769px) {
    flex-wrap: wrap;
    width: 260px;
  }
  @media (max-width: 768px) {
    width: 100%;
    overflow-x: scroll;
  }
`;

const Playlist = styled.div`
  margin-bottom: 10px;
  margin-right: 10px;
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
        setArtists(followedArtists.data.artists.items);
        setTracks(tracks.data.items);
        setPlaylists(playlists.data.items);
      })
    );
  }, []);

  const renderProfile = () => {
    return (
      <ProfileContainer>
        {user.images.length > 0 && <img src={user.images[0].url} alt="user profile"></img>}
        <div>
          <h1>{user.display_name}</h1>
        </div>
      </ProfileContainer>
    );
  };

  const renderArtists = () => {
    return (
      <section>
        <h2>Following</h2>
        <ArtistsContainer>
          {artists &&
            artists.map((artist, i) => {
              return (
                <Artist key={i}>
                  <img src={artist.images[0].url} alt="artist" />
                  <div>
                    <div>{artist.name}</div>
                    <FollowerCount>{numberWithCommas(artist.followers.total)} FOLLOWERS</FollowerCount>
                  </div>
                </Artist>
              );
            })}
        </ArtistsContainer>
      </section>
    );
  };

  const renderTracks = () => {
    return (
      <TracksContainer>
        <h2>Top Tracks</h2>
        {tracks &&
          tracks.map((track, i) => {
            return (
              <Track key={i}>
                <img src={track.album.images[0].url} alt={track.name} />
                <div>
                  <div className="track-name">{track.name}</div>
                  <TrackTime>{msToMinutes(track.duration_ms)}</TrackTime>
                </div>
              </Track>
            );
          })}
      </TracksContainer>
    );
  };

  const renderPlaylists = () => {
    return (
      <section>
        <h2>Playlists</h2>
        <PlaylistContainer>
          {playlists &&
            playlists.map(playlist => {
              return (
                <Playlist key={playlist.id}>
                  <img src={playlist.images[0].url} alt={playlist.name} height="120" width="120" />
                </Playlist>
              );
            })}
        </PlaylistContainer>
      </section>
    );
  };

  return (
    <Container>
      {user ? (
        <>
          {renderProfile()}
          {renderArtists()}
          <Flex>
            {renderTracks()}
            {renderPlaylists()}
          </Flex>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};
