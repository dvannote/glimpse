var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', (req, res, next)=>{
  res.render('index', { title: 'Express' });
});

router.get('/register', (req, res, next)=>{
    res.render('index');
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
            password: password
        });

        User.createUser(newUser, function (err, user) {
            if (err) throw err;
            console.log(user);
        });

        res.redirect('/')
    } else {
        res.render('/', {
            errors: errors
        });
    }
});

router.get('/login', function(reg,res) {
  res.render('login');
});

module.exports = router;
