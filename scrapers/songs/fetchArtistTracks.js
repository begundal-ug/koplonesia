const {spotify} = require('@koplonesia/secrets');
const promiseQueue = require('js-promise-queue');

function getAlbums(artistId) {
  return new Promise((resolve, reject) => {
    spotify.client.then(spotifyInstance => {
      spotifyInstance
        .getArtistAlbums(artistId)
        .then(data => {
          if (typeof data.body.items[0] !== 'undefined') {
            resolve(
              data.body.items.map(item => ({
                name: item.name,
                id: item.id,
                date: item.release_date,
              }))
            );
          } else {
            throw new Error(`Not found artistId:${artistId}`);
          }
        })
        .catch(reject);
    });
  });
}

function getAlbumTracks(albumId, albumName) {
  return new Promise((resolve, reject) => {
    spotify.client
      .then(spotifyInstance => {
        spotifyInstance.getAlbumTracks(albumId).then(data => {
          if (typeof data.body.items[0] !== 'undefined') {
            resolve(
              data.body.items.map(item => ({
                id: item.id,
                name: item.name,
                albumName,
              }))
            );
          } else {
            throw new Error(`Not found albumId:${albumId}`);
          }
        });
      })
      .catch(reject);
  });
}

function fetchArtistTracks(artistId, artistName) {
  return new Promise((resolve, reject) => {
    getAlbums(artistId)
      .then(albums => {
        promiseQueue(albums, album => getAlbumTracks(album.id, album.name))
          // Promise.all(albums.map(album => getAlbumTracks(album.id, album.name)))
          .then(results =>
            results
              .map(result =>
                result.map(item => `${item.albumName}:${item.name}:${item.id}`)
              )
              .reduce((prev, curr) => [...prev, ...curr])
          )
          .then(tracks => {
            console.log('artistName', artistName, artistId);
            resolve({
              tracks,
              artistName,
            });
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  fetchArtistTracks,
};
