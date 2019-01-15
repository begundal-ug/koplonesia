const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, './db/');

const artists = fs.readdirSync(dbPath).map(file => file.split('.json')[0]);

class Song {
  constructor() {
    this.artists = artists;
    this.artist = null;
    this.songs = [];
  }

  getAllSongs() {
    if (!this.artist) throw new Error('loadArtist first!');
    return this.songs;
  }

  findBySong(keyword) {
    if (!this.artist) throw new Error('loadArtist first!');
    return this.songs.filter(
      entry => entry.song.toLowerCase().indexOf(keyword) >= 0
    );
  }

  findByAlbum(keyword) {
    if (!this.artist) throw new Error('loadArtist first!');
    return this.songs.filter(
      entry => entry.album.toLowerCase().indexOf(keyword) >= 0
    );
  }

  loadArtist(name) {
    if (!name) throw new Error('Passing params name!');
    const found = this.findArtists(name);
    if (typeof found !== 'undefined') {
      this.artist = found;
      const fileURL = path.join(__dirname, `./db/${found}.json`);
      this.songs = JSON.parse(fs.readFileSync(fileURL, 'utf8')).tracks.map(
        entry => {
          const [album, song, spotifyTrackID] = entry.split(':');
          return {
            album,
            song,
            spotifyTrackID,
          };
        }
      );
      return true;
    }
    return false;
  }

  listArtists() {
    return this.artists;
  }

  findArtists(keyword) {
    return this.artists.find(entry => entry.indexOf(keyword) >= 0);
  }
}

module.exports = Song;
