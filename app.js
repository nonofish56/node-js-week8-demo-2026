const express = require('express')
const cors = require('cors')

const creditPackageRouter = require('./routes/creditPackage')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/healthcheck', (req, res) => {
  res.status(200)
  res.send('OK')
})
app.use('/api/credit-package', creditPackageRouter)

// 404
app.use((req, res) => {
  res.status(404).json({ status: 'failed', message: '無此路由' })
})

// 錯誤處理
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ status: 'error', message: '伺服器錯誤' })
})

module.exports = app
