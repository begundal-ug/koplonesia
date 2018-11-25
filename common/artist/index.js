const {artists} = require('./artistdb.json');

const db = artists.reduce((prev, curr) => {
  const [artist, spotifyId] = curr.split(':');
  const result = {
    artist,
    spotifyId,
  };
  return [...prev, result];
}, []);

module.exports = {
  getAll() {
    return db;
  },
  getAllNormalized() {
    return db.map(entry => ({
      artist: entry.artist
        .toLowerString()
        .split(' ')
        .join('-'),
      spotifyId: entry.spotifyId,
    }));
  },
  getAllArtists() {
    return db.map(entry => entry.artist);
  },
  getAllSpotifyId() {
    return db.map(entry => entry.spotifyId);
  },
  findBySpotifyId(spotifyId) {
    return db.find(entry => entry.spotifyId === spotifyId);
  },
};
