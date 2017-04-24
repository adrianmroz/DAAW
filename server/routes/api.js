const express	= require('express');
var router      = express.Router();
const path 		= require('path');
const NodeCouchDb = require('node-couchdb');

const couch = new NodeCouchDb({
	auth: {
        user: 'admin',
        pass: '123456'
    }
});
var nano   = require('nano')('http://localhost:5984')
  , db     = nano.use('database')
  ;
var database = nano.db.use('database');

var expressJwt = require('express-jwt');
var SECRET = 'mysecret';

var nano2 = require('nano')('http://localhost:5984/users');
var jwt = require('jsonwebtoken');
//var _ = require('lodash');

app = express();
app.set('secret', SECRET);
app.use('/api', expressJwt({
            secret : SECRET
        }))


router.post('/authentication', function(req, res) {
    //Client will call this method to query a token
    var username = req.body.username;
    var password = req.body.password;
    nano2.get(username, null, function(err, body) {
        if (err) {
            res.status(401).send('Wrong user or password');
            return;
        } else {
            console.log(body);
            //properties contained in the token, of course you can add first name, last name and so on
            var profile = {
                username: username
            };
            // We are encoding the profile inside the token
            var token = jwt.sign(profile, app.get('secret'), {
                expiresIn: 60 * 5
            });
            res.json({
                token: token
            });
        }
    });
});

router.post('/users',function(req, res) {   ///trzeba zrobic validacje po froncie bo nazwa bazy musi byc z malej litery i nie moze zawierac dziwnych znakow
//when signup method is called, we insert a new user in couchDB, username being the id of the record
    nano2.insert({
        'password': req.body.password
    }, req.body.username, function(err, body, header) {
        if (err) {
            //if for example username already exists in database, an error will be thrown
            console.log('user insertion error', err.message);
            res.status(400).send(err.message);
        }else{
        console.log('you have inserted a new user: ' + req.body.username);
        console.log(req.body);
                   var profile = {
                username: req.body.username
            };
            couch.createDatabase(req.body.username).then(() => {console.log("database "+req.body.username+" created")}, err => {
                console.log("cant create database");
            });
            // We are encoding the profile inside the token
            var token = jwt.sign(profile, app.get('secret'), {
                expiresIn: 60 * 5
            });
            res.json({
                token: token
            });

        }
    });
});


router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('secret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});




router.get('/', function(req,res){
	res.send('Working...');
});


router.post('/bookmarks', function(req, res){
	couch.insert('database',{
		url: req.body.url,
    name: req.body.name,
    tags: req.body.tags
	}).then(
		function(data,headers,status){
    res.json({msg:"Dodano do bazy"}).status(201);
	},
	function(err){
		res.send(err);
	});
});

router.get('/bookmarks', function(req, res){
	database.view('all_urls', 'all', function(err, body) {
		var document=[];
  if (!err) {
    body.rows.forEach(function(doc) {
      console.log(doc.value);
			document.push(doc.value);
    });
		res.json(document);
  }
});
});

router.get('/bookmarks/:id', function(req,res){
couch.get("database", req.params.id).then(({data, headers, status}) => {
    console.log(data);
		res.json(data);
}, err => {
    console.log(err);
});
});


router.delete('/bookmarks/:id',function(req,res){
	database.get(req.params.id, function(err, body) {
  if (!err) {
    var latestRev = body._rev;
    database.destroy(req.params.id, latestRev, function(err, body, header) {
      if (!err) {
          console.log("Successfully deleted doc", req.params.id);
					res.status(200);
      }
    });
  }
	console.log(err);
})
});
module.exports = router;  
