module.exports = function(){
    var express = require('express');
    var router = express.Router();

  // Display departments for department page
  
    function getDepartments(res, mysql, context, complete){
        mysql.pool.query("SELECT Title FROM Hosp_Department;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.departments  = results;
            complete();
        });
}

  // When page loads, display all departments
  
  router.get('/department', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getDepartments(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('department', context);
            }

        }
};
