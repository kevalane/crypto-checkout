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
			// response['id']
			// response['hosted_url']
			res.status(200).send(response);
		}
	});
});

app.get('/status', (req, res) => {
	let id = '4c3acb58-60f9-40f2-9ee1-83b2ad3f2f35';
	Charge.retrieve(id, (err, charge) => {
		if(charge['timeline'][0]['status'] == 'NEW') {
			// created, nothing happening
		} else if (charge['timeline'][1]['status'] == 'PEDNING') {
			// pending, payment has been seen
		} else if (charge['timeline'][1]['status'] == 'EXPIRED') {
			// the hour has passed, expired charge
		} else if (charge['timeline'][2]['status'] == 'COMPLETED') {
			// payment completed
		}
		res.send(charge);
	});
});

