const { body, validationResult } = require('express-validator');


/**
 * @description checks and validate,remove whitepaces[LR] from the Request Body, and also transform request body to lowercase
 * @memberof validateReqBody
 * @param req
 * @param res
 * @returns {req.body} body
 */

exports.validateReqBody = () => {
  return [
    body('title')
      .notEmpty()
      .trim()
      .toLowerCase()
      .withMessage('cannot be empty'),
    body('status')
      .notEmpty()
      .trim()
      .toLowerCase()
      .withMessage('cannot be empty'),
    // body('subtasks')
    //   .notEmpty()
    //   .trim()
    //   .toLowerCase()
    //   .withMessage('cannot be empty')
  ];
};

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
  const error = {errors: extractedErrors}

};
