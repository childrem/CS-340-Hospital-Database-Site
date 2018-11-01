module.exports = function(){
    var express = require('express');
    var router = express.Router();

  // Display departments for department page
  
    function getBranches(res, mysql, context, complete){
        mysql.pool.query("SELECT Name AS `Branch Name`, Street_Address AS `Street Address`, City, State, Zip_Code AS Zipcode, Capacity FROM Hosp_Branch;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.branches  = results;
            complete();
        });
}

  // When page loads, display all departments
  
  router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getDepartments(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('branch', context);
            }

        }
    });
    
    return router;
}();
