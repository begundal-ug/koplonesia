const getSongFeatures = require('./getSongFeatures');

function summary(features) {
  // valence
  // danceability
  // energy
  // max
  // min
  // all
  // mean
  // median
  return true;
}

function compare(featuresA, featuresB) {
  // valence
  // danceability
  // energy
  // most
  // correlation

  return true;
}

function byTrackIds(ids) {
  return true;
}

module.exports = {
  byTrackIds,
  bySongFeatures: summary,
};
