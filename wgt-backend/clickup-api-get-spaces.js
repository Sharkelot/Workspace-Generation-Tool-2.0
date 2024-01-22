const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/apikeys/30967133', (req, res) => {
  // Assuming your JSON payload looks like { "wsid": "workspace_id", "apikey": "your_api_key" }
  const { wsid, apikey } = req.body;
  makeClickUpApiRequest(wsid, apikey)
  .then(response => {
    res.json(response.data);
  })
  .catch(error => {
    res.status(error.response.status).json({ error: error.response.data });
  });
});

async function makeClickUpApiRequest(wsid, apikey) {
  const apiUrl = `https://api.clickup.com/api/v2/space/${wsid}`;

  const headers = {
    'Authorization': apikey,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.get(apiUrl, { headers });
    return response;
  } catch (error) {
    throw error;
  }
}
