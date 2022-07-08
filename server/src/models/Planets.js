const {parse} = require('csv-parse');
const fs = require('fs');

const habitablePlanet = [];
const stream = parse({
	comment: '#',
	columns: true,
});

function isHabitable(planet) {
	return (
		planet['koi_disposition'] === 'CONFIRMED' &&
		planet['koi_insol'] > 0.36 &&
		planet['koi_insol'] < 1.11 &&
		planet['koi_prad'] < 1.6
	);
}

fs.createReadStream('data/kepler_data.csv')
	.pipe(stream)
	.on('data', (data) => {
		if (isHabitable(data)) {
			habitablePlanet.push(data);
		}
	})
	.on('end', () => {
		console.log(
			habitablePlanet.map((planet) => {
				return planet['kepler_name'];
			})
		);
	})
	.on('error', (err) => {
		console.log(err);
	});

module.exports = {
	planets: habitablePlanet,
};
