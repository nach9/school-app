// const Sequelize = require('sequelize')
const express = require('express')
const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const teachers = require('./routes/teachers')
const subjects = require('./routes/subjects')
const students = require('./routes/students')

var ejs = require('ejs')
app.set('view engine','ejs')

  app.get('/', function (req, res) {
    res.send('Hello World!')
  })

  app.use('/teachers', teachers);
  app.use('/subjects', subjects);
  app.use('/students', students);


  app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })
