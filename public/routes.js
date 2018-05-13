"use strict";

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html');
});

router.get('/about', (req, res, next) => {
    res.sendFile(__dirname + '/about.html');
});

router.get('/contact', (req, res, next) => {
    res.sendFile(__dirname + '/contact.html');
});

router.get('/signup', (req, res, next) => {
    res.sendFile(__dirname + '/signup.html');
});

module.exports = router;