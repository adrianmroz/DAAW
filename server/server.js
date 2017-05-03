var express		= require('express');
var app 		= express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var api         = require('./routes/api');


var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Method", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', api);
app.listen(port);
console.log('Listen at http://localhost:' + port);

