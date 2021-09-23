// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log(`this server is running on localhost: ${port}`);
}

// get route
app.get('/getProjectData', getProjectData);

function getProjectData(req, res) {
    res.send(projectData);
}

// post route
app.post('/addProjectData', addProjectData);

function addProjectData(req, res) {
    console.log(req.body);
    let newEntry = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }

    Object.assign(projectData, newEntry);

    res.send(projectData);
}