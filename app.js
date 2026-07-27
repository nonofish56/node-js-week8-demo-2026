const express = require('express')
const cors = require('cors')
const path = require('path')
const pinoHttp = require('pino-http')

const logger = require('./utils/logger')('App')
const creditPackageRouter = require('./routes/creditPackage')
const coursesRouter = require('./routes/courses')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(pinoHttp({
  logger,
  serializers: {
    req (req) {
      req.body = req.raw.body
      return req
    }
  }
}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/healthcheck', (req, res) => {
  res.status(200)
  res.send('OK')
})
app.use('/api/credit-package', creditPackageRouter)
app.use('/api/courses', coursesRouter)

// 404：前面的路由都沒接到
app.use((req, res) => {
  res.status(404).json({ status: 'failed', message: '無此路由' })
})

// 錯誤處理 middleware（W4 教過：四個參數的那位）
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  req.log.error(err)
  res.status(500).json({ status: 'error', message: '伺服器錯誤' })
})

module.exports = app
