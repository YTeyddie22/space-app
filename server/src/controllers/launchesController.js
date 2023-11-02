const { getAllLaunches, createNewLaunch } = require("./../models/Launches");

//* Get all the launches
function httpGetAllLaunches(req, res) {
	return res.status(200).json(getAllLaunches());
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

module.exports = {
	httpGetAllLaunches,
	httpCreateNewLaunch,
};
