export const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

const setLocalAccessToken = token => window.localStorage.setItem("spotify-access-token", token);
const getLocalAccessToken = () => window.localStorage.getItem("spotify-access-token");

const setLocalRefreshToken = token => window.localStorage.setItem("spotify-refresh-token", token);
const getLocalRefreshToken = () => window.localStorage.getItem("spotify-refresh-token");

function getToken() {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
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

export const userToken = getToken();
