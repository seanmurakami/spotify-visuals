import React, { useState, useEffect } from "react";
import { userFollowedArtists } from "../spotify";

export default () => {
  const [artists, updateArtists] = useState([]);

  useEffect(() => {
    getFollows();
  }, []);

  async function getFollows() {
    const { data } = await userFollowedArtists();
    updateArtists(data.artists.items);
  }

  const renderArtists = () => {
    return artists.map((artist, i) => {
      return <div key={i}>{artist.name}</div>;
    });
  };

  return <>{renderArtists()}</>;
};
