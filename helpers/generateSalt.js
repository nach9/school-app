function saltGenerate(){
  let acak = '0123456789abcdefghijklmnopqrstuvwxyz'
  let salt=''
  while(salt.length<8){
    salt+=acak[Math.floor(Math.random()* acak.length)]
  }
  return salt

}

module.exports = saltGenerate;
