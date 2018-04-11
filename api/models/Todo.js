'use strict'

const Sequelize = require('sequelize');
const { app, sequelize }  = require('../../app')

let { BOOLEAN, INTEGER, STRING, TEXT } = Sequelize

const Todo = sequelize.define('todo', {

  title: {
    type: STRING,
  },
  status: {
    type: STRING,
    defaultValue: 'pending',
  },
  user_id: {
    type: INTEGER,
  },
}, { underscored: true, });
Todo.sync()
module.exports = Todo;
