//Dependecies
const axios = require("axios");

//* Allows us to map any key ot any object
const launches = require("./Launches.mongo");
const planets = require("./Planets.mongo");

const DEFAULTFLIGHTNUMBER = 100;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateLaunches() {
	console.log("Downloading launch data...");
	const response = await axios.post(SPACEX_API_URL, {
		query: {},
		options: {
			pagination: false,
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

	if (response.status !== 200) {
		console.log("The Launching of data Failed");
		throw new Error("Launching data failed");
	}
	const launchDocs = response.data.docs;

	for (const launchDoc of launchDocs) {
		const payloads = launchDoc["payloads"];
		const customers = payloads.flatMap((payload) => {
			return payload["customers"];
		});

		const launch = {
			flightNumber: launchDoc["flight_number"],
			mission: launchDoc["name"],
			rocket: launchDoc["rocket"]["name"],
			launchDate: launchDoc["date_local"],
			upcoming: launchDoc["upcoming"],
			success: launchDoc["success"],
			customers,
		};

		console.log(`${launch.flightNumber} ${launch.mission}`);

		//Populate the collection in Database

		await saveLaunch(launch);
	}
}

async function loadLaunchesData() {
	const firstLaunch = await findLaunch({
		flightNumber: 1,
		rocket: "Falcon 1",
		mission: "FalconSat",
	});

	if (firstLaunch) {
		console.log("Launch Data already loaded");
	} else {
		await populateLaunches();
	}
}

async function getAllLaunches(skip, limit) {
	return await launches
		.find({}, { _id: 0, __v: 0 })
		.sort({ flightNumber: 1 })
		.skip(skip)
		.limit(limit);
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
	const planet = await planets.findOne({
		keplerName: launch.target,
	});

	if (!planet) {
		throw new Error("No matching planet found");
	}
	const newFlightNumber = (await getLatestFlightNumber()) + 1;

	const newLaunch = Object.assign(launch, {
		success: true,
		upcoming: true,
		customers: ["PTY", "JNY", "LB", "VA"],
		flightNumber: newFlightNumber,
	});

	saveLaunch(newLaunch);
}

//Check a launch if it exists.

async function launchWithIdExists(launchId) {
	return await findLaunch({
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

//Save launch to the database

async function saveLaunch(launch) {
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

//Find launch that exists (Generic)

async function findLaunch(filter) {
	return await launches.findOne(filter);
}

module.exports = {
	loadLaunchesData,
	getAllLaunches,
	scheduleNewLaunch,
	launchWithIdExists,
	abortLaunchId,
};

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
