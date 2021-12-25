// Imports
const express = require('express');
const coinbase = require('coinbase-commerce-node');
const dotenv = require('dotenv').config();

// App setup
const app = express();
let server = app.listen(process.env.PORT, () => {
	console.log('Listening on port ' + process.env.PORT);
});

// Coinbase setup
const Client = coinbase.Client;
Client.init(process.env.API_KEY);
const Charge = coinbase.resources.Charge;
const Event = coinbase.resources.Event;
