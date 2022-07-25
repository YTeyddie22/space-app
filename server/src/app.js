//! Packages
const express = require('express');
const cors = require('cors');
const path = require('path');

//!Modules
const planetRouter = require('./routes/planetRoute');

const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);
app.use(express.json());

//! Get the actual path of the static file
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(planetRouter);

//! Get the root folder as launch
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
