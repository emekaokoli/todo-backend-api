const { withClient } = require('../db/utils');
const { subtasks } = require('../db/queries');

module.exports = {
  create: ({ title, todo_id }) =>
    withClient(async (client) => {
      const result = await client.query(subtasks.insert, [title, todo_id]);
      return result.rows[0];
    }),

  updateStatus: ({ id, status, todo_id }) =>
    withClient(async (client) => {
      const result = await client.query(subtasks.updateStatus, [
        status,
        todo_id,
        id,
      ]);
      return result.rows[0];
    }),

  updateAllSubtasks: (todo_id, status) =>
    withClient(async (client) => {
      const result = await client.query(subtasks.updateAllSubtasks, [
        status,
        todo_id,
      ]);
      return result.rows[0];
    }),

  findAll: (todo_id) =>
    withClient(
      async (client) =>
        (await client.query(subtasks.selectAll, [todo_id])).rows,
    ),

  findOne: ({ id, todo_id }) =>
    withClient(
      async (client) =>
        (await client.query(subtasks.selectOne, [todo_id, id])).rows[0],
    ),
};
