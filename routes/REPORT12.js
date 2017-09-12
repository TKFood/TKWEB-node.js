var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
   //res.render('REPORT12', { title: 'REPORT12',p1:'' ,data:''}); 
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'dsc',
        server: '192.168.1.105', 
        database: 'TKWEB' ,
        options: { encrypt: false }
    };

    sql.connect(config, function (err) {

            // create Request object
            var SQL;
            var request = new sql.Request();

            SQL=" SELECT [ID],[MB001],[TYPEWEIGHT],[TYPELENGTH],[TYPEWIDTH],[COOKWEIGHT],[COOKLENGTH],[COOKWIDTH] FROM [TKMOC].[dbo].[PRODUCTCHECK] ";

            // query to the database and get the records
            request.query(SQL
                , function (err, recordset) {
                    if (err) console.log(err)
                    else {
                        var myData = [];

                        for(i=0;i<recordset.recordsets[0].length;i++) {                           
                             myData.push(recordset.recordsets[0][i]);  
                        }                        

                         res.render('REPORT12',{p1:req.body.date1,data:myData});                    

                        sql.close();
                    }
                });
        });

});

router.post('/', function(req, res){

   
});









module.exports = router;