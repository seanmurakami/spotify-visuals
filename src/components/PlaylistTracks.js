import React from "react";
import { Track, TrackAlbum, TrackTime } from "../styles/Tracks";
import { msToMinutes } from "../utils/utilities";
import styled from "styled-components";

const TrackInput = styled.input`
  background-color: ${({ theme: { colors } }) => colors.black};
  border: 1px solid ${({ theme: { colors } }) => colors.white};
  border-radius: 30px;
  color: ${({ theme: { colors } }) => colors.white};
  padding: 15px;
  margin: 10px 0;
  outline: none;
  width: 100%;
`;

export const PlaylistTracks = ({ tracks, value, setSearch }) => {
  return (
    <>
      <h2>Tracks</h2>
      <TrackInput placeholder="Search Tracks" value={value} onChange={e => setSearch(e.target.value)} />
      {!tracks.length && <div>Sorry, we couldn't find a track matching that name...</div>}
      {tracks &&
        tracks.map(({ track }) => {
          return (
            <Track key={track.id} href={track.external_urls.spotify} target="_blank">
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
