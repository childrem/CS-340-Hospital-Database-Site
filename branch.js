module.exports = function(){
    var express = require('express');
    var router = express.Router();

  // Display branches for branch page
  
    function getBranches(res, mysql, context, complete){
        mysql.pool.query("SELECT Name, Street_Address, City, State, Zip_Code, Capacity FROM Hosp_Branch;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.branches  = results;
            complete();
        });
}

  // When page loads, display all branches
  
  router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getBranches(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('branch', context);
            }

        }
    });
    
    // Allow user to add new branches via the form and refresh page to view the new row
    
    router.post('/', function(req, res){       
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Hosp_Branch (Name, Street_Address, City, State, Zip_Code, Capacity) VALUES (?,?,?,?,?,?);";
        var inserts = [req.body.Name, req.body.Street_Address, req.body.City, req.body.State, req.body.Zip_Code, req.body.Capacity];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/branch');
            }
        });
});
    
    return router;
}();
