const keys = require('./keys');
const constants = require('../string-constants');

// Express App Setup starts ---------------
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
// Express App Setup ends ---------------

// Postgres Client Setup starts ---------------
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHOST,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});
pgClient.on('error', () => console.log(constants.LOST_PG_CONNECTION_MESSAGE));
pgClient
    .query(constants.PG_CLIENT_CREATE_VALUES_TABLE_QUERY)
    .catch(error => console.log(error));
// Postgres Client Setup ends ---------------

// Redis Client Setup starts ---------------
const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
// we are duplicating the redis connection
// because in redis once a connection is used
// for subscribing then it cannot be used for
// other purposes.
const redisPublisher = redisClient.duplicate();
// Redis Client Setup ends ---------------

// Express Route Handlers starts ---------------
app.get('/', (req, res) => {
    res.send('Hi');
});
app.get('/values/all', async (req, res) => {
    const values = await pgClient.query(constants.PG_CLIENT_SELECT_ALL_VALUES_TABLE_QUERY);
    res.send(values.rows);
});
app.get('/values/current', async (req, res) => {
    // gets all values from the hash called 'values'
    redisClient.hgetall('values', (error, values) => {
        res.send(values);
    });
});
app.post('/values', async (req, res) => {
    const index = req.body.index;
    if (parseInt(index) > 40) {
        return  res.status(422).send(constants.INDEX_VALUE_TOO_HIGH_MESSAGE);
    }

    // save in redis database's hash called 'values
    redisClient.hset('values', index, constants.NOTHING_YET_MESSAGE);
    // invokes the 'insert' process in worker index.js
    // which sets the value in redis database
    redisPublisher.publish('insert', index);

    // save in postgres database
    pgClient.query(constants.PG_CLIENT_INSERT_VALUE_TABLE_QUERY, [index]);

    res.send({ working: true });
});

app.listen(5000, error => {
    console.log(constants.LISTENING_ON_PORT_MESSAGE);
})
// Express Route Handlers ends ---------------
