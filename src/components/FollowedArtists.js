import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { userFollowedArtists } from "../spotify";
import Loading from "./Loading";

const ArtistsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  row-gap: 30px;
  list-style-type: none;
  padding: 0;
  margin: 20px 0 0;
`;

const Artist = styled.li`
  text-align: center;
  a {
    display: inline-block;
  }
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
            <Artist key={artist.id}>
              <Link to={`/artist/${artist.id}`}>
                <img src={artist.images[0].url} alt={artist.name} height="200" width="200" />
              </Link>
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
