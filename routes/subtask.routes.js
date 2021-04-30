const express = require('express');
const {
  UPDATE,
  getAll,
  createTodo,
  FindOne,
  deleteOne,
} = require('../controllers/subtask.controllers');

const {
  validateSuntakReqBody,
  validate,
} = require('../helpers/formatRequests');

const router = express.Router();

/* GET home page. */
router
  .route('/')
  .get(getAll)
  .post(validateSuntakReqBody(), validate, createTodo)
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /todo');
    next();
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /todo');
  });

router
  .route('/:id')
  .get(FindOne)
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('post operation not supported');
    next();
  })
  .put(validateSuntakReqBody(), validate, UPDATE)
  .delete(deleteOne);

module.exports = router;
