var express = require('express');
var router = express.Router();

router.get('/', (req, res, next)=>{
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req,res){
  res.render('register');
});

router.get('/login', function(reg,res) {
  res.render('login');
});

module.exports = router;
