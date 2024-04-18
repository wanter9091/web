var express=require('express');
var app=express();

//ejs
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

//bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); 
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/result', (req,res)=>{
    var val1=req.query.val1;
    var val2=req.query.val2;
    res.render('result',{'val1':val1,'val2':val2});
})

app.listen(3000, ()=>{
    console.log('3000포트 서버 시작');
})