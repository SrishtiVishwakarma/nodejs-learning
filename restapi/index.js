

const express= require("express");
const app=express();
const users=require("./MOCK_DATA.json");
const port=8000;
const fs=require("fs");

app.use(express.urlencoded({extended:false}));

//middleware
app.use((req,res,next)=>{
  fs.appendFile('log.txt', `\n${Date.now().toString()} , ${req.method} , ${req.path}`, (err)=>{
    if(err) console.log(err);
  });
  console.log("Hello from middleware 1");
  next();
})

// app.use((req,res,next)=>{
//   console.log("Hello from middleware 2");
//   next();
// })
// EXTRA - only for practicing multiple middleware
// You already have middleware above, so this is not required.


// app.use((req,res,next)=>{
//   console.log("Hello from middleware 3");
//   next();
// })
// EXTRA - same reason


app.get("/users",(req,res)=>{

  const html = `<ul> ${users.map((user) => `<li> ${user.first_name} </li>`).join('')} </ul>`;
 return res.send(html);
});

app.get("/api/users",(req,res)=>{
 return res.json(users);
})

app.get("/api/users/:id",(req,res)=>{
  const id= Number(req.params.id);
  const user= users.find((user)=> user.id===id);

  return res.json(user);
})

//another way

app
.route("/api/users/:id")
.post((req,res)=>{
  const body=req.body;
  users.push({...body, id:users.length +1})
  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users), (err,data)=>{
return res.json({status:"success", id:users.length});
  })
  
})


app.listen(port,()=>{
  console.log("server strated at ", port);
})