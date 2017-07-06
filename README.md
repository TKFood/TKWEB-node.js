This example is used Express and Passport to implement authenticate local users, using a username and password in /db/users.js record.

You can modify /db/users.js to add/del users.

TAHNK example from https://github.com/passport/express-4.x-local-example

To install this example on your computer, clone the repository and install dependencies.

$ git clone https://github.com/TKFood/TKWEB.git
$ cd TKWEB
$ npm install
Start the server.

$ node server.js

Open a web browser and navigate to [http://localhost:3000/](http://127.0.0.1:3000/)
to see the example in action.  Log in using username `j` and password `j`.

這個專案主要是用node.js來寫報表系統，
主要功能有以下說明:
1-登入用passort，是直接讀取db\內的「users.js」，而非取資料庫
2-報表來源是用mssql
3-查詢出資料後，用html的table呈現

相關程式碼考github範例
https://github.com/passport/express-4.x-local-example
