'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email format is incorrect"
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Student.associate = function(models) {
    Student.belongsToMany(models.Subject, {through:models.Student_Subject})
  }
  return Student;
};
