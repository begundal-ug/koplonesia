const fs = require('fs');
const path = require('path');
const {spotify} = require('@koplonesia/secrets');
const artists = require('./artists');

const DB_FILENAME = path.join(__dirname, 'artistdb.json');

spotify.client.then(spotifyInstance => {
  Promise.all(artists.map(artist => spotifyInstance.searchArtists(artist)))
    .then(results =>
      results
        .map(result =>
          result.body.artists.items.map(item => `${item.name}:${item.id}`)
        )
        .reduce((prev, curr) => [...prev, ...curr])
    )
    .then(
      artists =>
        new Promise((res, rej) => {
          fs.writeFile(
            path.join(DB_FILENAME),
            JSON.stringify(
              {
                artists,
              },
              null,
              2
            ),
            err => {
              if (!err) {
                res(`db available on ${DB_FILENAME}`);
              } else {
                rej('Gagal ambil');
              }
            }
          );
        })
    )
    .then(result => {
      console.log(result);
    });
});
