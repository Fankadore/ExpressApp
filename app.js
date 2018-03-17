"use strict";

const express = require('express');
const app = express();
const port = process.env.PORT || 2000;

app.get('/', (req, res) => res.sendFile(__dirname + '/client/index.html'));

app.listen(port, () => console.log("Server listening on port " + port));