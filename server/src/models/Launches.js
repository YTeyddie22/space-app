//* Allows us to map any key ot any object
const launches = new Map();

let latestFlightNumber = 100;
const launch = {
	flightNumber: 100,
	mission: "Kepler Exploration x",
	rocket: "Explorer Is1",
	launchDate: new Date("March 22, 2030"),
	target: "Kepler-442 b",
	customer: ["JNY", "PTY"],
	upcoming: true,
	success: true,
};

launches.set(launch.flightNumber, launch);

function existsLaunchId(launchId) {
	return launches.has(launchId);
}

function getAllLaunches() {
	return Array.from(launches.values());
}

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

function abortLaunchId(launchId) {
	const aborted = launches.get(launchId);
	aborted.upcoming = false;
	aborted.success = false;
	return aborted;
}

module.exports = {
	existsLaunchId,
	getAllLaunches,
	createNewLaunch,
	abortLaunchId,
};
