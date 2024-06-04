var express = require('express');
var router=express.Router();
var db = require('../lib/db');

router.use(express.urlencoded({
    extened: true
}));


router.get('/board/write', function(req,res){
    res.render('board/write');
})

router.get('/board', function(req,res){
    var sql="select * from board";
    db.query(sql, (err, rows)=>{
        res.render('board',{
            rows: rows
        });
    })
})

router.get(`/board/view/:idx`, function(req,res){
    var idx=req.params.idx;
    var sql="select * from board where idx=?";
    db.query(sql,[idx], (err, rows)=>{
        res.render('board/view',{
            result: rows[0]
        });
    })
})

router.post('/board/write', (req,res)=>{
    var writer=req.body.writer;
    var password=req.body.password;
    var title=req.body.title;
    var content=req.body.content;
    var data=[writer, password, title, content];
    var sql="insert into board(idx, writer, password, title, content, date, del_yn) values(null, ?, ? , ? , ?, now(), 'N')";
    db.query(sql, data);
    res.redirect('/board');
})

module.exports=router;