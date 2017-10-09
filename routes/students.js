const express = require('express')
const app = express()
const router = express.Router();

const Models = require('../models')

router.use((req,res,next)=>{
  if(req.session && req.session.hasOwnProperty('username')  ){
    if (['headmaster','academic','teacher'].indexOf(req.session.role)!=-1){
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
    order:[['first_name','ASC']]
  }
  Models.Student.findAll(condition).then(dataStudents => {
    res.render('students' , { dataStudents:dataStudents , sessionrole : req.session.role })
  })
});

router.get('/add' , (req,res)=>{
  res.render('students_add',{sessionrole : req.session.role})
})

router.post('/add' , (req,res)=>{
  Models.Student.create(req.body).then(()=>{
    res.redirect('../students')
  }).catch((msg)=>{
    // req.flash("messages", { "success" : "Sign Up Success" });
    // res.write("<script>alert('Exception: ')</script>");
    console.log('psn err' ,msg);
  })
})

router.get('/edit/:id' , (req,res)=>{
  Models.Student.findById(req.params.id).then((dataStudents)=>{
    res.render('students_edit', { dataRow :dataStudents ,sessionrole : req.session.role  })
  })
})

router.post('/edit/:id' , (req,res)=>{
  console.log(req.body);
  Models.Student.update(req.body,{ where:req.params}).then(()=>{
    res.redirect('../../students')
  }).catch(err=>{
    res.redirect('../../students')
  })
})

router.get('/delete/:id' , (req,res)=>{
  Models.Student.findById(req.params.id).then((dataStudents)=>{
    res.render('students_delete', { dataRow:dataStudents,sessionrole : req.session.role  })
  })
})

router.post('/delete/:id' , (req,res)=>{
  Models.Student.destroy({ where:{id:req.params.id}}).then(()=>{
    res.redirect('../../students')
  })
})

router.get('/:id/addsubject' , (req,res)=>{
  Promise.all([
    Models.Student.findById(req.params.id) ,
    Models.Subject.findAll()
  ]).then(dataStudent=>{
    res.render('students_addSubject' , { dataStudent : dataStudent[0] , dataSubjects : dataStudent[1],sessionrole : req.session.role})
  })
})

router.post('/:id/addsubject' , (req,res)=>{
  let condition = {
    StudentId : req.params.id,
    SubjectId : req.body.SubjectId
  }
  Models.Student_Subject.create(condition).then(()=>{
    res.redirect('../../students')
  })
})





module.exports = router;
