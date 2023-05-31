// server.js

const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/favicon.ico', (req, res) => {
    res.status(204);
});

const client = new Client({
    connectionString: 'postgres://feanthnh:AKSMokXhaV8eZ0oaHs-3_JXNO6X5AWII@balarama.db.elephantsql.com/feanthnh',
});

client.connect((err) => {
    if (err) {
        console.error('Error connecting to database', err);
    } else {
        console.log('Connected to database');
    }
});

app.get('/websites', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM websites');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching data', err);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

process.on('exit', () => {
    client.end();
});
