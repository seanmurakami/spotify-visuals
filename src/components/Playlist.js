import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getPlaylist, playlistTracks } from "../spotify";
import { numberWithCommas, msToMinutes } from "../utils/utilities";
import Loading from "./Loading";
import Axios from "axios";

const Flex = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  @media (max-width: 578px) {
    flex-direction: column;
  }
  h2 {
    margin: 0;
  }
`;

const PlaylistHeader = styled.div`
  margin-right: 50px;
  margin-bottom: 20px;
  h2 {
    margin-top: 10px;
    margin-bottom: 4px;
  }
`;

const PlaylistCount = styled.div`
  color: grey;
  font-size: 14px;
`;

const TracksContainer = styled.section`
  width: 100%;
  flex-basis: 60%;
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
  .mr {
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

const TrackAlbum = styled.div`
  color: grey;
  font-size: 12px;
  margin-top: 3px;
`;

const TrackTime = styled.div`
  color: grey;
  font-size: 14px;
  margin-left: auto;
`;

export default () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    if (id) {
      Axios.all([getPlaylist(id), playlistTracks(id)]).then(
        Axios.spread((playlistInfo, playlistTracks) => {
          setPlaylist(playlistInfo.data);
          setTracks(playlistTracks.data);
          console.log(playlistTracks);
        })
      );
    }
  }, [id]);

  const renderTracks = () => {
    return (
      <>
        <h2>Tracks</h2>
        {tracks &&
          tracks.items.map(({ track }) => {
            return (
              <Track key={track.id}>
                {track.album.images.length > 0 && <img src={track.album.images[0].url} alt={track.name} />}
                <div className="mr">
                  <div className="track-name">{track.name}</div>
                  <TrackAlbum>{track.album.name}</TrackAlbum>
                </div>
                <TrackTime>{msToMinutes(track.duration_ms)}</TrackTime>
              </Track>
            );
          })}
      </>
    );
  };

  return tracks ? (
    <Flex>
      <PlaylistHeader>
        {playlist.images.length > 0 && <img src={playlist.images[0].url} alt={playlist.name} height="180" width="180" />}
        <h2>{playlist.name}</h2>
        <PlaylistCount>Total: {numberWithCommas(tracks.total)}</PlaylistCount>
      </PlaylistHeader>
      <TracksContainer>{renderTracks()}</TracksContainer>
    </Flex>
  ) : (
    <Loading />
  );
};
