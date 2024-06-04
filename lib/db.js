var mysql=require('mysql2');
var db=mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'blog',
    dateStrings: "date",
});
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
});

db.query('SELECT *FROM board', (err, posts) => {
    if (err) {
      console.log(err)
      console.log('posts 테이블 조회중 에러발생')
    } else {
      console.log(posts)
      console.log('======= select 완료 =======')
    }
})

module.exports=db;