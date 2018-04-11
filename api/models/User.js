'use strict'

const Sequelize = require('sequelize');
const { app, sequelize }  = require('../../app')

let { BOOLEAN, INTEGER, STRING, TEXT } = Sequelize

const User = sequelize.define('user', {

  firstname: {
    type: STRING,
  },
  lastname: {
    type: STRING,
  },
  email: {
    type: STRING,
    allowNull: false
  },
  password: {
    type: STRING,
  },
}, { underscored: true, });
User.sync()
module.exports = User;
