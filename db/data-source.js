require('dotenv').config()
const { DataSource } = require('typeorm')

// TODO：把你寫好的 entity require 進來，然後加進下方的 entities 陣列

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5434),
  username: process.env.DB_USERNAME || 'student',
  password: process.env.DB_PASSWORD || 'student666',
  database: process.env.DB_DATABASE || 'livefit_demo',

  // ⚠️ 鐵律：synchronize 固定為 false，將 ORM 自動同步結構關閉，避免它動到正式資料；結構一律走 Migration
  synchronize: false,

  entities: [
    // TODO: 你的 entities
  ],
  migrations: ['db/migrations/*.js'],
})

module.exports = { dataSource }
