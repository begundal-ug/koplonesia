const {spotify} = require('@koplonesia/secrets');

function byTrackId(trackId) {
  return new Promise((resolve, reject) => {
    spotify.client
      .then(spotifyInstance => {
        console.log('[GET]', trackId);
        return spotifyInstance.getAudioFeaturesForTrack(trackId);
      })
      .then(result => {
        resolve(result.body);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
}

function byTrackInfo(trackArtist, trackName) {
  let spotifyAPI;
  return new Promise((resolve, reject) => {
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
        resolve({
          ...data.body,
          trackName,
          trackArtist,
        });
      })
      .catch(reject);
  });
}

module.exports = {
  byTrackInfo,
  byTrackId,
};
