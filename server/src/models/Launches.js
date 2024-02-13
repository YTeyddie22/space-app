//Dependecies
const axios = require("axios");

//* Allows us to map any key ot any object
const launches = require("./Launches.mongo");
const planets = require("./Planets.mongo");

const DEFAULTFLIGHTNUMBER = 100;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function loadLaunchesData() {
	console.log("Downloading launch data...");
	const response = await axios.post(SPACEX_API_URL, {
		query: {},
		options: {
			populate: [
				{
					path: "rocket",
					select: {
						name: 1,
					},
				},
				{
					path: "payloads",
					select: {
						customers: 1,
					},
				},
			],
		},
	});
}

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

// Defaults to 100 if no launches are present.
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

async function launchWithIdExists(launchId) {
	return await launches.find({
		flightNumber: launchId,
	});
}

async function abortLaunchId(launchId) {
	/*
	const abortedId = launches.get(launchId);
	abortedId.upcoming = false;
	abortedId.success = false;

	*/
	const aborted = await launches.updateOne(
		{
			flightNumber: launchId,
		},
		{
			success: false,
			upcoming: false,
		}
	);
	return aborted.modifiedCount === 1;
}

/*

//Adds Data before initially before using MongoDb
 
const launches = new Map();
launches.set(launch.flightNumber, launch);


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

module.exports = {
	loadLaunchesData,
	getAllLaunches,
	scheduleNewLaunch,
	launchWithIdExists,
	abortLaunchId,
};
