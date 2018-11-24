const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
  clientId: 'a5f3224f62bd482c8f5d6217d77b8f60',
  clientSecret: '366b68297f624a43b2a13fbe95d193db'
});

module.exports = (trackArtist, trackName) => {
  return new Promise((res, rej) => {
    spotifyApi
      .clientCredentialsGrant()
      .then(function(data) {
        // Set the access token on the API object so that it's used in all future requests
        spotifyApi.setAccessToken(data.body['access_token']);

        // Get the most popular tracks by David Bowie in Great Britain
        return spotifyApi.searchTracks(`track:${trackName} artist:${trackArtist}`)
      })
      .then(function(data) {
        if (typeof data.body.tracks.items[0] !== 'undefined') {
          console.log('[GET]', data.body.tracks.items[0].name, data.body.tracks.items[0].id);
          return spotifyApi.getAudioFeaturesForTrack(data.body.tracks.items[0].id)
        } else {
          throw new Error(`Not found track:${trackName} artist:${trackArtist}`);
        }
      })
      .then(function(data) {
        res({
          ...data.body,
          trackName,
          trackArtist
        });
      })
      .catch(rej);
  })  
}