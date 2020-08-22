require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const createError = require('http-errors');
const indexRouter = require('./src/api/index')

const app = express();

const port = process.env.PORT ? process.env.PORT : 3000 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(require("morgan")("dev"));
    app.listen(port , () => {
    console.log("Express server listning on port " + port);
  });

   app.use('/', indexRouter);


   app.use((req, res, next) => {
       res.json('Not Found')
    next(createError(404));
  });

  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });