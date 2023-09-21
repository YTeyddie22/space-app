//* Allows us to map any key ot any object
const launches = new Map();

let latestFlightNumber = 100;
const launch = {
	flightNumber: 100,
	mission: 'Kepler Exploration x',
	rocket: 'Explorer Is1',
	launchDate: new Date('March 22, 2030'),
	destination: 'Kepler-442 b',
	customer: ['JNY', 'PTY'],
	upcoming: true,
	success: true,
};

launches.set(launch.flightNumber, launch);

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
			customers: ['Lyveen', 'Adolf'],
			flightNumber: latestFlightNumber,
		})
	);
}

module.exports = {
	getAllLaunches,
	createNewLaunch,
};
