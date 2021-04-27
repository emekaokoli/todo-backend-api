'use strict';

const {
  create,
  findAll,
  findOne,
  deleteOne,
  updateOne,
} = require('../models/todo.model.js');

/**
 * @description Creates todo items
 * @memberof createTodo
 * @param req
 * @param res
 * @returns {json} json
 */

module.exports.createTodo = async (req, res, next) => {
  const { title, status, subtasks } = req.body;
  try {
    const { rows } = await create({
      title,
      status,
      subtasks,
    });

    if (rows) {
      return res.status(201).send('sucess');
    }
    return res.status(400).send('failed');
  } catch (error) {
    console.trace(error);
    return res.tatus(500).send(`Internal Server Error: ${error.message}`);
  }
  next();
};

/**
 * @description get all items in the db
 * @memberof getAll
 * @param req
 * @param res
 * @returns {json} json
 */

exports.getAll = async (req, res, next) => {
  try {
    const { rows } = await findAll();

    const results = rows;
    if (results) {
      return res.status(200).send(results);
    }
    return res.status(400).send('Failed to get');
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error.message}`);
  }
};
/**
 * @description  find one todo item by Id in the db
 * @memberof FindOne
 * @param req
 * @param res
 * @returns {json} json
 */
exports.FindOne = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const { rows } = await findOne({ id });

    const results = rows[0];

    if (results) {
      return res.status(200).send(results);
    }
    return res.status(400).send(`Bad request, Id ${id} not found`);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error.message}`);
  }
};
/**
 * @description  deletes one todo item by Id in the db
 * @memberof deleteOne
 * @param req
 * @param res
 * @returns {json} json
 */
exports.deleteOne = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const { rows } = await deleteOne({ id });
    const results = rows[0];

    if (results) {
      return res.status(200).send(success);
    }
    return res.status(400).send(`failed, Id ${id} does not exist`);
  } catch (error) {
    return res.status(500).send(`Internal Server Error ${error.name}`);
  }
};

exports.UPDATE = async (req, res, next) => {
  const id  = parseInt(req.params.id);

  const {
  title,
  status
  } = req.body;

  try {
    const { rows } = await updateOne({
      title,
      status,
      id,
    });

    if (rows) {
      return res.status(200).send(`task modified with the Id ${id}`);
    }
    return res.status(400).send(`failed, Id ${id} does not exist`);
  } catch (error) {
    console.trace(error);
    return res.status(500).send(`Internal Server Error ${error.message}`);
  }
  next();
};