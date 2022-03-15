const express = require("express");
const app = express();

app.use("/personas.modelo", require("./personas.modelo"));

module.exports = app;

