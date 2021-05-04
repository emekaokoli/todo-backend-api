const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const apicache = require('apicache');
const cors = require('cors');


const cache = apicache.middleware;
process.env.NODE_ENV = 'development';

const app = express();
const allowedOrigins = (process.env.ALLOW_ORIGIN || 'http://127.0.0.1:3000,http://localhost:3000').split(",");

app.use(cors({
  origin: function(origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
        const msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
        return callback(new Error(msg), false);
        }
        return callback(null, true);
  }
}));
app.use(cache('5 minutes'));
app.use(logger('dev'));
app.use(express.json());

app.use('/api/v1/tasks', require('./routes/tasks'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
