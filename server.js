// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes and other dependences.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();
/* Dependencies */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/* Middleware*/

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 9000;

// Spin up the server
const server = app.listen(port, listening);

function listening() {
	console.log(`Server is Up and running at port ${port}`);
}

// get route
app.get('/getAllData', function(req, res) {
	res.send(projectData);
});

//post route
app.post('/data', function(req, res) {
	projectData = {
		temperature: req.body.temp,
		date: req.body.date,
		userResponse: req.body.user
	};
	res.send(projectData);
});
