const fs= require("fs");

fs.writeFileSync('./hello.txt', "Hello world");

fs.writeFile('./hello.txt',"Hello , learning Nodejs",(err)=>{});

const result=fs.readFileSync("./hello.txt","utf-8");
console.log(result);

fs.cpSync("./hello.txt","./copy.txt",(err)=>{
  return;
});

fs.unlink("./copy.txt",(err)=>{return});

fs.appendFile("./hello.txt","/n Appending file/n",(err)=>{return});
