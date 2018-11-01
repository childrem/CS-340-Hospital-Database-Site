module.exports = function(){
    var express = require('express');
    var router = express.Router();

  // Display doctor/department relationships for doctor/department page
  
    function getDocDepartment(res, mysql, context, complete){
        mysql.pool.query("SELECT CONCAT(doc.Fname,' ',doc.Lname) AS `Doctor`, dep.Title AS `Department` FROM Hosp_Doctor doc INNER JOIN Hosp_Doctor_Department dd ON doc.Id = dd.DocId INNER JOIN Hosp_Department dep ON dep.Id = dd.DepartId;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.docdepartments  = results;
            complete();
        });
}
    
    // Display doctors for the doctor drop-down menu
    
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
    
    // Display departments for the department drop-down menu
    
    function getDepartments(res, mysql, context, complete){
        mysql.pool.query("SELECT Id, Title AS `Department` FROM Hosp_Department;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.departments  = results;
            complete();
        });
}
    
  // When page loads, display all doctor/department relationships
  
  router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getDocDepartment(res, mysql, context, complete);
        getDepartments(res, mysql, context, complete);
        getDoctors(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('doctor_department', context);
            }

        }
    });
    
    return router;
}();
