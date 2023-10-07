//? API URL
const API_URL = `http://localhost:8000`;

//! Load planets and return as JSON.
async function httpGetPlanets() {
	const response = await fetch(`${API_URL}/planets`);
	const result = await response.json();
	return result;
}

//! Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
	const response = await fetch(`${API_URL}/launches`);

	//* Get the launches and sort in ascending order;
	const fetchedLaunches = await response.json();
	console.log(fetchedLaunches);
	return fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
	// TODO: Once API is ready.
	// Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
	// TODO: Once API is ready.
	// Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
