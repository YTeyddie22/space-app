const dotEnv = require("dotenv");

dotEnv.config().parsed;
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGOURL;

async function mongoConnect() {
	await mongoose
		.connect(MONGO_URL)
		.then(() => console.log("Connected to DB"))
		.catch((err) => console.log(`Error: ${err}`));
}

async function mongoDisconnect() {
	await mongoose.disconnect();
}

module.exports = {
	mongoConnect,
	mongoDisconnect,
};

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
