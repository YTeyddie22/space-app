const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 8000;
const { loadPlanetsData } = require("./models/Planets");

const MONGO_URL =
	"mongodb+srv://teyddie:JNYptyJptN1!@cluster0.njqjn.mongodb.net/nasa?retryWrites=true&w=majority";

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
	.connect(MONGO_URL, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log("Connected to DB"))
	.catch((err) => console.log(`Error: ${err}`));

async function startServer() {
	await loadPlanetsData();

	server.listen(PORT, () => {
		console.log(`Listening to port ${PORT}`);
	});
}

startServer();
