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
function server(res,req){
  if(res.url == "/" && res.method == "GET"){
    fs.createReadStream("./index.html").pipe(req)
  }else if(res.url == "/script.js" && res.method == "GET"){
    fs.createReadStream("./script.js").pipe(req)
  }else if(res.url == "/" && res.method == "POST"){
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
  }else if(res.url == "/style.css" && res.method == "GET"){
    req.writeHead(200,{"Content-Type":"text/css"})
    fs.createReadStream("./style.css").pipe(req)
  }
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(server)
app.listen(port,(err)=>{
  if(err){
    console.log(err)
    return
  }
  console.log(`Listening on port ${port}`)
})