const {
	getAllLaunches,
	scheduleNewLaunch,
	launchWithIdExists,
	abortLaunchId,
} = require("./../models/Launches");

const { getPagination } = require("../utils/queries");

//* Get all the launches
async function httpGetAllLaunches(req, res) {
	const { skip, limit } = getPagination(req.query);
	const launches = await getAllLaunches(skip, limit);
	return res.status(200).json(launches);
}

//* Create a new launch object;

async function httpCreateNewLaunch(req, res) {
	const launch = req.body;

	launch.launchDate = new Date(launch.launchDate);

	if (
		!launch.mission ||
		!launch.rocket ||
		!launch.launchDate ||
		!launch.target ||
		!launch.destination
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

	await scheduleNewLaunch(launch);

	return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
	const launchId = Number(req.params.id);
	const existingLaunch = await launchWithIdExists(launchId);

	//If launch doesn't exists
	if (existingLaunch.length < 1) {
		return res.status(404).json({
			error: "Launch not found",
		});
	}

	const abortedId = await abortLaunchId(launchId);

	if (!abortedId) {
		return res.status(400).json({
			error: "Launch not Removed",
		});
	}
	return res.status(204).json({
		modifiedCount: 1,
	});
}

module.exports = {
	httpGetAllLaunches,
	httpCreateNewLaunch,
	httpAbortLaunch,
};
