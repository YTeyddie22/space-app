//! Packages
const express = require("express");
//const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

//API
const api = require("./versions/v1");

const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	next();
});

//! Introducing logging
app.use(morgan("combined"));
app.use(express.json());

//! Get the actual path of the static file
app.use(express.static(path.join(__dirname, "..", "public")));

//API version
app.use("/v1", api);

//! Get the root folder as launch
//* Check the History API (PushState)
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
