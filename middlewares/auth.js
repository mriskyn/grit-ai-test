const jwt = require('jsonwebtoken')

exports.authentication = (req, res, next) => {
  const token = req.headers.token

  if (!token) {
    return res.status(403).json({
      message: 'Required token'
    })
  }

  const data = jwt.verify(token, process.env.SECRET_KEY)
  console.log({data})

  req.user = data

  next()
}

exports.authorization = (role) => {
  return (req, res, next) => {
    if (role !== req?.user.role) {
      return res.status(401).json({
        message: 'Unauthorized user'
      })
    }
    next()
  }
}