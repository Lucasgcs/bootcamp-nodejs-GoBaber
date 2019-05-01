const express = require('express')

// Controle de upload de arquivos
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

// Controle de rotas recebe os metodos HTTP
const routes = express.Router()

// Utilizando o middleware
const authMiddleware = require('./app/middleware/auth')
const guestMiddleware = require('./app/middleware/guest')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')

// Variavel global para que todas as views saibam
routes.use((req, res, next) => {
  res.locals.flashSucces = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

// Rota generica para todos os arquivos da app
routes.get('/files/:file', FileController.show)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

// Define que todas as rotas /app /utilizem o middleware
routes.use('/app', authMiddleware)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)

routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.post('/app/appointments/new/:provider', AppointmentController.store)

routes.get('/app/availables/:provider', AvailableController.index)

module.exports = routes
