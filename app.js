"use strict";

const express = require('express');
const app = express();
const port = process.env.PORT || 2000;

app.use('/', require(__dirname + '/public/routes.js'));

app.listen(port, () => console.log("Server listening on port " + port));