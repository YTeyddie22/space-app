const {
	getAllLaunches,
	createNewLaunch,
	existsLaunchId,
	abortLaunchId,
} = require("./../models/Launches");

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

//Deleting a launch object

function httpAbortLaunch(req, res) {
	const id = Number(req.params.id);

	//Not existing
	if (!existsLaunchId(id)) {
		return res.status(404).json({
			error: "Launch not Found",
		});
	}
	const aborted = abortLaunchId(id);

	return res.status(200).json(aborted);
}

module.exports = {
	httpGetAllLaunches,
	httpCreateNewLaunch,
	httpAbortLaunch,
};
