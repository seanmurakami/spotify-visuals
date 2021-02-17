import React from "react";
import styled from "styled-components";
import { Track, TrackAlbum, TrackTime } from "../styles/Tracks";
import { msToMinutes } from "../utils/utilities";

const TracksContainer = styled.section`
  width: 100%;
  flex-basis: 60%;
`;

export const TopTracks = ({ tracks }) => {
  return (
    <TracksContainer>
      <h2>Top Tracks</h2>
      {tracks &&
        tracks.map((track, i) => {
          return (
            <Track key={i} href={track.external_urls.spotify} target="_blank">
              <img src={track.album.images[0].url} alt={track.name} />
              <div className="mr">
                <div className="track-name">{track.name}</div>
                <TrackAlbum>{track.album.name}</TrackAlbum>
              </div>
              <TrackTime>{msToMinutes(track.duration_ms)}</TrackTime>
            </Track>
          );
        })}
    </TracksContainer>
  );
};
