var express=require('express');
var router=express.Router();
var db=require('../lib/db');

router.get('/', function(req,res){
    res.render('index');
})

module.exports=router;