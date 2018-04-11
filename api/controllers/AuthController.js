'use strict'

const app = require('../../api')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10
const jwt = require('jsonwebtoken')

class AuthController {

  /**
   * Sign up
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async signup(req, res) {

    let model = req.body;
    if(!model || !model.email || !model.password) {
      return res.json({ flag: false, data: {}, message: 'Missing parameter', code: 500 })
    }

    try {

      model.password = await bcrypt.hash(model.password, SALT_ROUNDS)
      let user = await app.model.User.create(model)
      return res.json({ flag: true, data: user, message: 'success', code: 200 })
    }
    catch(e) {
      return res.json({ flag: false, data: {}, message: e.message, code: 500 })
    }
  }

  /**
   * Login
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async login(req, res) {

    let model = req.body;
    if(!model || !model.email || !model.password) {
      return res.json({ flag: false, data: {}, message: 'Missing parameter', code: 500 })
    }

    try {

      let user = await app.model.User.find({ where: { email: model.email }, raw: true })
      if(!user) throw new Error('User does not exists.')
      let verify = await bcrypt.compare(model.password, user.password)
      if(!verify) throw new Error('Incorrect password.')

      let token = jwt.sign(user, 'secret');
      return res.json({ flag: true, data: { user, token }, message: 'success', code: 200 })
    }
    catch(e) {
      return res.json({ flag: false, data: {}, message: e.message, code: 500 })
    }
  }
}

module.exports = new AuthController()
