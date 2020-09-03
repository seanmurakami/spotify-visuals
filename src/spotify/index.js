import axios from "axios";
import { getHashParams } from "../utils/utilities";

const setLocalAccessToken = token => window.localStorage.setItem("spotify-access-token", token);
const getLocalAccessToken = () => window.localStorage.getItem("spotify-access-token");

const setLocalRefreshToken = token => window.localStorage.setItem("spotify-refresh-token", token);
const getLocalRefreshToken = () => window.localStorage.getItem("spotify-refresh-token");

function getToken() {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
    refreshToken(refresh_token);
    return;
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

function refreshToken(refresh_token) {
  try {
    const { data } = axios.get(`/refresh_token?refresh_token=${refresh_token}`);
    const newToken = data.access_token;
    setLocalAccessToken(newToken);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
}

export const userToken = getToken();

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

export const userFollowedArtists = () => axios.get("https://api.spotify.com/v1/me/following?type=artist&limit=10");

export const userTopTracks = () => axios.get("https://api.spotify.com/v1/me/top/tracks");
