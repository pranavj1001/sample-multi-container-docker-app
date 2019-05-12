module.exports = {
    PG_CLIENT_CREATE_VALUES_TABLE_QUERY : 'CREATE TABLE IF NOT EXISTS values (number INT)',
    PG_CLIENT_SELECT_ALL_VALUES_TABLE_QUERY: 'SELECT * FROM values',
    PG_CLIENT_INSERT_VALUE_TABLE_QUERY: 'INSERT INTO values (number) VALUES($1)',
    LOST_PG_CONNECTION_MESSAGE: 'Lost PG Connection.',
    INDEX_VALUE_TOO_HIGH_MESSAGE: 'Index value is too high. Please select index value lower than 41.',
    NOTHING_YET_MESSAGE: 'Nothing yet!',
    LISTENING_ON_PORT_MESSAGE: 'Listening on port number 5000'
};