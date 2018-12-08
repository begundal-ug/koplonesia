const {spotify} = require('@koplonesia/secrets');

function byTrackId(trackId) {
  let spotifyAPI;
  return new Promise((res, rej) => {
    spotify.client
      .then(spotifyInstance => {
        spotifyAPI = spotifyInstance;
        return spotifyAPI.getAudioFeaturesForTrack(trackId);
      })
      .then(res)
      .catch(rej);
  });
}

function byTrackInfo(trackArtist, trackName) {
  let spotifyAPI;
  return new Promise((res, rej) => {
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
}

module.exports = {
  byTrackInfo,
  byTrackId,
};
