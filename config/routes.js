'use strict'

const { app } = require('../app')
const passport = require("passport")

const { controllers, models, services } = require('./../api')

app.get('/', (req, res)=> res.send('Hello!'))

app.post('/signup', controllers.AuthController.signup)
app.post('/login', controllers.AuthController.login)

app.get('/todo',  passport.authenticate('jwt', { session: false }), controllers.TodoController.getAll)
app.post('/todo', passport.authenticate('jwt', { session: false }),controllers.TodoController.create)
app.put('/todo/:id',passport.authenticate('jwt', { session: false }), controllers.TodoController.update)
app.delete('/todo/:id', passport.authenticate('jwt', { session: false }),controllers.TodoController.destroy)
