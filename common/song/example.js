const Song = require('@koplonesia/song');

const song = new Song();
console.log(song.listArtists());
console.log(song.loadArtist('vallen'));
console.log(song.getAllSongs());
console.log(song.findBySong('konco'));
console.log(song.findByAlbum('om sera'));
