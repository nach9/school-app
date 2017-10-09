const express = require('express')
const router = express.Router();

const Models = require('../models')

const encrypt = require('../helpers/encrypt')
const saltGenerate = require('../helpers/generateSalt')



router.get('/' , (req,res)=>{
  res.render('login' ,{ sessionrole : req.session.role })
})

router.post('/' , (req,res)=>{
  let condition1 = {
    where : { username:req.body.username  }
  }
  Models.User.findOne(condition1).then(dataUser=>{
    if(dataUser){
      if(encrypt(req.body.password,dataUser.salt)== dataUser.password){
        req.session.username=dataUser.username
        req.session.role = dataUser.role
        res.redirect('/students')
      }
    } else{
      res.redirect('/login')
    }
    console.log(req.session);
  })
})


router.get('/add' , (req,res)=>{
  res.render('login_add',{sessionrole:req.session.role})
})

router.post('/add' , (req,res)=>{
  salt = saltGenerate()
  // salt='xr391gaq'
  console.log(salt);
  let condition={
    username:req.body.username,
    password:encrypt(req.body.password,salt),
    role :req.body.role,
    salt: salt

  }
  Models.User.create(condition).then(()=>{
    res.redirect('/login')
  })
})

router.get('/out',(req,res)=>{
  res.render('logout' , {sessionrole:req.session.role})
})

router.post('/out',(req,res)=>{
  req.session.destroy()
  res.redirect('/login')
})

module.exports = router;
