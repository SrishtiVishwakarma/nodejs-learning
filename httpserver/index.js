const http=require("http");
const fs=require("fs");
const url=require('url');


const myServer=http.createServer((req,res)=>{
 const log=`${Date.now()},${req.method},${req.url} :new request received\n`;
 const myUrl=url.parse(req.url)
 console.log(myUrl);
 if(req.url==="/favicon.ico") return res.end();
 fs.appendFile("log.txt",log ,(err,data)=>{
  switch(req.url){
    case '/': 
    if(req.method==="GET")res.end("hello from server");
    break;
    case '/about':res.end("Home page");
    break;
    case '/contact':res.end("Contact page");
    break;

    case '/signup':
       if(req.method==="GET")res.end("Signup form");
       else if(req.method==="POST"){
        //Db query
        res.end("Success");
       }
    break;

    default: res.end("404");
  }
   
 });
 

});

myServer.listen(8000,()=>{console.log("server started")})