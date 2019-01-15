const {byTrackInfo} = require('./getSongFeatures');

const nellaSongs = [
  'Aku Cah Kerjo',
  'Ambilkan Gelas',
  'Banyu Langit',
  'Bidadari Kesleo',
  'Bojo Galak',
  'Ditinggal Rabi',
  'Gara Gara Asmara',
  'Jaran Goyang',
  'Juragan Empang',
  'Kau Tercipta Bukan Untukku',
  'Kelingan Mantan',
  'Kesengsem Pak Polisi',
  'Konco Mesra',
  'Loro Kangen',
  'Lungset',
  'Move On',
  'Ninja Opo Vespa',
  'Ojo Nguber Welase',
  'Pikir Keri',
  'Prei Sayang',
  'Ra Jodo',
  'Sampai Hati',
  'Tak Bisa Membenci',
];

const viaSongs = [
  'Bagai Langit Dan Bumi',
  'Berkali Kali',
  'Bojo Galak',
  'Kau Selalu Dihatiku',
  'Kekasih Bayangan',
  'Kepelet Sayang',
  'Kimcil Kepolen',
  'Lali Rasane Tresno',
  'Lanangan Ra Mutu',
  'Masih Cinta',
  'Meraih Bintang',
  'Ngelabur Langit',
  'Ngukir Sandiworo',
  'Nikah Siri',
  'Ora Masalah',
  'Pikir Keri',
  'Pintu Surga',
  'Ra Jodo',
  'Sayang',
  'Sayangen Aku',
  'Selingkuh',
  'Tresnane Wong Kere',
];

nellaSongs.forEach(song => {
  byTrackInfo('Nella Kharisma', song)
    .then(console.log)
    .catch(console.error);
});

viaSongs.forEach(song => {
  byTrackInfo('Via Vallen', song)
    .then(console.log)
    .catch(console.error);
});
