var express = require('express');
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const path = require('path');
var multer  = require('multer');
var parseString = require('xml2js').parseString;

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname+'/upload'));
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '.jpg');
    }
});

var upload = multer({ storage: storage });
var router = express.Router();

var fs = require('fs');
var photo = [];
var coords = {};
var lat;
var lon;
var title;
var photo;

router.get('/', (req, res, next)=>{
    res.render('index', { title: 'glimpse' });
});

router.get('/home', (req, res, next)=>{
    res.render('home', {p:JSON.parse(photo),lat,lon});
});

router.get('/privacyPolicy', (req, res, next)=>{
    res.render('privacyPolicy', { title: 'glimpse privacy policy' });
});

router.post('/getLocation', function(req, res){
    lat = req.body.lat;
    lon = req.body.lon;
    var flickr = require("flickrapi"),
        flickrOptions = {
            api_key: "a17c6a5fadc32351ab403086ff9dcce1",
            secret: "72798014d0f72e4d",
            user_id: "143989775@N06",
            access_token: '72157673534760490-23dbf88abf3ac111',
            access_token_secret: '9363ae4af815127f'
        };

    flickr.authenticate(flickrOptions, function(error, flickr) {
        flickr.photos.search({
            lat: lat,
            lon: lon,
            accuracy: 11,
            radius:5,
            page: 1,
            per_page: 1000,
            safe_search: 2,
        }, function(err, result) {
            if(err) throw err;
            photo = (JSON.stringify(result.photos.photo));
        });
    });
});


router.post('/uploadPhoto', upload.single('imgInp'), function(req, res){
    var Flickr = require("flickrapi"),
        FlickrOptions = {
            api_key: "a17c6a5fadc32351ab403086ff9dcce1",
            secret: "72798014d0f72e4d",
            user_id: "143989775@N06",
            access_token: '72157673534760490-23dbf88abf3ac111',
            access_token_secret: '9363ae4af815127f'
        };



    Flickr.authenticate(FlickrOptions, function(error, flickr) {
        var uploadOptions = {
            photos: [{
                title: "test",
                photo: '../routes/upload/imgInp.jpg'
            }]
        };

        console.log(JSON.stringify(uploadOptions.photos[0].photo));

        Flickr.upload(uploadOptions, FlickrOptions, function(err, result) {
            if(err) {
                return console.error(error);
            }
            console.log("photos uploaded", JSON.stringify(result));
        });
    });

    res.end('IT\'S WORKING');
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
        console.log(typeof photo);
        res.render('home',{p:JSON.parse(photo),lat,lon});
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
    res.redirect('/home')
});


router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
});


module.exports = router;
