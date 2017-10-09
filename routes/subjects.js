const express = require('express')
const app = express()
const router = express.Router();
const Sequelize = require('sequelize')

const Models = require('../models')

router.use((req,res,next)=>{
  if(req.session && req.session.hasOwnProperty('username')  ){
    if (['headmaster','academic'].indexOf(req.session.role)!=-1){
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
  let condition ={
    include : [{ model : Models.Teacher}]
  }
  Models.Subject.findAll(condition).then(dataSubjects => {
    res.render('subjects' , { dataSubjects:dataSubjects,sessionrole : req.session.role })
  })
});

router.get('/:id/enrolledstudents' , (req,res)=>{
  let condition ={
    include : [{ model : Models.Student}],
    order :[[Sequelize.literal("first_name"), 'ASC']]
  }
  Models.Subject.findById(req.params.id,condition).then(dataSubject=>{
    // res.send(dataSubject)
    res.render('students_enrolledstudents', {dataSubject:dataSubject,sessionrole : req.session.role})
  })
})

router.get('/:id/:StudentId/givescore',(req,res)=>{
  Promise.all([
    Models.Student.findById(req.params.StudentId),
    Models.Subject.findById(req.params.id)
  ]).then(dataStudent=>{
    res.render('students_givescore', {dataStudent:dataStudent[0] , dataSubject:dataStudent[1],sessionrole : req.session.role})
  })
})

router.post('/:id/:StudentId/givescore',(req,res)=>{
  let update = {
    score:req.body.score
  }
  let condition={
    where:{
      StudentId : req.params.StudentId,
      SubjectId : req.params.id
    }
  }
  Models.Student_Subject.update(update,condition).then(data=>{
    res.redirect('../../../subjects')
  })
})


module.exports = router;
