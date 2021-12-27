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

app.get('/charge', (req, res) => {
	let chargeData = {
		name: 'Kevin Rasmusson',
		description: 'Test description',
		local_price: {
			amount: 100,
			currency: 'USD'
		},
		pricing_type: 'fixed_price'
	}

	Charge.create(chargeData, (err, response) => {
		if (err) {
			res.status(400).send({message: err.message});
		} else {
			res.status(200).send(response);
		}
	});
});

