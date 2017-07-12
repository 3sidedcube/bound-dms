const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = express.Router()
const path = require('path')
const validator = require('express-validator')
const history = require('connect-history-api-fallback')
const auth = require('./server/routes/auth')
const userRoutes = require('./server/routes/user')
const authService = require('./server/services/auth')()

// express config
app.use(history({
  rewrites: [{
    from: '/api',
    to: (context) => {
      return context.parsedUrl.pathname
    }
  }]
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(authService.initialize())
app.use(validator())
app.set('port', process.env.PORT || 8000)

app.use(express.static(path.join(__dirname, 'dist')))

// register api routes
router.get('/', (req, res) => {
  res.status(200).json({success: true})
})
router.use('/auth', auth)
router.use('/users', userRoutes)
app.use('/api', router)

// register global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    status: res.statusCode,
    message: err.message
  })
})

// start server
app.listen(app.get('port'), function () {
  console.log('Server started on port', app.get('port'))
})

module.exports = app
