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



router.get('/', function(req,res){
	res.send('Working...');
});


router.post('/bookmarks', function(req, res){
	couch.insert('database',{
		url: req.body.url
	}).then(
		function(data,headers,status){
		res.send(status);
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
database.view('all_urls', 'all',function(err, body) {
  if (!err) {
    body.rows.forEach(function(doc) {
			if(doc.id==req.params.id){
      res.json(doc.value);
			}
    });
  }
});
});

module.exports = router;  
