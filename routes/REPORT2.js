var express = require('express');
var router = express.Router();


//router.use(express.static(__dirname + '/public'));

/* GET home page. */
router.get('/', function(req, res) {
    

    //res.render('REPORT1', { title: 'REPORT1' });
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
            request.query("SELECT [ID],[NAME] FROM [TKWEB].[dbo].[LOGIN]  "
                , function (err, recordset) {
                    if (err) console.log(err)
                    else {
                        var myData = [];

                        for(i=0;i<recordset.recordsets[0].length;i++) {
                             //console.dir(recordset.recordsets[0][i].AID)
                             myData.push(recordset.recordsets[0][i]);  
                        }
                        
                        
                        //res.send(myData)
                        res.render('REPORT2',{data:myData});

                        //res.send(recordset.recordsets[0][0].AID)

                        /*
                        for(i=0;i<recordset.recordsets.length;i++) {
                            res.send(recordset.recordsets[0])
                        }
                        */
                        sql.close();
                    }
                });
        });
});
    








module.exports = router;