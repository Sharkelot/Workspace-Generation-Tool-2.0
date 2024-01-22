const express = require('express');
const axios = require('axios');
const port = 13000;

const app = express();

const baseurl = `http://localhost:${port}`;

const setup = [
    axios.get(`${baseurl}/apisetup`),
    axios.get(`${baseurl}/taskidsetup`),
    axios.get(`${baseurl}/listidsetup`),
    axios.get(`${baseurl}/folderidsetup`),
    axios.get(`${baseurl}/spaceidsetup`)
];

Promise.all(setup)
  .then(responses => responses.map(response => response.data))
  .then(data => console.log(data))
  .catch(err => console.log("Multiple Requests Failed", err));
