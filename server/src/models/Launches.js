//* Allows us to map any key ot any object
const launches = require("./Launches.mongo");
const planets = require("./Planets.mongo");

const DEFAULTFLIGHTNUMBER = 100;
//const launches = new Map();
//launches.set(launch.flightNumber, launch);

async function getAllLaunches() {
	return await launches.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
	const planet = await planets.findOne({
		keplerName: launch.target,
	});

	if (!planet) {
		throw new Error("No matching planet found");
	}
	await launches.findOneAndUpdate(
		{
			flightNumber: launch.flightNumber,
		},
		launch,
		{
			upsert: true,
		}
	);
}

// Defaults to 0 if no launches are present.
async function getLatestFlightNumber() {
	const latestFlight = await launches.findOne().sort("-flightNumber");

	if (!latestFlight) {
		return DEFAULTFLIGHTNUMBER;
	}

	return latestFlight.flightNumber;
}

async function scheduleNewLaunch(launch) {
	const newFlightNumber = (await getLatestFlightNumber()) + 1;

	const newLaunch = Object.assign(launch, {
		success: true,
		upcoming: true,
		customers: ["PTY", "JNY", "LB", "VA"],
		flightNumber: newFlightNumber,
	});

	saveLaunch(newLaunch);
}

function launchWithIdExists(launchId) {
	return launches.has(launchId);
}

/*

//Adds Data before initially before using MongoDb
const launch = {
	flightNumber: 100,
	mission: "Kepler Exploration x",
	rocket: "Explorer Is1",
	launchDate: new Date("March 22, 2030"),
	target: "Kepler-442 b",
	customers: ["JNY", "PTY"],
	upcoming: true,
	success: true,
};

saveLaunch(launch);


* Pre use before adding MongoDB

function createNewLaunch(launch) {
	latestFlightNumber++;

	launches.set(
		latestFlightNumber,
		Object.assign(launch, {
			success: true,
			upcoming: true,
			customers: ["Lyveen", "Adolf"],
			flightNumber: latestFlightNumber,
		})
	);
}

*/

function abortLaunchId(launchId) {
	const abortedId = launches.get(launchId);
	abortedId.upcoming = false;
	abortedId.success = false;
	return abortedId;
}

module.exports = {
	getAllLaunches,
	scheduleNewLaunch,
	launchWithIdExists,
	abortLaunchId,
};
