module.exports = function(){
    var express = require('express');
    var router = express.Router();

  // Display patients for patient page
  
    function getPatients(res, mysql, context, complete){
        mysql.pool.query("SELECT p.Fname AS `FirstName`, p.Lname AS `LastName`, p.Gender AS `Gender`, p.Birthdate AS `DateofBirth`, p.Room AS `RoomNumber`, CONCAT(doc.Fname, ' ', doc.Lname) AS `Doctor`, b.name AS `Branch` FROM Hosp_Patient p INNER JOIN Hosp_Doctor doc ON p.Doctor = doc.Id INNER JOIN Hosp_Branch b ON p.Branch = b.Id;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.patients  = results;
            complete();
        });
}
    
    // Display doctors for doctor drop-down menu
    
    function getDoctors(res, mysql, context, complete){
        mysql.pool.query("SELECT Id, CONCAT(Fname,' ',Lname) AS `DoctorName` FROM Hosp_Doctor;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.doctors  = results;
            complete();
        });
}
    
    // Display branches for branch drop-down menu
    
    function getBranches(res, mysql, context, complete){
        mysql.pool.query("SELECT Id, Name FROM Hosp_Branch;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.branches  = results;
            complete();
        });
}

  // When page loads, display all patients
  
  router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPatients(res, mysql, context, complete);
        getDoctors(res, mysql, context, complete);
        getBranches(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('patient', context);
            }

        }
    });
    
    // When user submits a new patient, add it to the database and refresh page to display new row
    
    router.post('/', function(req, res){       
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Hosp_Patient (Fname, Lname, Gender, Birthdate, Room, Doctor, Branch) VALUES (?,?,?,?,?,?,?);";
        var inserts = [req.body.Fname, req.body.Lname, req.body.Gender, req.body.Birthdate, req.body.Room, req.body.Doctor, req.body.Branch];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/patient');
            }
        });
});
    
    return router;
}();
