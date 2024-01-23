const express = require('express');
const axios = require('axios');
const pool = require('./db');
const port = 3000;

const app = express();
app.use(express.json());
const clickUpBaseUrl = 'https://api.clickup.com/api/v2/';

// api key routes
app.get('/apikeys', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM apikeys')
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.get('/apikeys/:value', async (req, res) => {
    const wildcardValue = req.params.value;

    try {
        const data = await pool.query('SELECT * FROM apikeys WHERE wsid = $1', [wildcardValue]);
        res.status(200).send(data.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/apikeys', async (req, res) => {
    const { wsid, apikey } = req.body
    try {
        await pool.query('INSERT INTO apikeys (wsid, apikey) VALUES ($1, $2)', [wsid, apikey])
        res.status(200).send({ message: "Successfully added child" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.get('/apisetup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE apikeys( id SERIAL PRIMARY KEY, wsid VARCHAR(100), apikey VARCHAR(100))')
        res.status(200).send({ message: "Successfully created apikey table" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

// list id routes
app.get('/listids', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM listids')
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.post('/listids', async (req, res) => {
    const { wsid, folderid ,listid } = req.body
    try {
        await pool.query('INSERT INTO listids (wsid, folderid, listid) VALUES ($1, $2, $3)', [wsid, folderid ,listid])
        res.status(200).send({ message: "Successfully added child" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.get('/listidsetup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE listids( id SERIAL PRIMARY KEY, wsid VARCHAR(100), folderid VARCHAR(100), listid VARCHAR(100))')
        res.status(200).send({ message: "Successfully created list table" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

// folder routes
app.get('/folderids', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM folderids')
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.post('/folderids', async (req, res) => {
    const { wsid, spaceid ,folderid } = req.body
    try {
        await pool.query('INSERT INTO folderids (wsid, spaceid, folderid) VALUES ($1, $2, $3)', [wsid, spaceid ,folderid])
        res.status(200).send({ message: "Successfully added child" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.get('/folderidsetup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE folderids( id SERIAL PRIMARY KEY, wsid VARCHAR(100), spaceid VARCHAR(100), folderid VARCHAR(100))')
        res.status(200).send({ message: "Successfully created folder table" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

// space routes
app.get('/spaceids', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM spaceids')
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.post('/spaceids', async (req, res) => {
    const { wsid, spaceid } = req.body
    try {
        await pool.query('INSERT INTO spaceids (wsid, spaceid) VALUES ($1, $2)', [wsid, spaceid])
        res.status(200).send({ message: "Successfully added child" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.get('/spaceidsetup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE spaceids( id SERIAL PRIMARY KEY, wsid VARCHAR(100), spaceid VARCHAR(100))')
        res.status(200).send({ message: "Successfully created space table" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});


//taskid routes

app.get('/taskids', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM taskids')
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.post('/taskids', async (req, res) => {
    const { wsid, listid, taskid } = req.body
    try {
        await pool.query('INSERT INTO taskids (wsid, listid, taskid) VALUES ($1, $2, $3)', [wsid, listid, taskid])
        res.status(200).send({ message: "Successfully added child" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.get('/taskidsetup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE taskids( id SERIAL PRIMARY KEY, wsid VARCHAR(100), listid VARCHAR(100), taskid VARCHAR(100))')
        res.status(200).send({ message: "Successfully created task table" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});
// ClickUp API Routes
app.get('/clickup/spaces/:wsid', async (req, res) => {
    const wildcardWsid = req.params.wsid;

    try {
        // Fetch API key from SQL database based on the wildcard wsid
        const data = await pool.query('SELECT apikey FROM apikeys WHERE wsid = $1', [wildcardWsid]);
        const apiKey = data.rows[0].apikey;

        // Make ClickUp API request using the retrieved API key and wildcard wsid
        const apiUrl = `${clickUpBaseUrl}team/${wildcardWsid}/space`;
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': apiKey,
            },
        });

        res.status(200).send(response.data);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});
app.post('/clickup/spaces', async (req, res) => {
    const { wsid } = req.body;

    try {
        // Fetch API key from SQL database based on the wildcard wsid
        const apiKeyData = await pool.query('SELECT apikey FROM apikeys WHERE wsid = $1', [wsid]);

        // Check if apiKeyData.rows[0] is defined before accessing apikey property
        if (apiKeyData.rows[0]) {
            const apiKey = apiKeyData.rows[0].apikey;

            // Make ClickUp API request using the retrieved API key and wildcard wsid
            const apiUrl = `${clickUpBaseUrl}team/${wsid}/space`;
            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': apiKey,
                },
            });

            // Extract space IDs from the response
            const spaceIds = response.data.spaces.map(space => space.id);

            // Insert space IDs into spaceids table
            await Promise.all(spaceIds.map(spaceId => {
                return pool.query('INSERT INTO spaceids (wsid, spaceid) VALUES ($1, $2)', [wsid, spaceId]);
            }));

            res.status(200).send(response.data);
        } else {
            // Handle case where apiKeyData.rows[0] is undefined
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});
// Route to create new spaces in ClickUp using the API key and a wildcard wsid
app.post('/clickup/create-spaces', async (req, res) => {
    const { wsid, features = {}, count } = req.body; // Ensure wsid is extracted correctly

    try {
        // Fetch API key from SQL database based on the wildcard wsid
        const apiKeyData = await pool.query('SELECT apikey FROM apikeys WHERE wsid = $1', [wsid]);

        // Check if apiKeyData.rows[0] is defined before accessing apikey property
        if (apiKeyData.rows[0]) {
            const apiKey = apiKeyData.rows[0].apikey;

            // Set up payload for creating multiple new spaces
            const spacesPayload = Array.from({ length: count }, (_, index) => ({
                name: `Generated Space ${index + 1}`, // Generate space names
                multiple_assignees: true,
                features: {
                    due_dates: true,
                    time_tracking: features.time_tracking || false,
                    tags: features.tags || false,
                    time_estimates: features.time_estimates || false,
                    checklists: features.checklists || false,
                    custom_fields: features.custom_fields || false,
                    remap_dependencies: features.remap_dependencies || false,
                    dependency_warning: features.dependency_warning || false,
                    portfolios: features.portfolios || false,
                },
            }));

            // Create an array to store promises for each space creation
            const createSpacePromises = spacesPayload.map(async (spacePayload, index) => {
                try {
                    // Make ClickUp API request to create a new space
                    const apiUrl = `${clickUpBaseUrl}team/${wsid}/space`; // Use wsid in the URL
                    const response = await axios.post(apiUrl, spacePayload, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: apiKey,
                        },
                    });

                    // Log the created space response
                    console.log(`Created Space ${index + 1} - ClickUp API Response:`, response.data);

                    // Return the space data for further processing if needed
                    return response.data;
                } catch (error) {
                    // Log and rethrow the error
                    console.error(`Error creating Space ${index + 1}:`, error.response?.data || error.message);
                    throw error;
                }
            });

            // Wait for all space creation promises to resolve
            const createdSpaces = await Promise.all(createSpacePromises);

            console.log(`Successfully created all ${createdSpaces.length} spaces.`);
            res.status(200).send({ success: true, message: `Successfully created all ${createdSpaces.length} spaces.` });
        } else {
            // Handle case where apiKeyData.rows[0] is undefined
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});



app.listen(port, () => console.log(`Server has started on port: ${port}`));