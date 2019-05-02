const moment = require('moment')

const { Op } = require('sequelize')
const { Appointment, User } = require('../models')

class AgendaController {
  async index (req, res) {
    const agenda = await Appointment.findAll({
      include: [{ model: User, as: 'User' }],
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.gt]: [moment().format()]
        }
      }
    })

    return res.render('agenda/index', { agenda })
  }
}

module.exports = new AgendaController()
