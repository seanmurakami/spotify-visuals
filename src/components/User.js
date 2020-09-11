import React from "react";
import { Link } from "react-router-dom";
import { numberWithCommas, msToMinutes } from "../utils/utilities";
import styled from "styled-components";
import Subheader from "./Subheader";

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ArtistsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Artist = styled(Link)`
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
  transition: all 300ms ease-in-out;
  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 20px;
  }
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.lightGrey};
    color: ${props => props.theme.colors.green};
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

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  transition: all 300ms ease-in-out;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Playlist = styled.div`
  position: relative;
  height: 120px;
  margin-bottom: 10px;
  margin-right: 10px;
  transition: all 300ms ease-in-out;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;

export default ({ artists, tracks, playlists }) => {
  const renderArtists = () => {
    return (
      <section>
        <Subheader count={artists.total} title="Following" />
        <ArtistsContainer>
          {artists &&
            artists.items.map((artist, i) => {
              return (
                <Artist key={i} to={`/artist/${artist.id}`}>
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
        <Subheader count={playlists.total} title="Playlists" />
        <PlaylistContainer>
          {playlists &&
            playlists.items.map(playlist => {
              return (
                <Playlist key={playlist.id}>
                  <img src={playlist.images[0].url} alt={playlist.name} height="120" width="120" />
                  <Overlay>
                    <div>{playlist.name}</div>
                  </Overlay>
                </Playlist>
              );
            })}
        </PlaylistContainer>
      </section>
    );
  };

  return (
    <>
      {artists && renderArtists()}
      <Flex>
        {tracks && renderTracks()}
        {playlists && renderPlaylists()}
      </Flex>
    </>
  );
};
