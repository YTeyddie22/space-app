const fs = require('fs');
const path = require('path');

//Third Party LIB
const {parse} = require('csv-parse');

const habitablePlanets = [];
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

function loadPlanetsData() {
	return new Promise((resolve, reject) => {
		fs.createReadStream(
			path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
		)
			.pipe(stream)
			.on('data', (data) => {
				if (isHabitable(data)) {
					habitablePlanets.push(data);
				}
			})
			.on('error', (err) => {
				console.log(err);
				reject(err);
			})
			.on('end', () => {
				console.log(`${habitablePlanets.length} habitable planets found!`);
				resolve();
			});
	});
}

const getAllPlanets = () => {
	return habitablePlanets;
};

module.exports = {
	loadPlanetsData,
	getAllPlanets,
};
