const keys =  require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    // reconnect to server every 1 sec if it loses connection
    retry_strategy: () => 1000
});
const subscription = redisClient.duplicate();

const fib = (index) => {
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
};

subscription.on('message', (channel, message) => {
    // sets value in the hash called 'values' according to key:value pair
    // where
    // key: -> message
    // value: -> fib(parseInt(message))
    redisClient.hset('values', message, fib(parseInt(message)));
});
subscription.subscribe('insert');