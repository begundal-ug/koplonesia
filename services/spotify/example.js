const spotifyFeatures = require('./getFeatures');

const songs = [
	'Aku Cah Kerjo',
	'Ambilkan Gelas',
	'Banyu Langit',
	'Bidadari Kesleo',
	'Bojo Galak',
	'Ditinggal Rabi',
	'Gara Gara Asmara (NS)',
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

songs.forEach(song => {
	spotifyFeatures('Nella Kharisma', song).then(console.log).catch(console.error)
});