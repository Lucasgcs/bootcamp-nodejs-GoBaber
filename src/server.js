const express = require('express')

// Lib para controlar session no express
const session = require('express-session')

// Armazenar localmente a session
const LokiStore = require('connect-loki')(session)

const nunjucks = require('nunjucks')

// Lib para lidar com caminhos do servidor
const path = require('path')

// necessário para enviar mensagens de erro ao usuário
const flash = require('connect-flash')

// Desafio - Filtro de Data para nunjucks
const dataFiltro = require('nunjucks-date-filter')

// Sintaxe que é mais fácil para organizar
class App {
  constructor () {
    // Equivalente ao APP usado no modo estruturado
    this.express = express()

    // Variavel para controle de ambiente
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    // Permite lidar com formularios
    this.express.use(express.urlencoded({ extended: false }))

    this.express.use(flash())
    this.express.use(
      session({
        name: 'root',
        store: new LokiStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions.db')
        }),
        secret: 'MyAppSecret',
        resave: false,
        saveUninitialized: true
      })
    )
  }

  views () {
    const env = nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      // Só ira assitir alterações se o ambiente for DEV
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })

    // Filtro de data
    env.addFilter('date', dataFiltro)

    // Informa onde está a pasta com arquivos estaticos
    this.express.use(express.static(path.resolve(__dirname, 'public')))

    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
