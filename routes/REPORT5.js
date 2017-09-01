var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
   res.render('REPORT5', { title: 'REPORT5',p1:'',p2:'' ,data:'',p3:''}); 

});

router.post('/', function(req, res){
   


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
            var request = new sql.Request();
            // query to the database and get the records
            request.query("SELECT TG001,TG002 FROM [TK].[dbo].[COPTG] WHERE TG003>='"+req.body.date1+"' AND TG003<='"+req.body.date2+"'"
                , function (err, recordset) {
                    if (err) console.log(err)
                    else {
                        var myData = [];

                        for(i=0;i<recordset.recordsets[0].length;i++) {                           
                             myData.push(recordset.recordsets[0][i]);  
                        }                        

                         res.render('REPORT5',{p1:req.body.date1,p2:req.body.date2,data:myData,p3:req.body.selectpicker});

                        sql.close();
                    }
                });
        });
});









module.exports = router;