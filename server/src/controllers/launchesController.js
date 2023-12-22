const {
	getAllLaunches,
	createNewLaunch,
	launchWithIdExists,
	abortLaunchId,
} = require("./../models/Launches");

//* Get all the launches
async function httpGetAllLaunches(req, res) {
	return res.status(200).json(await getAllLaunches());
}

//* Create a new launch object;

function httpCreateNewLaunch(req, res) {
	const launch = req.body;

	launch.launchDate = new Date(launch.launchDate);

	if (
		!launch.mission ||
		!launch.rocket ||
		!launch.launchDate ||
		!launch.target
	) {
		return res.status(400).json({
			error: "Missing required launch property",
		});
	}

	if (isNaN(launch.launchDate)) {
		return res.status(400).json({
			error: "Invalid date for launching",
		});
	}

	createNewLaunch(launch);

	return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
	const launchId = Number(req.params.id);

	//If launch doesn't exists
	if (!launchWithIdExists(launchId)) {
		return res.status(404).json({
			error: "Launch not found",
		});
	}

	const abortedId = abortLaunchId(launchId);
	return res.status(200).json(abortedId);
}

module.exports = {
	httpGetAllLaunches,
	httpCreateNewLaunch,
	httpAbortLaunch,
};
