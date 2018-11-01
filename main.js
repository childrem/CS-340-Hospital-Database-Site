/*This file was adapted from the CS 340 Sample Web App by knightsamar on github */

/*  
    Uses express, dbcon for database connection, body parser to parse form data 
    handlebars for HTML templates  
*/

/*
var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use('/department', require('./department.js'));
//app.use('/people', require('./people.js'));
app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

*/

var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5728);

app.get('/',function(req,res){
  //var context = {};
  //mysql.pool.query('SELECT * FROM todo', function(err, rows, fields){
    //if(err){
      //next(err);
      //return;
    //}
    //context.results = JSON.stringify(rows);
    res.render('home');
  });

app.get('/department',function(req,res){
  //var context = {};
  //mysql.pool.query('SELECT * FROM todo', function(err, rows, fields){
    //if(err){
      //next(err);
      //return;
    //}
    //context.results = JSON.stringify(rows);
    res.render('department');
  });

app.get('/branch',function(req,res){
  //var context = {};
  //mysql.pool.query('SELECT * FROM todo', function(err, rows, fields){
    //if(err){
      //next(err);
      //return;
    //}
    //context.results = JSON.stringify(rows);
    res.render('branch');
  });

app.get('/doctor',function(req,res){
  //var context = {};
  //mysql.pool.query('SELECT * FROM todo', function(err, rows, fields){
    //if(err){
      //next(err);
      //return;
    //}
    //context.results = JSON.stringify(rows);
    res.render('doctor');
  });

app.get('/doctor_branch',function(req,res){
  //var context = {};
  //mysql.pool.query('SELECT * FROM todo', function(err, rows, fields){
    //if(err){
      //next(err);
      //return;
    //}
    //context.results = JSON.stringify(rows);
    res.render('doctor_branch');
  });

app.get('/doctor_department',function(req,res){
  //var context = {};
  //mysql.pool.query('SELECT * FROM todo', function(err, rows, fields){
    //if(err){
      //next(err);
      //return;
    //}
    //context.results = JSON.stringify(rows);
    res.render('doctor_department');
  });

app.get('/patient',function(req,res){
  //var context = {};
  //mysql.pool.query('SELECT * FROM todo', function(err, rows, fields){
    //if(err){
      //next(err);
      //return;
    //}
    //context.results = JSON.stringify(rows);
    res.render('patient');
  });

app.get('/update_patient',function(req,res){
  //var context = {};
  //mysql.pool.query('SELECT * FROM todo', function(err, rows, fields){
    //if(err){
      //next(err);
      //return;
    //}
    //context.results = JSON.stringify(rows);
    res.render('update_patient');
  });

/*

app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO todo (`name`) VALUES (?)", [req.query.c], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});

app.get('/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM todo WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Deleted " + result.changedRows + " rows.";
    res.render('home',context);
  });
});


///simple-update?id=2&name=The+Task&done=false&due=2015-12-5
app.get('/simple-update',function(req,res,next){
  var context = {};
  mysql.pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
    [req.query.name, req.query.done, req.query.due, req.query.id],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Updated " + result.changedRows + " rows.";
    res.render('home',context);
  });
});

///safe-update?id=1&name=The+Task&done=false
app.get('/safe-update',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM todo WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.done || curVals.done, req.query.due || curVals.due, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home',context);
      });
    }
  });
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS todo", function(err){
    var createString = "CREATE TABLE todo(" +
    "id INT PRIMARY KEY AUTO_INCREMENT," +
    "name VARCHAR(255) NOT NULL," +
    "done BOOLEAN," +
    "due DATE)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

*/
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
