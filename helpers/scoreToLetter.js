const scoreToLetter= (number=>{
  if(number>0){
    if(number>85){
      return 'A'
    }
    if(number>70){
      return 'B'
    }
    if(number>55){
      return 'C'
    }
    if(number<=55){
      return 'E'
    }
  }
  else{
    return 'empty'
  }

})

module.exports = scoreToLetter;
