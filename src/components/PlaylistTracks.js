import React from "react";
import { Track, TrackAlbum, TrackTime } from "../styles/Tracks";
import { msToMinutes } from "../utils/utilities";

export const PlaylistTracks = ({ tracks }) => {
  return (
    <>
      <h2>Tracks</h2>
      {tracks &&
        tracks.items.map(({ track }) => {
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
