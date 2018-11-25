const {spotify} = require('@koplonesia/secrets');
let spotifyAPI;

module.exports = (trackArtist, trackName) =>
  new Promise((res, rej) => {
    spotify.client
      .then(spotifyInstance => {
        spotifyAPI = spotifyInstance;
        return spotifyAPI.searchTracks(
          `track:${trackName} artist:${trackArtist}`
        );
      })
      .then(data => {
        if (typeof data.body.tracks.items[0] !== 'undefined') {
          console.log(
            '[GET]',
            data.body.tracks.items[0].name,
            data.body.tracks.items[0].id
          );
          return spotifyAPI.getAudioFeaturesForTrack(
            data.body.tracks.items[0].id
          );
        }
        throw new Error(`Not found track:${trackName} artist:${trackArtist}`);
      })
      .then(data => {
        res({
          ...data.body,
          trackName,
          trackArtist,
        });
      })
      .catch(rej);
  });
