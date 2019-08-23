const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const path = require("path")

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "ss-tms", "build")))

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})





app.use('/competitor', require('./Routes/compeititor_routes.js'));
app.use('/fixture', require('./Routes/fixtures_routes.js'));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});