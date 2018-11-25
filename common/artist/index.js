const {artists} = require('./artistdb.json');

const db = artists.reduce((prev, curr) => {
  const [artist, spotifyId] = curr.split(':');
  const result = {
    artist,
    spotifyId,
  };
  return [...prev, result];
}, []);

function normalizer(artistName) {
  return artistName
    .toLowerString()
    .split(' ')
    .join('-');
}

class Artist {
  constructor(normalizerFunction = normalizer) {
    this.normalizer = normalizerFunction;
    this.db = db;
  }

  getAll() {
    return this.db;
  }
  getAllNormalized() {
    return this.db.map(entry => ({
      artist: this.normalizer(entry.artist),
      spotifyId: entry.spotifyId,
    }));
  }

  getNames() {
    return this.db.map(entry => entry.artist);
  }

  getNamesNormalized() {
    return this.db.map(entry => this.normalizer(entry.artist));
  }

  getSpotifyIds() {
    return this.db.map(entry => entry.spotifyId);
  }

  findBySpotifyId(spotifyId) {
    return this.db.find(entry => entry.spotifyId === spotifyId);
  }
}

module.exports = Artist;
