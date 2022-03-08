// Import Package & Define router...
const exp = require('express');
const Routes = exp.Router();

// Middleware & Controller require ...
const { registrationControll, LoginControll } = require('../controller/userController');

// Register API
Routes.post('/register', registrationControll);
// Login API ...
// Routes.post('/login', LoginControll);

module.exports = Routes;