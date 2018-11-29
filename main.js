// Code in this file used the code in the following git repository as a foundation:
// https://github.com/knightsamar/CS340-Sample-Web-App

/*  
    Uses express, dbcon for database connection, body parser to parse form data 
    handlebars for HTML templates  
*/

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
app.use('/branch', require('./branch.js'));
app.use('/department', require('./department.js'));
app.use('/doctor', require('./doctor.js'));
app.use('/doctor_branch', require('./doctor_branch.js'));
app.use('/doctor_department', require('./doctor_department.js'));
app.use('/patient', require('./patient.js'));
app.use('/update_patient', require('./update_patient.js'));
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
  console.log('Express started on http://flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});




/***********Code below this line worked to render page*******

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

app.get('/department',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT Title FROM Hosp_Department', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.render('department',context);
  })
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

*/
