import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { userFollowedArtists } from "../spotify";
import Loading from "./Loading";

const ArtistsContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

const Artist = styled(Link)`
  flex-basis: 20%;
  margin-bottom: 20px;
  text-align: center;
  img {
    border-radius: 5px;
  }
`;

export default () => {
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    userFollowedArtists(40).then(({ data }) => {
      setArtists(data.artists);
    });
  }, []);

  const renderArtists = () => {
    return artists ? (
      <ArtistsContainer>
        {artists.items.map(artist => {
          return (
            <Artist key={artist.id} to={`/artist/${artist.id}`}>
              <img src={artist.images[0].url} alt={artist.name} height="200" width="200" />
              <div>{artist.name}</div>
            </Artist>
          );
        })}
      </ArtistsContainer>
    ) : (
      <div>It looks like you're not following any artists.</div>
    );
  };

  return artists ? renderArtists() : <Loading />;
};
