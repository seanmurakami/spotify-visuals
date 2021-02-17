import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { artistInfo, artistTopTracks } from "../spotify";
import { numberWithCommas } from "../utils/utilities";
import { TopTracks } from "./TopTracks";
import Loading from "./Loading";
import Axios from "axios";

const Flex = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  @media (max-width: 576px) {
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
    border-radius: 5px;
  }
`;

const Followers = styled.div`
  color: grey;
  font-size: 14px;
`;

export const ArtistDetails = () => {
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

  return artist ? (
    <Flex>
      <ArtistHeader>
        <img src={artist.images[0].url} alt={artist.name} height="180" width="180" />
        <h2>{artist.name}</h2>
        <Followers>Followers: {numberWithCommas(artist.followers.total)}</Followers>
      </ArtistHeader>
      <TopTracks tracks={topTracks} />
    </Flex>
  ) : (
    <Loading />
  );
};
