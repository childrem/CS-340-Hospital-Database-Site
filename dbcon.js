var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_childrem',
  password        : '2316',
  database        : 'cs340_childrem'
});
module.exports.pool = pool;
