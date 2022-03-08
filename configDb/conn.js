// Import Package ...
const mongoose = require('mongoose');

// Connection export ...
const DB = process.env.DATABASE;
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("db connected ✅");
    })
    .catch((err) => console.log(err.message, "db can't connected ❌"));