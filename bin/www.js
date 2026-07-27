require('dotenv').config()
const http = require('http')
const app = require('../app')
const { dataSource } = require('../db/data-source')

const port = process.env.PORT || 3000
const server = http.createServer(app)

server.listen(port, async () => {
  try {
    await dataSource.initialize()   // 先接上資料庫，才開始服務
    console.log('資料庫連線成功')
    console.log(`伺服器運作中：http://localhost:${port}`)
  } catch (error) {
    console.error(`資料庫連線失敗：${error.message}`)
    process.exit(1)
  }
})
