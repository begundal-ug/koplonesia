# Koplonesia artist sharedlibs

Provide artist source-of-truth base

## API

```js
const Artist = require('@koplonesia/artist');
const artist = new Artist();
/**
 * optional: pass a default normalizer function.
 *
 * the default normalizer converts all artist names
 * to a lowercase, separated by `-`.
 */
const artist = new Artist(normalizerFn)
...
const allAvailableArtists = artist.getAll();
const allAvailableArtistsNormalized = artist.getAllNormalized();
const artistNames = artist.getNames();
const artistNamesNormalized = artist.getNamesNormalized();
const allSpotifyIds = artist.getSpotifyIds();
```

## Update artist database

To update artist db, run:

```bash
koplonesia $ cd common/artist
artist $ yarn update-artists
```

and run `yarn` on the monorepo root. The artist db should be updated, and will reflect on all of your dependent services.
