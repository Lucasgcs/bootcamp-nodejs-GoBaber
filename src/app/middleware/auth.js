module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // variavel disponivel para todo o app
    res.locals.user = req.session.user

    return next()
  }

  return res.redirect('/')
}
