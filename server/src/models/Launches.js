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

function launchWithIdExists(launchId) {
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
	const abortedId = launches.get(launchId);
	abortedId.upcoming = false;
	abortedId.success = false;
	return abortedId;
}

module.exports = {
	getAllLaunches,
	createNewLaunch,
	launchWithIdExists,
	abortLaunchId,
};
