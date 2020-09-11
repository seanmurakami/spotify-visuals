import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { artistInfo, artistTopTracks } from "../spotify";
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

const ArtistHeader = styled.div`
  margin-right: 50px;
  margin-bottom: 20px;
  h2 {
    margin-top: 10px;
    margin-bottom: 4px;
  }
  img {
  }
`;

const Followers = styled.div`
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

  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    if (id) {
      Axios.all([artistInfo(id), artistTopTracks(id)]).then(
        Axios.spread((artist, topTracks) => {
          setArtist(artist.data);
          setTopTracks(topTracks.data.tracks);
        })
      );
    }
  }, [id]);

  const renderTracks = () => {
    return (
      <>
        <h2>Top Tracks</h2>
        {topTracks &&
          topTracks.map((track, i) => {
            return (
              <Track key={i}>
                <img src={track.album.images[0].url} alt={track.name} />
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

  return artist ? (
    <Flex>
      <ArtistHeader>
        <img src={artist.images[0].url} alt={artist.name} height="180" width="180" />
        <h2>{artist.name}</h2>
        <Followers>Followers: {numberWithCommas(artist.followers.total)}</Followers>
      </ArtistHeader>
      <TracksContainer>{renderTracks()}</TracksContainer>
    </Flex>
  ) : (
    <Loading />
  );
};
