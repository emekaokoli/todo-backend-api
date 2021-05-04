const { withClient } = require('../db/utils');
const { tasks } = require('../db/schema/queries');

module.exports = {
    create: (title) => withClient(async (client) => {
        const result = await client.query(tasks.insert, [title]);
        return result.rows[0];
    }),
    
    updateStatus: ({ id, status }) => withClient(async (client) => {
        const result = await client.query(tasks.updateStatus, [status, id]);
        return result.rows[0];
    }),

    findAll: () => withClient(async (client) => (await client.query(tasks.selectAll)).rows),

    findOne: (id) => withClient(async (client) => (await client.query(tasks.selectOne, [id])).rows[0]),
}
