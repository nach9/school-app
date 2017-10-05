const express = require('express')
const app = express()
const router = express.Router();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



const Models = require('../models')

router.get('/', function(req, res) {
  Models.Teacher.findAll().then(dataTeachers => {
    res.render('teachers' , { dataTeachers:dataTeachers })
})

});

module.exports = router;
