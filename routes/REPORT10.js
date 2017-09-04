var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
   res.render('REPORT10', { title: 'REPORT10',p1:'',p2:'' ,data:''}); 

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
            var SQL;
            var SQLQUERY;
            var request = new sql.Request();

            if(req.body.selectpickercheck=="0")
            {

                SQLQUERY=" AND TH020='N' ";
            }
            else  if(req.body.selectpickercheck=="1")
            {

                SQLQUERY=" AND TH020='Y' ";
            }
            else  if(req.body.selectpickercheck=="2")
            {

                SQLQUERY=" ";
            }

            if(req.body.selectpicker=="0")
            {
                SQL="SELECT TH004 AS '品號',TH005 AS '品名',CONVERT(real, SUM(TH008)) AS '數量',CONVERT(real, SUM(TH024)) AS '贈品',TH009 AS '單位',CONVERT(real, SUM(TH013)) AS '金額' FROM [TK].dbo.COPTG,[TK].dbo.COPTH WHERE TG001=TH001 AND TG002=TH002 AND (TG001='A233'  OR (TG001='A230'  AND TG006  IN ('160092','170007') )) AND TG003>='"+req.body.date1+"' AND TG003<='"+req.body.date2+"' " +SQLQUERY+"  GROUP BY TH004,TH005,TH009 ORDER BY SUM(TH013) DESC";
            }
            else if(req.body.selectpicker=="1")
            {
                SQL="SELECT TH004 AS '品號',TH005 AS '品名',CONVERT(real, SUM(TH008)) AS '數量',CONVERT(real, SUM(TH024)) AS '贈品',TH009 AS '單位',CONVERT(real, SUM(TH013)) AS '金額' FROM [TK].dbo.COPTG,[TK].dbo.COPTH WHERE TG001=TH001 AND TG002=TH002 AND (TG001='A233' ) AND TG003>='"+req.body.date1+"' AND TG003<='"+req.body.date2+"' " +SQLQUERY+"  GROUP BY TH004,TH005,TH009 ORDER BY SUM(TH013) DESC";
            }
            else if(req.body.selectpicker=="2")
            {
               SQL="SELECT TH004 AS '品號',TH005 AS '品名',CONVERT(real, SUM(TH008)) AS '數量',CONVERT(real, SUM(TH024)) AS '贈品',TH009 AS '單位',CONVERT(real, SUM(TH013)) AS '金額' FROM [TK].dbo.COPTG,[TK].dbo.COPTH WHERE TG001=TH001 AND TG002=TH002 AND (TG001='A230'  AND TG006  IN ('160092','170007') ) AND TG003>='"+req.body.date1+"' AND TG003<='"+req.body.date2+"' " +SQLQUERY+"  GROUP BY TH004,TH005,TH009 ORDER BY SUM(TH013) DESC";
            }
            

            // query to the database and get the records
            request.query(SQL
                , function (err, recordset) {
                    if (err) console.log(err)
                    else {
                        var myData = [];

                        for(i=0;i<recordset.recordsets[0].length;i++) {                           
                             myData.push(recordset.recordsets[0][i]);  
                        }                        

                         res.render('REPORT10',{p1:req.body.date1,p2:req.body.date2,data:myData});

                        sql.close();
                    }
                });
        });
});









module.exports = router;