var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect(config.database, {
  useNewUrlParses: true
});

// connection to the database
var database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));

var indexRouter = require('./routes/index');
var flightsRouter = require('./routes/flights');
var touristsRouter = require('./routes/tourists');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// downloading the current website address
app.use(function (req, res, next) {
  res.locals.activeLink = req.path;

  next();
})

app.use('/', indexRouter);
app.use('/flights', flightsRouter);
app.use('/tourists', touristsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;