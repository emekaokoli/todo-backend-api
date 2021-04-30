const { Database } = require('../db/database');
const {
  subtask_plain_string,
  insert_subtasks,
  queryAllSubtask,
  id,
  queryOneSubtask,
  deleteOneSubtask,
  updateSubtask,
} = require('../helpers/dbQueries');

exports.create = async (requestBody) => {
  const keys = subtask_plain_string.split(',').map((k) => k.trim());
  const values = keys.map((key) => requestBody[key]);
  try {
    const { rows } = await Database(insert_subtasks, values);
    return { rows };
  } catch (error) {
    console.trace(error);
    throw new Error(`failed, ${error.message}`);
  }
};

exports.findAll = async () => {
  try {
    const { rows } = await Database(queryAllSubtask);
    return { rows };
  } catch (error) {
    throw new Error(`failed , ${error.message}`);
  }
};

exports.findOne = async (selectedId) => {
  const keys = id.split(',').map((k) => k.trim());
  const values = keys.map((key) => selectedId[key]);
  try {
    const { rows } = await Database(queryOneSubtask, values);
    return { rows };
  } catch (error) {
    throw new Error(`failed, ${error.message}`);
  }
};

exports.deleteOne = async (deleteRequestId) => {
  const keys = id.split(',').map((k) => k.trim());
  const values = keys.map((key) => deleteRequestId[key]);

  try {
    const { rows } = await Database(deleteOneSubtask, values);
    return { rows };
  } catch (error) {
    throw new Error(`failed, ${error.message}`);
  }
};

exports.updateOne = async (updateId) => {
  const keys = subtask_plain_string.split(',').map((k) => k.trim());
  const value = keys.map((key) => updateId[key]);
  const id = updateId.id;

  const values = [...value, id];

  try {
    const { rows } = await Database(updateSubtask, values);
    return { rows };
  } catch (error) {
    console.trace(error);
    throw new Error(`update failed, ${error.message}`);
  }
};
