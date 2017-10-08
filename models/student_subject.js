'use strict';
const scoreToLetter = require('../helpers/scoreToLetter');
module.exports = (sequelize, DataTypes) => {
  var Student_Subject = sequelize.define('Student_Subject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  // Student_Subject.associate = function(models){
  //   Student_Subject.belongsToMany(models.Student)
  //   Student_Subject.belongsToMany(models.Subject)
  // }
  Student_Subject.prototype.getScoreToLetter = function() {

    return scoreToLetter(this.score);

}
  return Student_Subject;
};
