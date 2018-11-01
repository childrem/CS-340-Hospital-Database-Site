module.exports = function(){
    var express = require('express');
    var router = express.Router();

  // Display all doctor/branch relationships for doctor_branch page
  
    function getDocBranch(res, mysql, context, complete){
        mysql.pool.query("SELECT b.Name, CONCAT(doc.Fname,' ',doc.Lname) FROM Hosp_Branch b INNER JOIN Hosp_Doctor_Branch db ON b.Id = db.BId INNER JOIN Hosp_Doctor doc ON doc.Id = db.DocId;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.docbranches  = results;
            complete();
        });
}

  // When page loads, display all doctor/branch relationships
  
  router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getDocBranch(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('doctor_branch', context);
            }

        }
    });
    
    return router;
}();
