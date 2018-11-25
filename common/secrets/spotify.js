const Spotify = require('spotify-web-api-node');
const auth = {
  clientId: 'a5f3224f62bd482c8f5d6217d77b8f60',
  clientSecret: '366b68297f624a43b2a13fbe95d193db',
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
