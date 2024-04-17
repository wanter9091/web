var express=require('express');
var app=express();

//bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); 
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.set('views', __dirname + '/views');
app.set('views engine', "ejs");

app.get('/', (req, res)=>{
    res.render('index.ejs',{'data':1234});
})

app.listen(3000, ()=>{
    console.log('3000포트 서버 시작');
})