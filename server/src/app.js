//! Packages
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

//!Modules
const planetsRouter = require('./routes/planetRoute');
const launchesRouter = require('./routes/launchesRoute');

const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);
//! Introducing logging
app.use(morgan('combined'));
app.use(express.json());

//! Get the actual path of the static file
app.use(express.static(path.join(__dirname, '..', 'public')));

//?* Getting the routes directly.
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

//! Get the root folder as launch
//* Check the History API (PushState)
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
