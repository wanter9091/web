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
    var sql="select * from blog.board";
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

router.get(`/board/:type/:idx`, function(req,res){
    var type=req.params.type;
    var idx=req.params.idx;
    
    if (type=="modify"){
        res.render('board/auth',{
            act : "수정",
            act2 : "modify",
            idx : idx
        })
    }
    if (type=="delete"){
        res.render('board/auth',{
            act : "삭제",
            act2 : "delete",
            idx : idx
        })
    }
})

router.post(`/board/:type/:idx`, function(req,res){
    var type=req.params.type;
    var idx=req.params.idx;
    var sql="select * from board where idx=?";
    
    db.query(sql,[idx],(err,rows)=>{
        if(rows[0].password!=req.body.password){
            res.render('board/error');
        }
        else{
            if (type=="modify"){
                res.render('board/modify',{
                    target : rows[0]
                })
            }
            if (type=="delete"){
                res.render('board/delete',{
                    act : "삭제",
                    idx : idx
                })
            }
        }
        
    });
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

router.post('/board/modify/:idx/ok', function(req,res){
    var idx=req.params.idx;
    var sql="update board SET writer=?, password=?, title=?, content=?, date=now() where idx=?";
    
    var writer=req.body.writer;
    var password=req.body.password;
    var title=req.body.title;
    var content=req.body.content;

    var data=[writer,password,title,content,idx];
    console.log(data);
    db.query(sql,data);
    console.log(2);
    res.redirect('/board/view/' + idx);
    console.log(3);
})

module.exports=router;