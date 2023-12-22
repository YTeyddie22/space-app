const fs = require("fs");
const path = require("path");

//Third Party LIB
const { parse } = require("csv-parse");

const planets = require("./Planets.mongo");

const stream = parse({
	comment: "#",
	columns: true,
});

function isHabitable(planet) {
	return (
		planet["koi_disposition"] === "CONFIRMED" &&
		planet["koi_insol"] > 0.36 &&
		planet["koi_insol"] < 1.11 &&
		planet["koi_prad"] < 1.6
	);
}

async function getAllPlanets() {
	return await planets.find(
		{},
		{
			_id: 0,
			__v: 0,
		}
	);
}

async function savePlanet(planet) {
	//habitablePlanets.push(data);
	//Replace Create with Insert and Update (UpSert);

	try {
		await planets.updateOne(
			{
				keplerName: planet.kepler_name,
			},
			{
				keplerName: planet.kepler_name,
			},
			{
				upsert: true,
			}
		);
	} catch (error) {
		console.error(`Could not save the planet ${error}`);
	}
}

function loadPlanetsData() {
	return new Promise((resolve, reject) => {
		fs.createReadStream(
			path.join(__dirname, "..", "..", "data", "kepler_data.csv")
		)
			.pipe(stream)
			.on("data", async (data) => {
				if (isHabitable(data)) {
					savePlanet(data);
				}
			})
			.on("error", (err) => {
				console.log(err);
				reject(err);
			})
			.on("end", async () => {
				const planetsFound = (await getAllPlanets()).length;
				console.log(`${planetsFound} habitable planets found!`);
				resolve();
			});
	});
}

module.exports = {
	loadPlanetsData,
	getAllPlanets,
};
