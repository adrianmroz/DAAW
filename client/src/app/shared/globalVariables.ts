var PouchDB = require('pouchdb');
export var db = new PouchDB('http://localhost:5984/database');
export var apiAdress = 'http://localhost:3000/api';