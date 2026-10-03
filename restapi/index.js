

const express= require("express");
const app=express();
// const users=require("./MOCK_DATA.json");
const port=8000;
const fs=require("fs");
const mongoose=require("mongoose");
const { timeStamp } = require("console");

mongoose.connect('mongodb://127.0.0.1:27017/node-db')
.then(()=>{console.log("Mongodb connected")})
.catch((err)=>{
  console.log("error",err)
});
const userSchema= new mongoose.Schema({
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  jobtitle:{
    type:String,
  },
  gender:{
    type:String,
  }

}, {timestamps:true}
)

const User= mongoose.model("user",userSchema);






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


app.get("/users", async(req,res)=>{
const allDbUsers= await User.find({})
  const html = `<ul> ${allDbUsers.map((user) => `<li> ${user.firstname}- ${user.email} </li>`).join('')} </ul>`;
 return res.send(html);
});

app.get("/api/users", async(req,res)=>{
  const allDbUsers= await User.find({})
 return res.json(allDbUsers);
})

app.get("/api/users/:id",(req,res)=>{
  const id= Number(req.params.id);
  const user= users.find((user)=> user.id===id);

  return res.json(user);
})

//another way

app
.route("/api/users/")
.post( async(req,res)=>{
  const body=req.body;
// if(!body ||!body.first_name || !body.last_name || !body.email || !body.gender || !body.job){
//   return res.status(400).json({msg:"all fields req.."});
// }

const result=await User.create({
  firstname:body.first_name,
  lastname:body.last_name,
  email:body.email,
  jobtitle:body.job,
  gender:body.gender,
});

return res.status(201).json({msg:"success"})





//   users.push({...body, id:users.length +1})
//   fs.writeFile("./MOCK_DATA.json",JSON.stringify(users), (err,data)=>{
// return res.json({status:"success", id:users.length});
//   })
  
})


app.listen(port,()=>{
  console.log("server strated at ", port);
})