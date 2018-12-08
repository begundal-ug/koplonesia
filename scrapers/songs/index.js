const path = require('path');
const fs = require('fs');
const promiseQueue = require('js-promise-queue');

const {fetchArtistTracks} = require('./fetchArtistTracks');
const Artist = require('@koplonesia/artist');

function writeToFile(artistName, tracks) {
  return new Promise((res, rej) => {
    const normalizeName = artistName
      .toLowerCase()
      .split(' ')
      .join('-');
    const fileName = path.join(
      __dirname,
      `../../common/song/db/${normalizeName}.json`
    );
    fs.writeFile(
      fileName,
      JSON.stringify(
        {
          tracks,
        },
        null,
        2
      ),
      err => {
        if (!err) {
          res(`Tracks Stored on ${fileName}`);
        } else {
          rej('Fail to write');
        }
      }
    );
  });
}

const artist = new Artist();
const artists = artist.getAll();

promiseQueue(artists, artist =>
  fetchArtistTracks(artist.spotifyId, artist.artist)
).then(results =>
  promiseQueue(results, result => writeToFile(result.artistName, result.tracks))
);
