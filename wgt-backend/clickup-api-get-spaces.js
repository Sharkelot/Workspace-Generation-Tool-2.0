const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 13000;

app.use(bodyParser.json());

app.get('/apikeys/30967133', async (req, res) => {
try {
  const { wsid, apikey } = req.body;
  const clickUpApiRespone = await makeClickUpApiRequest(wsid,apikey);
  res.json(clickUpApiRespone.data);
} catch (error) {
  res.status(error.response.status.json)({error: error.response.data});
}
});

async function makeClickUpApiRequest(wsid, apikey) {
  const apiUrl = `https://api.clickup.com/api/v2/space/${wsid}`;
  const headers1 = {
    method: 'GET',
      headers: {
    'Authorization': apikey,
    'Content-Type': 'application/json',}
  };

  try {
    const response = await axios.get(apiUrl, { headers1 });
    console.log ("response here:");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
    
  }
};
