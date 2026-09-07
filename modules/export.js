function add(a,b){
  return a+b;
}

function sub(a,b){
  return a-b;
}


// one export per file
module.exports={
  add,
  sub
}


//multiple exports per file
export default function mul(a,b){
  return a*b;
}