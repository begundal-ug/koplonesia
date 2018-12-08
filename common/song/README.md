# Koplonesia song sharedlibs

Provide song source-of-truth base

## API

```js
const Song = require('@koplonesia/song');
const song = new Song();
...
console.log(song.listArtists());
console.log(song.loadArtist('vallen')); //always loadArtist first, return true

// return songs
console.log(song.getAllSongs());
console.log(song.findBySong('konco'));
console.log(song.findByAlbum('om sera'));
```
