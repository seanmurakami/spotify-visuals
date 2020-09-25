# Spotify Visuals

Web application utilizing:

- [Create React App](https://github.com/facebook/create-react-app)
- [React Router](https://reactrouter.com/web/guides/quick-start)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Express](https://expressjs.com/)
- [Styled Components](https://www.styled-components.com/)

## Usage

Make sure to register a Spotify application to get a client id and client secret.  Add ```http://localhost:8888/callback``` as the redirect URI in the Spotify developer app settings.

Clone and install dependencies.
```
git clone https://github.com/seanmurakami/spotify-visuals.git
cd spotify-visuals
yarn
```
Create a '.env' file in the project root.
```
CLIENT_ID=myclientid12345
CLIENT_SECRET=myclientsecret12345
REDIRECT_URI=http://localhost:8888/callback
FRONTEND_URI=http://localhost:3000
```
Run the app server
```
yarn start
```
Start the dev environment
```
yarn dev
```
