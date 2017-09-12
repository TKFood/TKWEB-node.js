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

            SQL=" SELECT [MANU] AS '線別',CONVERT(varchar(100),[MANUDATE],112) AS '生產日',[MOCMANULINE].[MB001] AS '品號',[MB002] AS '品名',[MB003] AS '規格',[BAR] AS '桶數',[NUM] AS '數量',[CLINET] AS '客戶',[TYPEWEIGHT] AS '成型重量',[TYPELENGTH] AS '成型長度',[TYPEWIDTH] AS '成型寬度',[COOKWEIGHT] AS '烘烤重量',[COOKLENGTH] AS '烘烤長度',[COOKWIDTH] AS '烘烤寬度' FROM [TKMOC].[dbo].[MOCMANULINE]LEFT JOIN [TKMOC].[dbo].[PRODUCTCHECK] ON [MOCMANULINE].[MB001]=[PRODUCTCHECK].[MB001] WHERE  [MANU] IN('新廠製二組','新廠製一組')  AND CONVERT(varchar(100),[MANUDATE],112) LIKE +''+CONVERT(NVARCHAR,GETDATE(),112)+'%' ORDER BY [MANUDATE],[MANU],[SERNO] ";

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