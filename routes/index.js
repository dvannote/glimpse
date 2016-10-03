var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local');

router.get('/', (req, res, next)=>{
    res.render('index', { title: 'glimpse' });
});

router.get('/privacyPolicy', (req, res, next)=>{
    res.render('privacyPolicy', { title: 'glimpse privacy policy' });
});

function ensureAuthenticate(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.render('/');
    }
}


router.post('/register', function(req,res){
    var username = req.body.username;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    //Validations
    req.checkBody('username', 'Name is required').notEmpty();
    req.checkBody('firstName', 'First Name is required').notEmpty();
    req.checkBody('lastName', 'Last Name is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (!errors) {
        var newUser = new User({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });

        User.createUser(newUser, function (err, user) {
            if (err) throw err;
            console.log(user);
        });

        res.render('home');
    } else {
        res.render('/', {
            errors: errors
        });
    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function(err, isMatch){
                if (err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login', passport.authenticate('local'), function(req,res) {

    res.render('home');
});


router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
})

module.exports = router;
