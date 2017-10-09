const express = require('express')
const app = express()
const router = express.Router();

const Models = require('../models')

router.use((req,res,next)=>{
  if(req.session && req.session.hasOwnProperty('username')  ){
    if (['headmaster'].indexOf(req.session.role)!=-1){
      next()
    }
    else{
      res.render('index')
    }
  }
  else {
    res.render('index')
  }
})

router.get('/', function(req, res) {
  let condition={
    order:[['first_name','ASC']],
    include : [{model: Models.Subject}]
  }
  Models.Teacher.findAll(condition).then(dataTeachers => {
    res.render('teachers' , { dataTeachers:dataTeachers ,sessionrole : req.session.role})
}).catch((err)=>{
  console.log(err);
})

});

router.get('/add' , (req,res)=>{
  res.render('teachers_add')
})

router.post('/add' , (req,res)=>{
  Models.Teacher.create(req.body).then(()=>{
    res.redirect('../teachers')
  }).catch((msg)=>{
    console.log('psn err' ,msg);
  })
})

router.get('/edit/:id' , (req,res)=>{
  Models.Teacher.findById(req.params.id).then((dataTeachers)=>{
    res.render('teachers_edit', { dataRow:dataTeachers ,sessionrole : req.session.role })
  })
})

router.post('/edit/:id' , (req,res)=>{
  Models.Teacher.update(req.body,{ where:req.params}).then(()=>{
    res.redirect('../../teachers')
  }).catch(err=>{
    res.redirect('../../teachers')
  })
})

router.get('/delete/:id' , (req,res)=>{
  Models.Teacher.findById(req.params.id).then((dataTeachers)=>{
    res.render('teachers_delete', { dataRow:dataTeachers ,sessionrole : req.session.role })
  })
})

router.post('/delete/:id' , (req,res)=>{
  Models.Teacher.destroy({ where:{id:req.params.id}}).then(()=>{
    res.redirect('../../teachers')
  })
})


module.exports = router;
