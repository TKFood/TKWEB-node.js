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
            request.query("SELECT [ID] AS AID FROM [TKWEB].[dbo].[LOGIN]  "
                , function (err, recordset) {
                    if (err) console.log(err)
                    else {
                        	//res.render('REPORT4',recordset.recordsets[0]);
                        	res.send(recordset)
                        }
                        
                        sql.close();
                });
        });
});
    








module.exports = router;