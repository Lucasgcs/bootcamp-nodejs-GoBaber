const server = require('./server')

/* Caso exista a variavel PORT setada (porta especifica) executa
 * Se não, porta 3000
 */
server.listen(process.env.PORT || 3000)
