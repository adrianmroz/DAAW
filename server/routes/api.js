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
