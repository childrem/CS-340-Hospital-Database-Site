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
        mysql.pool.query("SELECT CONCAT(Fname,' ',Lname) AS `DoctorName` FROM Hosp_Doctor;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.doctors  = results;
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
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('patient', context);
            }

        }
    });
    
    return router;
}();
