var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
   res.render('REPORT3', { title: 'REPORT3' }); 
});

router.post('/', function(req, res){
    //console.log('Name (from visible form field): ' + req.body.name);
    res.render('REPORTRESULT',{p1:req.body.name});
});









module.exports = router;