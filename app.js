'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const passport = require("passport")
app.use(passport.initialize())

const Sequelize = require('sequelize');
const { dev, prod } = require('./config/database')

const db = (process.env.NODE_ENV !== 'production') ? dev : prod

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: 'postgres',
});

module.exports = { app, sequelize }
app.listen(3000, () => {
  console.log('Server running on port 3000!')
})

require('./config');
const api = require('./api')
api.services.PassportService.initializePassport()
