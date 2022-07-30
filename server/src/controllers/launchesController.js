const {getAllLaunches} = require('./../models/Launches');

function httpGetAllLaunches(req, res) {
	return res.status(200).json(getAllLaunches());
}
module.exports = {
	httpGetAllLaunches,
};
