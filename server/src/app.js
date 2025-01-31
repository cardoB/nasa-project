const express = require('express');
const cors = require('cors');
const planetsRouter = require('./routes/planets/planets.router');
const app = express();

// Middleware functions: chaing of middleware that handles requests as they come in to our app

// parse any incoming json from the body of incoming requests
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(planetsRouter);

module.exports = app;