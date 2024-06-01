//express
var express=require('express');
var app=express();

//ejs
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

//bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); 
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//post
app.use(express.urlencoded({extened: true}));

//router
var indexRouter=require('./router');
var resultRouter=require('./router/result');

app.use('/', indexRouter);// 괄호 안을 /a로 하면 http://localhost:3000/a로 들어가야 index가 열림
app.use('/', resultRouter);

//upload
var uploadRouter = require('./router/upload');
app.use('/', uploadRouter);

//jquery
app.use('/js', express.static(__dirname+'/node_modules/jquery/dist'));



app.listen(3000, ()=>{
    console.log('3000포트 서버 시작');
})