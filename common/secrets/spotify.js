const path = require('path');
require('dotenv').config({path: path.join(__dirname, './.env')});

const Spotify = require('spotify-web-api-node');
// using my very own account app (ans4175)
const auth = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
};

const spotifyApi = new Spotify(auth);
const client = spotifyApi.clientCredentialsGrant().then(data => {
  spotifyApi.setAccessToken(data.body.access_token);
  return spotifyApi;
});

module.exports = {
  client,
  auth,
};
