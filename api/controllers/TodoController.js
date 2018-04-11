'use strict'

const app = require('../../api')

class TodoController {


  /**
   * Get logged in users' all to-do list
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getAll(req, res) {

    try {

      let todo = await app.model.Todo.findAll({ where: { user_id: req.user.id } })
      return res.json({ flag: true, data: todo, message: 'success', code: 200 })
    }
    catch(e) {
      return res.json({ flag: false, data: {}, message: e.message, code: 500 })
    }
  }

  /**
   * Create a to-do of logged in user
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async create(req, res) {

    let model = req.body;
    if(!model || !model.title) {
      return res.json({ flag: false, data: {}, message: 'Missing parameter', code: 500 })
    }

    try {

      model.user_id = req.user.id
      let todo = await app.model.Todo.create(model)
      return res.json({ flag: true, data: todo, message: 'success', code: 200 })
    }
    catch(e) {
      return res.json({ flag: false, data: {}, message: e.message, code: 500 })
    }
  }

  /**
   * Update a to-do of logged in user
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async update(req, res) {

    let { id } = req.params
    let model = req.body

    try {

      let todo = await app.model.Todo.find({ where: { id, user_id: req.user.id } })
      if(!todo) throw new Error('Todo does not exists')
      await app.model.Todo.update(model, { where: { id } })
      return res.json({ flag: true, data: todo, message: 'success', code: 200 })
    }
    catch(e) {
      return res.json({ flag: false, data: {}, message: e.message, code: 500 })
    }
  }

  /**
   * Delete a to-do of logged in user
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async destroy(req, res) {

    let { id } = req.params

    try {

      let todo = await app.model.Todo.find({ where: { id, user_id: req.user.id } })
      if(!todo) throw new Error('Todo does not exists')


      await app.model.Todo.destroy({ where: { id } })
      return res.json({ flag: true, data: todo, message: 'success', code: 200 })
    }
    catch(e) {
      return res.json({ flag: false, data: {}, message: e.message, code: 500 })
    }
  }
}

module.exports = new TodoController()
