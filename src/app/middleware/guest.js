// Controla se o usuário já está logado não deixa voltar para o login
module.exports = (req, res, next) => {
  if (req.session && !req.session.user) {
    return next()
  }

  return res.redirect('/app/dashboard')
}
