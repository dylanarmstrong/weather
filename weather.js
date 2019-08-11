#!/usr/bin/env node
'use strict';

const fs = require('fs');
const https = require('https');

// Single line api key from openweatherapi
const key = fs.readFileSync('./.apikey').toString();

const usage = () => {
  console.error('Usage: weather zipcode');
  process.exit(0);
};

const { argv } = process;
if (argv.length < 3) {
  usage();
}

const zipcode = parseInt(argv[2]);
// Catch --help
if (Number.isNaN(zipcode)) {
  usage();
}

https.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${key}&units=imperial`, res => {
  res.on('data', d => {
    const data = JSON.parse(d.toString());
    const desc = data.weather[0].main;
    const temp = data.main.temp;
    console.log(`${temp} F - ${desc}`);
  });
});
