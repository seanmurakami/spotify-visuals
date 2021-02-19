import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getPlaylist, playlistTracks } from "../spotify";
import { PlaylistTracks } from "./PlaylistTracks";
import { numberWithCommas } from "../utils/utilities";
import { Loading } from "./Loading";
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

export const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    if (id) {
      Axios.all([getPlaylist(id), playlistTracks(id)]).then(
        Axios.spread((playlistInfo, playlistTracks) => {
          setPlaylist(playlistInfo.data);
          setTracks(playlistTracks.data);
        })
      );
    }
  }, [id]);

  return tracks ? (
    <Flex>
      <PlaylistHeader>
        {playlist.images.length > 0 && <img src={playlist.images[0].url} alt={playlist.name} height="180" width="180" />}
        <h2>{playlist.name}</h2>
        <PlaylistCount>Total: {numberWithCommas(tracks.total)}</PlaylistCount>
      </PlaylistHeader>
      <TracksContainer>
        <PlaylistTracks tracks={tracks} />
      </TracksContainer>
    </Flex>
  ) : (
    <Loading />
  );
};
