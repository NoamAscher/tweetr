"use strict";

const PORT        = 8080;
const express     = require("express");
const bodyParser  = require("body-parser");
const app         = express();

const tweetsApi  = require('./api/tweets');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/tweets', tweetsApi());

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
