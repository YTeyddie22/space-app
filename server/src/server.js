const dotEnv = require("dotenv");

dotEnv.config().parsed;
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 8000;
const { loadPlanetsData } = require("./models/Planets");

const MONGO_URL = process.env.MONGOURL;

const server = http.createServer(app);
/*
* Connecting to MongoDB
//Success
mongoose.connection.once("open", () => {
	console.log("MongoDB connection successful");
});

// Failed
mongoose.connection.on("error", (err) => {
	console.error(err);
});
*/

mongoose
	.connect(MONGO_URL)
	.then(() => console.log("Connected to DB"))
	.catch((err) => console.log(`Error: ${err}`));

async function startServer() {
	await loadPlanetsData();

	server.listen(PORT, () => {
		console.log(`Listening to port ${PORT}`);
	});
}

startServer();
