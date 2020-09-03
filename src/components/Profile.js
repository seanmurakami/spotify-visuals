import React, { useState, useEffect } from "react";
import { userInfo, userFollowedArtists } from "../spotify";
import styled from "styled-components";
import Loading from "../components/Loading";

const Container = styled.div`
  max-width: 1000px;
  margin: auto;
`;

const ProfileContainer = styled.div`
  margin-top: 50px;
  padding: 0 20px;
  width: 100%;
  text-align: center;
  h1 {
    font-size: 40px;
    letter-spacing: 1px;
  }
  img {
    border-radius: 50%;
    max-width: 280px;
    width: 100%;
  }
`;

const ArtistContainer = styled.div`
  border-radius: 10px;
  background-color: #2a2a2a;
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 8px;
  width: 280px;
  letter-spacing: 0.8px;
  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 20px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const FollowerCount = styled.div`
  color: grey;
  font-size: 12px;
  margin-top: 3px;
`;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default () => {
  const [user, updateUser] = useState("");
  const [artists, updateArtists] = useState([]);

  useEffect(() => {
    userInfo().then(res => {
      updateUser(res.data);
    });
  }, []);

  useEffect(() => {
    userFollowedArtists().then(res => {
      updateArtists(res.data.artists.items);
    });
  }, []);

  const renderArtists = () => {
    return (
      <div>
        <h2>Following</h2>
        {artists.map((artist, i) => {
          return (
            <ArtistContainer key={i}>
              <img src={artist.images[2].url} alt="artist" />
              <div key={i}>
                <div>{artist.name}</div>
                <FollowerCount>{numberWithCommas(artist.followers.total)} FOLLOWERS</FollowerCount>
              </div>
            </ArtistContainer>
          );
        })}
      </div>
    );
  };

  const renderProfile = () => {
    return (
      <ProfileContainer>
        <img src={user.images[0].url} alt="user profile"></img>
        <div>
          <h1>{user.display_name}</h1>
        </div>
      </ProfileContainer>
    );
  };

  return (
    <Container>
      {user ? (
        <>
          {renderProfile()}
          {renderArtists()}
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};
