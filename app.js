// const Sequelize = require('sequelize')
const express = require('express')
const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const teachers = require('./routes/teachers')
const subjects = require('./routes/subjects')
const students = require('./routes/students')
const index = require('./routes/index')

var ejs = require('ejs')
app.set('view engine','ejs')

  app.get('/',(req,res)=>{
    res.redirect('/index')
  })

  app.use('/index', index);
  app.use('/teachers', teachers);
  app.use('/subjects', subjects);
  app.use('/students', students);


  app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })
