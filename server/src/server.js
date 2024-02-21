const http = require("http");
const app = require("./app");
const { mongoConnect } = require("./utils/mongo");
const { loadPlanetsData } = require("./models/Planets");
const { loadLaunchesData } = require("./models/Launches");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
	await mongoConnect();
	await loadPlanetsData();
	await loadLaunchesData();
	server.listen(PORT, () => {
		console.log(`Listening to port ${PORT}`);
	});
}

startServer();
