const express = require('express');
const pool = require('./db');
const port = 3000;

const app = express();
app.use(express.json());

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
        res.status(200).send({ message: "Successfully created table" })
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
        res.status(200).send({ message: "Successfully created table" })
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
        res.status(200).send({ message: "Successfully created table" })
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
        res.status(200).send({ message: "Successfully created table" })
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
    const { wsid, listid, taskids } = req.body
    try {
        await pool.query('INSERT INTO taskids (wsid, listid, taskids) VALUES ($1, $2, $3)', [wsid, listid, taskids])
        res.status(200).send({ message: "Successfully added child" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.get('/taskidsetup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE taskids( id SERIAL PRIMARY KEY, wsid VARCHAR(100), listid VARCHAR(100), taskid VARCHAR(100))')
        res.status(200).send({ message: "Successfully created table" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});



app.listen(port, () => console.log(`Server has started on port: ${port}`));