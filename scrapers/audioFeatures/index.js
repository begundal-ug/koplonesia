const path = require('path');
const promiseQueue = require('js-promise-queue');

const toCsv = require('./toCsv');
const Song = require('@koplonesia/song');
const {getSongFeatures} = require('@koplonesia/audioFeatures');

const song = new Song();

function writeToCsv(artistName, data) {
  return new Promise((res, rej) => {
    const normalizeName = artistName
      .toLowerCase()
      .split(' ')
      .join('-');
    const fileName = path.join(
      __dirname,
      `../../common/features/db/${normalizeName}.csv`
    );
    res(toCsv(fileName, data, data[0]));
  });
}

function getArtistFeatures(artistName) {
  return new Promise((resolve, reject) => {
    const song = new Song();
    song.loadArtist(artistName);
    const pickedSongs = song.getAllSongs();
    console.log('START SONGS:', artistName);
    promiseQueue(
      pickedSongs,
      song =>
        new Promise(resolve => {
          getSongFeatures
            .byTrackId(song.spotifyTrackID)
            .then(res => {
              resolve({
                ...res,
                artist: artistName,
                track_name: song.song,
              });
            })
            .catch(console.error);
        })
    )
      .then(results => {
        console.log('FINISH SONGS:', artistName, results.length);
        writeToCsv(artistName, results);
        resolve(true);
      })
      .catch(err => {
        console.error(err);
        resolve(false);
      });
  });
}

promiseQueue(song.listArtists(), artist => getArtistFeatures(artist), {
  interval: 1000,
}).then(results => {
  console.log('FINISH ARTISTS:', results.length);
});
