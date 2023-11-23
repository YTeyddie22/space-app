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
	return fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
	// TODO: Once API is ready.
	try {
		return await fetch(`${API_URL}/launches`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(launch),
		});
	} catch (err) {
		return {
			ok: false,
		};
	}

	// Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
	try {
		return await fetch(`${API_URL}/launches/${id}`, {
			method: "delete",
		});
	} catch (err) {
		console.log(err);
		return {
			ok: false,
		};
	}
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
