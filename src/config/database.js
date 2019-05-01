/* Exporta as configurações do banco de dados
 * tipo de banco, host, user e pass, nome do banco
 * operatorAliases-permite passar mais algumas informações
 * cria campos de data (criação, modificação)
 * permite utilizar underscore(sublininhado) nos nomes
 * de campos e tabelas
 */
module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'docker',
  password: 'docker',
  database: 'gonodemodulo2',
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
