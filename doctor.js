module.exports = function(){
    var express = require('express');
    var router = express.Router();

  // Display doctors for doctor page
  
    function getDoctors(res, mysql, context, complete){
        mysql.pool.query("SELECT Fname, Lname, License FROM Hosp_Doctor;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.doctors  = results;
            complete();
        });
}

  // When page loads, display all doctors
  
  router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getDoctors(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('doctor', context);
            }

        }
    });
    
    return router;
}();
