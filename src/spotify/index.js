import axios from "axios";
import { getHashParams } from "../utils/utilities";

// based on https://github.com/bchiang7/spotify-profile/blob/master/client/src/spotify/index.js setup

const setExpirationTime = () => window.localStorage.setItem("spotify-token-expiration", Date.now());
const getExpirationTime = () => window.localStorage.getItem("spotify-token-expiration");

const setLocalAccessToken = token => {
  setExpirationTime();
  window.localStorage.setItem("spotify-access-token", token);
};
const getLocalAccessToken = () => window.localStorage.getItem("spotify-access-token");

const setLocalRefreshToken = token => window.localStorage.setItem("spotify-refresh-token", token);
const getLocalRefreshToken = () => window.localStorage.getItem("spotify-refresh-token");

function getToken() {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
    refreshToken();
  }

  if (Date.now() - getExpirationTime() > 3600000) {
    refreshToken();
  }

  const localAccessToken = getLocalAccessToken();
  const localRefreshToken = getLocalRefreshToken();

  if (!localRefreshToken || localRefreshToken === "undefined") {
    setLocalRefreshToken(refresh_token);
  }

  // User has logged in for the first time OR does not have access token saved in local storage
  if (!localAccessToken || localAccessToken === "undefined") {
    setLocalAccessToken(access_token);
    return access_token;
  }

  return localAccessToken;
}

async function refreshToken() {
  try {
    const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);
    const newToken = data.access_token;
    setLocalAccessToken(newToken);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
}

export const userToken = getToken();

export const logout = () => {
  window.localStorage.removeItem("spotify-access-token");
  window.localStorage.removeItem("spotify-refresh-token");
  window.localStorage.removeItem("spotify-token-expiration");
  window.location = "/";
};

axios.interceptors.request.use(
  function (config) {
    const headers = {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    };
    config.headers = headers;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const userInfo = () => axios.get("https://api.spotify.com/v1/me");

export const userFollowedArtists = (limit = 12) => axios.get(`https://api.spotify.com/v1/me/following?type=artist&limit=${limit}`);

export const nextArtists = url => axios.get(url);

export const userTopTracks = () => axios.get("https://api.spotify.com/v1/me/top/tracks?limit=30");

export const recentlyPlayedTracks = () => axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=15");

export const userPlaylists = () => axios.get("https://api.spotify.com/v1/me/playlists?limit=50");

export const artistInfo = artistId => axios.get(`https://api.spotify.com/v1/artists/${artistId}`);

export const artistTopTracks = artistId => axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`);

export const getPlaylist = playlistId => axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`);

export const playlistTracks = playlistId => axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`);
