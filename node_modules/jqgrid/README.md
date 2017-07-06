# jqgrid [![spm version](http://spmjs.io/badge/jqgrid)](http://spmjs.io/package/jqgrid)

---

jQuery grid plugin

## Install

```
$ npm install jqgrid --save
```

## 修改
+ 将`jquer.jqGrid.src.js,同时将已有的i18n封装`封装:
```js
    module.exports = function(jQuery) {
        @jquer.jqGrid.src.js
    };
```
## Usage

```js
var $ = require('jquery');
require('jquery-ui')($);
require('jqgrid')($);
require('jqgrid-cn')($);
// use jqgrid
```

````html
<!doctype html>
<html>
<head>
  <title> ztree demo </title>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <link href="/dist/jquery-ui/1.11.1/themes/smoothness/jquery-ui.css" rel="stylesheet">
  <link href="/dist/jqgrid/4.6.0/css/ui.jqgrid.css" rel="stylesheet">

  <script src="http://cdn.staticfile.org/seajs/2.3.0/sea.js"></script>
    <script type="text/javascript">
    <!--
        seajs.config({
            base: '/dist',
            alias: {
              'jquery': 'jquery/2.1.1/jquery-debug',
              'jquery-ui':'jquery-ui/1.11.1/jquery-ui-debug',
              'jqgrid': 'jqgrid/4.6.0/jquery.jqGrid-debug',
              'jqgrid-cn': 'jqgrid/4.6.0/js/i18n/grid.locale-cn-debug',
            }
        });
    seajs.use(['jquery','jquery-ui','jqgrid','jqgrid-cn'],function($,ui,jqgrid,cn) {
      ui($);
      jqgrid($);
      cn($);

      $("#list4").jqGrid({
      datatype: "local",
      height: 250,
         colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
         colModel:[
           {name:'id',index:'id', width:60, sorttype:"int"},
           {name:'invdate',index:'invdate', width:90, sorttype:"date"},
           {name:'name',index:'name', width:100},
           {name:'amount',index:'amount', width:80, align:"right",sorttype:"float"},
           {name:'tax',index:'tax', width:80, align:"right",sorttype:"float"},
           {name:'total',index:'total', width:80,align:"right",sorttype:"float"},
           {name:'note',index:'note', width:150, sortable:false}
         ],
         multiselect: true,
        rowNum:10,
         rowList:[5,8,10],
        pager:"prowed1",
         caption: "Manipulating Array Data",
    });
    $("#list4").jqGrid('navGrid',"#prowed1",{edit:false,add:false,del:false});
    var mydata = [
        {id:"1",invdate:"2007-10-01",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
        {id:"2",invdate:"2007-10-02",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
        {id:"3",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
        {id:"4",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
        {id:"5",invdate:"2007-10-05",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
        {id:"6",invdate:"2007-09-06",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
        {id:"7",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
        {id:"8",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
        {id:"9",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
        {id:"10",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
        {id:"11",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
        {id:"12",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
        {id:"13",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
        {id:"14",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
        {id:"15",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
        {id:"16",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
        {id:"17",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"}
        ];
      for(var i=0;i<=mydata.length;i++)
        $("#list4").jqGrid('addRowData',i+1,mydata[i]);
    });
    //-->
  </script>
</head>
<body>
  <table id="list4"></table>
  <div id="prowed1"></div>
</body>
</html>
````
