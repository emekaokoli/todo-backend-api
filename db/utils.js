const Client = require('pg').Client;

const host = process.env.DB_HOST || '127.0.0.1';
const user = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASS;
const database = process.env.DB_NAME || 'tasks_app';
const port = process.env.DB_PORT || 5432;

const withClient = async (func) => {
    const client = new Client({
        user,
        password,
        port,
        database,
        host,
    });

    try {
        await client.connect();
        return await func(client);
    } finally {
        await client.end();
    }
}

module.exports = {
    withClient,
};
