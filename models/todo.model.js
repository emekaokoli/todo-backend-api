const { Database } = require('../db/database');
const {
  todo_plain_string,
  todo_sql_insert,
  delete_todo_query,
  queryAll,
  _id,
  queryOneTodo,
  deleteOneTodo,
} = require('../helpers/dbQueries');

exports.create = async (requestBody) => {
  const keys = todo_plain_string.split(',').map((k) => k.trim());
  const values = keys.map((key) => requestBody[key]);
  try {
    const { rows } = await Database(todo_sql_insert, values);
    return { rows };
  } catch (error) {
    throw new Error(`failed, ${error.message}`);
  }
};

exports.findAll = async () => {
  try {
    const { rows } = await Database(queryAll);
    return { rows };
  } catch (error) {
    throw new Error(`failed , ${error.message}`);
  }
};

exports.findOne = async (selectedId) => {
  const keys = _id.split(',').map((k) => k.trim());
  const values = keys.map((key) => selectedId[key]);
  try {
    const { rows } = await Database(queryOneTodo, values);
    return { rows };
  } catch (error) {  
    throw new Error(`failed, ${error.message}`);
  }
};

exports.deleteOne = async (deleteRequestId) => {
  const keys = _id.split(',').map((k) => k.trim());
  const values = keys.map((key) => deleteRequestId[key]);

  try {
    const { rows } = await Database(deleteOneTodo, values);
    return { rows };
  } catch (error) {
    throw new Error(`failed, ${error.message}`);
  }
};
