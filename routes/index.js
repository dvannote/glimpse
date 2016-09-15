var express = require('express');
var router = express.Router();

router.get('/', (req, res, next)=>{
  res.render('index', { title: 'Express' });
});

router.post('/signup', function(req,res){
    var un = req.body.username
    var fn = req.body.firstName;
    var ln = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    //Validations
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
});

router.get('/login', function(reg,res) {
  res.render('login');
});

module.exports = router;
