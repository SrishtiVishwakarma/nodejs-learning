const express=require("express");
const http=require("http");

const app=express();

app.get("/",(req,res)=>{
 return res.send("hello from home page");
})

// app.get("/about",(req,res)=>{
//  return res.send("hello from About  page");
// })

app.get("/about",(req,res)=>{
 return res.send("hello from About  page  " + req.query.name);
})




app.listen(8002,()=>{
  console.log("Server started");
})