var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
   res.render('REPORT11', { title: 'REPORT11',p1:'' ,data:''}); 

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
            var request = new sql.Request();

            SQL=" DECLARE @YEARS varchar(30)= '"+req.body.date1+"'; SELECT 今年,月份,(總合-橘點子) '總計',(WEB-蝦皮-YAHOO-PCHOME-MOMO-神坊-樂天-自游邦) AS '官網',(總合-橘點子-WEB-蝦皮-YAHOO-PCHOME-MOMO-神坊-樂天-自游邦) AS '消費者',蝦皮,MOMO,YAHOO,PCHOME,神坊,樂天,自游邦 FROM ( SELECT ID AS '月份' ,CAST(YEAR(@YEARS) AS NVARCHAR)+ID  AS  '今年' ,CONVERT(INT,ISNULL((SELECT SUM(TB004*TB007)*-1 FROM [TK].[dbo].[ACTTB] WITH (NOLOCK), [TK].[dbo].[ACTTA] WITH (NOLOCK) WHERE TA001=TB001 AND TA002=TB002 AND TA010='Y' AND TB005='411104' AND TB006 NOT IN ('106200') AND TB002 LIKE CAST(YEAR(@YEARS) AS NVARCHAR)+ID+'%'),0)) AS '總合' ,CONVERT(INT,ISNULL((SELECT SUM(TB019) FROM [TK].[dbo].[ACRTB] WITH (NOLOCK) ,[TK].[dbo].[ACRTA] WITH (NOLOCK) WHERE TA001=TB001 AND TA002=TB002 AND TA004 IN ('2209400100','11110775') AND TB002 LIKE CAST(YEAR(@YEARS) AS NVARCHAR)+ID+'%'),0))  AS '橘點子' ,CONVERT(INT,ISNULL((SELECT SUM(TH013) FROM  [TK].dbo.COPTH WITH (NOLOCK) WHERE  TH020='Y' AND TH005 NOT LIKE '%手續%'AND TH005 NOT LIKE '%運費%' AND (TH001='A233' OR TH001='A234') AND TH002 LIKE  CAST(YEAR(@YEARS) AS NVARCHAR)+ID+'%'  ),0)) 'WEB' ,CONVERt(INT,ISNULL((SELECT SUM(TB004*TB007)*-1 FROM [TK].[dbo].[ACTTB] WITH (NOLOCK) WHERE TB005='411104' AND TB006 IN ('106400','102300','114000') AND (TB010 LIKE '%蝦皮%')  AND TB002 LIKE CAST(YEAR(@YEARS) AS NVARCHAR)+ID+'%'),0))  AS '蝦皮' ,CONVERT(INT,ISNULL((SELECT SUM(TB004*TB007)*-1 FROM [TK].[dbo].[ACTTB] WITH (NOLOCK) WHERE TB005='411104' AND TB006 IN ('106400','102300','114000') AND (TB010 LIKE '%YAHOO%' OR TB010 LIKE '%yahoo%')  AND TB002 LIKE CAST(YEAR(@YEARS) AS NVARCHAR)+ID+'%'),0))  AS 'YAHOO' ,CONVERT(INT,ISNULL((SELECT SUM(TB004*TB007)*-1 FROM [TK].[dbo].[ACTTB] WITH (NOLOCK) WHERE TB005='411104' AND TB006 IN ('106400','102300','114000') AND (TB010 LIKE '%MOMO%')  AND TB002 LIKE CAST(YEAR(@YEARS) AS NVARCHAR)+ID+'%'),0))  AS 'MOMO'                 ,CONVERT(INT,ISNULL((SELECT SUM(TB004*TB007)*-1 FROM [TK].[dbo].[ACTTB] WITH (NOLOCK) WHERE TB005='411104' AND TB006 IN ('106400','102300','114000') AND (TB010 LIKE '%pc%' OR  TB010 LIKE '%Pc%'  OR  TB010 LIKE '%PC%' ) AND TB002 LIKE CAST(YEAR(@YEARS) AS NVARCHAR)+ID+'%'),0)) AS 'PCHOME' ,CONVERT(INT,ISNULL((SELECT SUM(TB004*TB007)*-1 FROM [TK].[dbo].[ACTTB] WITH (NOLOCK) WHERE TB005='411104' AND TB006 IN ('106400','102300','114000') AND (TB010 LIKE '%神坊%')  AND TB002 LIKE CAST(YEAR(@YEARS) AS NVARCHAR)+ID+'%'),0)) AS '神坊' ,CONVERT(INT,ISNULL((SELECT SUM(TB004*TB007)*-1 FROM [TK].[dbo].[ACTTB] WITH (NOLOCK) WHERE TB005='411104' AND TB006 IN ('106400','102300','114000') AND (TB010 LIKE '%樂天%')  AND TB002 LIKE CAST(YEAR(@YEARS) AS NVARCHAR)+ID+'%'),0))  AS '樂天' ,CONVERT(INT,ISNULL((SELECT SUM(TB004*TB007)*-1 FROM [TK].[dbo].[ACTTB] WITH (NOLOCK) WHERE TB005='411104' AND TB006 IN ('106400','102300','114000') AND (TB010 LIKE '%自游邦%')  AND TB002 LIKE CAST(YEAR(@YEARS) AS NVARCHAR)+ID+'%'),0))  AS '自游邦' FROM [TKECOMMERCE].dbo.BASEMONTH ) AS TEMP"

            // query to the database and get the records
            request.query(SQL
                , function (err, recordset) {
                    if (err) console.log(err)
                    else {
                        var myData = [];

                        for(i=0;i<recordset.recordsets[0].length;i++) {                           
                             myData.push(recordset.recordsets[0][i]);  
                        }                        

                         res.render('REPORT11',{p1:req.body.date1,data:myData});                    

                        sql.close();
                    }
                });
        });
});









module.exports = router;