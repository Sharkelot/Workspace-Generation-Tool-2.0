const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

// Assuming you have an existing Express app instance
const app = express();
const port = 3001;

// Add the existing middleware
app.use(bodyParser.json());

// Define the new route without adding a new listener
// Corrected route handler
app.get('/apikeys/:wsid', async (req, res) => {
  try {
    const { wsid } = req.params;
    const clickUpApiResponse = await makeClickUpApiRequest(wsid);
    
    // Log the ClickUp API response data to the console
    console.log('ClickUp API Response Data:', clickUpApiResponse.data);

    // Send the data in the HTTP response
    res.json({
      success: true,
      data: clickUpApiResponse.data,
    });
  } catch (error) {
    // Log errors to the console
    console.error('Error:', error);

    // Handle errors and send an appropriate response
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Remove the apikey parameter from makeClickUpApiRequest function
async function makeClickUpApiRequest(wsid) {
  const apiUrl = `https://api.clickup.com/api/v2/space/${wsid}`;

// No need to add app.listen() here if your server is already running in Docker

async function makeClickUpApiRequest(wsid, apikey) {
  const apiUrl = `https://api.clickup.com/api/v2/space/${wsid}`;
  const headers = {
    headers: {
      'Authorization': apikey,
      'Content-Type': 'application/json',
    }
  };

  const config = {
    ...headers,
    method: 'GET', // Specify the HTTP method type
  };

  try {
    const response = await axios(apiUrl, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Start the Express app (if not running in Docker)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
