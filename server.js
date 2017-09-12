var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');
var flash = require('connect-flash');
var REPORT1 = require('./routes/REPORT1');
var REPORTINDEX= require('./routes/REPORTINDEX');
var REPORT2 = require('./routes/REPORT2');
var REPORT3 = require('./routes/REPORT3');
var REPORTRESULT = require('./routes/REPORTRESULT');
var REPORT4 = require('./routes/REPORT4');
var REPORT5 = require('./routes/REPORT5');
var REPORT10 = require('./routes/REPORT10');
var REPORT11 = require('./routes/REPORT11');
var REPORT12 = require('./routes/REPORT12');




// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});




// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use('/REPORT1',REPORT1);
app.use('/REPORTINDEX',REPORTINDEX);
app.use('/REPORT2',REPORT2);
app.use('/REPORT3',REPORT3);
app.use('/REPORTRESULT',REPORTRESULT);
app.use('/REPORT4',REPORT4);
app.use('/REPORT5',REPORT5);
app.use('/REPORT10',REPORT10);
app.use('/REPORT11',REPORT11);
app.use('/REPORT12',REPORT12);


// Define routes.
app.get('/',
  function(req, res) {
    res.render('login', { user: req.user });
  });

app.get('/login',
  function(req, res){
    res.render('login',  { message: req.flash('signupMessage') });
  });
  
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),
  function(req, res) {
    //res.redirect('/');
    
    if(req.user.username=='moc')
    {
      res.render('profile2', { user: req.user });
    }
    else if(req.user.username!='moc')
    {
      res.render('profile', { user: req.user });
    }
  });

  
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });


app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });


app.get('/profile2',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile2', { user: req.user });
  });


app.listen(3000);
