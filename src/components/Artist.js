import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { artistInfo, artistTopTracks } from "../spotify";
import { numberWithCommas, msToMinutes } from "../utils/utilities";
import Loading from "./Loading";
import Axios from "axios";

const Flex = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  h2 {
    margin: 0;
  }
`;

const ArtistHeader = styled.div`
  margin-right: 30px;
  margin-bottom: 20px;
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
      <TracksContainer>
        <h2>Top Tracks</h2>
        {topTracks &&
          topTracks.map((track, i) => {
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

  return artist ? (
    <Flex>
      <ArtistHeader>
        <img src={artist.images[0].url} alt={artist.name} height="200" width="200" />
        <h2>{artist.name}</h2>
        <div>Followers: {numberWithCommas(artist.followers.total)}</div>
      </ArtistHeader>
      <div>{renderTracks()}</div>
    </Flex>
  ) : (
    <Loading />
  );
};
