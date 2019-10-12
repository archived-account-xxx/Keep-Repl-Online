mysql = require("mysql")
x = 0
request = require("request")
var con = mysql.createPool({
  host: "remotemysql.com",
  user: process.env.Username,
  password: process.env.Password,
  database:process.env.Username
});

con.getConnection(function(err) {
  if (err) throw err;
  console.log("Connected to database on ping file!");
});
setInterval(function(){
  con.query("SELECT * FROM Repls",(err,result)=>{
    if(err){
      console.log("error")
      return
    }
    count = result.length
    for (i = 0; i < count; i++) {
      if(result[x] == undefined){
        break
      }
      request("https://" + result[x].Url,function(err){
        if(err){
          console.log("error")
          return
        }
        console.log(`Pinged: ${result[x].Url}`)
        x = x + 1
      })
}
x = 0
  })
},1000)