'use strict';
const saltGenerate = require('../helpers/generateSalt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt:{
      type:DataTypes.STRING ,
      allowNull:false ,
      unique: {
                args: true,
                msg: 'same salt'
              }
    }

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }

  });

  User.beforeCreate((user,option)=>{
    console.log('before',user);
    let condition = {
      where:{salt:user.salt}
    }
    User.findOne(condition).then(dataUser=>{
      if(dataUser){
        user.salt=saltGenerate()
        console.log('after',user);
      }
    })
  })

  return User;
};
