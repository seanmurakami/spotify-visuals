import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { userFollowedArtists } from "../spotify";
import Loading from "./Loading";
import Axios from "axios";

const ArtistsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  @media (max-width: 468px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  grid-gap: 20px;
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Artist = styled.li`
  text-align: center;
  a {
    display: inline-block;
  }
  img {
    border-radius: 5px;
    height: 200px;
    width: 200px;
    @media (max-width: 468px) {
      height: 120px;
      width: 120px;
    }
  }
`;

const SeeMore = styled.div`
  text-align: center;
  button {
    background-color: ${({ theme: { colors } }) => colors.black};
    border: 1px solid ${({ theme: { colors } }) => colors.white};
    border-radius: 30px;
    color: ${({ theme: { colors } }) => colors.white};
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 20px;
    padding: 12px 40px;
    transition: all 0.3s ease-in-out;
    &:hover,
    &:focus {
      cursor: pointer;
      background-color: ${({ theme: { colors } }) => colors.white};
      color: ${({ theme: { colors } }) => colors.black};
    }
  }
`;

export default () => {
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    userFollowedArtists(40).then(({ data }) => {
      setArtists(data.artists);
    });
  }, []);

  const next = async () => {
    const moreArtists = await Axios.get(artists.next);
    setArtists(prev => {
      const artists = [...prev.items, ...moreArtists.data.artists.items];
      moreArtists.data.artists.items = artists;
      return moreArtists.data.artists;
    });
  };

  const renderArtists = () => {
    return artists ? (
      <>
        <ArtistsContainer>
          {artists.items.map(artist => {
            return (
              <Artist key={artist.id}>
                <Link to={`/artist/${artist.id}`}>
                  <img src={artist.images[0].url} alt={artist.name} />
                </Link>
                <div>{artist.name}</div>
              </Artist>
            );
          })}
        </ArtistsContainer>
        {artists.next && (
          <SeeMore>
            <button onClick={next}>SEE MORE</button>
          </SeeMore>
        )}
      </>
    ) : (
      <div>It looks like you're not following any artists.</div>
    );
  };

  return artists ? renderArtists() : <Loading />;
};
