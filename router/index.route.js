// Import Package & Define router...
const exp = require('express');
const Routes = exp.Router();

// Middleware & Controller require ...
const { registrationControll, LoginControll,userList } = require('../controller/userController');

// Register API
Routes.post('/register', registrationControll);
// Login API ...
// Routes.post('/login', LoginControll);
Routes.get('/list',userList)

module.exports = Routes;