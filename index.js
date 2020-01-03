express = require("express")
bodyParser = require("body-parser")
fs = require("fs")
mysql = require("mysql")
ping = require("./ping.js")
app = express()
port = process.env.PORT || 0
var con = mysql.createPool({
  host: "remotemysql.com",
  user: process.env.Username,
  password: process.env.Password,
  database:process.env.Username
});

con.getConnection(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static("public"))

app.get('/',(req,res)=>{
  fs.createReadStream("public/index.html").pipe(res)
})
app.post('/',(res,req)=>{
  replco = res.body.url
    replco = replco.search("repl.co")
    if(replco == -1){
      req.end("notrepl")
      return
    }
    url = res.body.url
    url = url.replace("https://","")
    url = url.replace("http://","")
    url = url.replace(" ","")
    con.query(`SELECT * FROM Repls WHERE Url = ${mysql.escape(url)}`,(err,result)=>{
      if(err){
        req.end("error")
        console.log(err)
        return
      }
      if(result[0] != undefined){
        req.end("ERR_ALREADY_ON_SYSTEM")
        return
      }
      con.query(`INSERT INTO Repls (Url) VALUES (${mysql.escape(url)})`,function(err){
        if(err){
          req.end("error")
          console.log(err)
          return
        }
        req.end("success")
      })
    })
})
app.listen(port,(err)=>{
  if(err){
    console.log(err)
    return
  }
  console.log(`Listening on port ${port}`)
})