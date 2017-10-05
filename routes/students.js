const express = require('express')
const app = express()
const router = express.Router();

const Models = require('../models')

router.get('/', function(req, res) {
  Models.Student.findAll().then(dataStudents => {
    res.render('students' , { dataStudents:dataStudents })
  })
});

router.get('/add' , (req,res)=>{
  res.render('students_add')
})

router.post('/add' , (req,res)=>{
  Models.Student.create(req.body).then(()=>{
    res.redirect('../students')
  }).catch(()=>{
    console.log('error email');
  })
})

router.get('/edit/:id' , (req,res)=>{
  Models.Student.findById(req.params.id).then((dataStudents)=>{
    res.render('students_edit', { dataStudents:dataStudents  })
  })
})

router.post('/edit/:id' , (req,res)=>{
  Models.Student.update(req.body,{ where:req.params}).then(()=>{
    res.redirect('../../students')
  })
})

router.get('/delete/:id' , (req,res)=>{
  Models.Student.findById(req.params.id).then((dataStudents)=>{
    res.render('students_delete', { dataStudents:dataStudents  })
  })
})

router.post('/delete/:id' , (req,res)=>{
  Models.Student.destroy({ where:{id:req.params.id}}).then(()=>{
    res.redirect('../../students')
  })
})

module.exports = router;
