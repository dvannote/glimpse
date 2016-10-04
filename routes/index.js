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
var flickr = require("flickrapi"),
    flickrOptions = {
        api_key: "a17c6a5fadc32351ab403086ff9dcce1",
        secret: "72798014d0f72e4d",
        user_id: "143989775@N06"
        // FLICKR_ACCESS_TOKEN: "72157673534760490-23dbf88abf3ac111",
        // FLICKR_ACCESS_TOKEN_SECRET: "9363ae4af815127f"
    };

flickr.authenticate(flickrOptions, function(error, flickr) {
    flickr.photos.search({
        lat: 38.6081376,
        lon:-89.82540069999999,
        accuracy: 11,
        page: 1,
        per_page: 500
    }, function(err, result) {
        if(err) throw err;
        console.log(JSON.stringify(result.photos.photo[3]));
    });
});



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
});


module.exports = router;
