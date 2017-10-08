const express = require('express')
const app = express()
const router = express.Router();
const Sequelize = require('sequelize')


var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Models = require('../models')

router.get('/', function(req, res) {
  let condition ={
    include : [{ model : Models.Teacher}]
  }
  Models.Subject.findAll(condition).then(dataSubjects => {
    res.render('subjects' , { dataSubjects:dataSubjects })
  })
});

router.get('/:id/enrolledstudents' , (req,res)=>{
  let condition ={
    include : [{ model : Models.Student}],
    order :[[Sequelize.literal("first_name"), 'ASC']]
  }
  Models.Subject.findById(req.params.id,condition).then(dataSubject=>{
    // res.send(dataSubject)
    res.render('students_enrolledstudents', {dataSubject:dataSubject})
  })
})

router.get('/:id/:StudentId/givescore',(req,res)=>{
  Promise.all([
    Models.Student.findById(req.params.StudentId),
    Models.Subject.findById(req.params.id)
  ]).then(dataStudent=>{
    res.render('students_givescore', {dataStudent:dataStudent[0] , dataSubject:dataStudent[1]})
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
