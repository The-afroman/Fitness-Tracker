'use strict'

const sql = require('sqlite3');
const util = require('util');


// old-fashioned database creation code 

// creates a new database object, not a 
// new database. 
const db = new sql.Database("activities.db");

// check if database exists
let cmd = "SELECT name FROM sqlite_master WHERE type='table' AND name='ActivityTable' UNION SELECT name FROM sqlite_master WHERE type='table' AND name='Profile'";
//let cmdp = " SELECT name FROM sqlite_master WHERE type='table' AND name='Profile'";
db.get(cmd, function (err, val) {
  if (val == undefined || err) {
        console.log("No database file - creating one");
        createTables();
  } else {
        console.log("database exists");
  }
});

// called to create table if needed
function createTables() {
  // explicitly declaring the rowIdNum protects rowids from changing if the 
  // table is compacted; not an issue here, but good practice
  const cmd1 = 'CREATE TABLE ActivityTable (rowIdNum INTEGER PRIMARY KEY, userid INTEGER, activity TEXT, date INTEGER, amount FLOAT)';
  const cmd2 = 'CREATE TABLE Profile (rowIdNum INTEGER PRIMARY KEY, userid INTEGER NOT NULL UNIQUE, first_name TEXT, last_name TEXT)'
  db.run(cmd1, function(err, val) {
    if (err) {
      console.log("Database creation failure",err.message);
    } else {
      console.log("added act table");
    }
  });
  db.run(cmd2, function(err, val) {
    if (err) {
      console.log("Database creation failure",err.message);
    } else {
      console.log("added profile table");
    }
  });
}

// wrap all database commands in promises
db.run = util.promisify(db.run);
db.get = util.promisify(db.get);
db.all = util.promisify(db.all);

// empty all data from db
db.deleteEverything = async function() {
  await db.run("delete from ActivityTable");
  await db.run("delete from Profile");
  db.run("vacuum");
}

// allow code in index.js to use the db object
module.exports = db;
