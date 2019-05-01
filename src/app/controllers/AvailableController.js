// Utilizado para controlar datas no JavaScript
const moment = require('moment')

// Operadores do sequelize
const { Op } = require('sequelize')

const { Appointment } = require('../models')

class AvailableController {
  async index (req, res) {
    const date = moment(parseInt(req.query.date))

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.provider,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    })

    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00'
    ]

    /* Percorre o array para poder separar hora e minuto
     * Define Value setando corretamente o horário selecionado
     * pelo usuário utilizando os valores pré definidos
     * se usuario for selecionar algo às 14:15 .. será definido que
     * o horário seja 14:00
     *  */

    const available = schedule.map(time => {
      const [hour, minute] = time.split(':')
      const value = date
        .hour(hour)
        .minute(minute)
        .second(0)

      return {
        time,
        value: value.format(),
        available:
          value.isAfter(moment()) &&
          !appointments.find(a => moment(a.date).format('HH:mm') === time)
      }
    })
    console.log(available)
    return res.render('available/index', { available })
  }
}

module.exports = new AvailableController()
