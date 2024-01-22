const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/apikeys/30967133', (req, res) => {
  // Assuming your JSON payload looks like { "wsid": "workspace_id", "apikey": "your_api_key" }
  const { wsid, apikey } = req.body;

  // You can now use wsid and apikey for your ClickUp API call
  // Call a function to make the ClickUp API request using Axios
  makeClickUpApiRequest(wsid, apikey)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.status(error.response.status).json({ error: error.response.data });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
