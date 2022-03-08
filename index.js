// Import Package ...
const exp = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const app = exp();
app.use(exp.json());
const dotenv = require('dotenv')
dotenv.config({ path: './.env' });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression())

// Require Database ...
require('./configDb/conn');

// Require routers ...
const indexRoutes = require('./router/index.route');
app.use('/api', indexRoutes);

// Port open ...
app.listen(process.env.PORT, () => {
    console.log(`node server live at ${process.env.PORT} ...`);
})