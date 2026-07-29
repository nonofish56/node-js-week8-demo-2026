const { DataSource } = require('typeorm')
const config = require('../config/index')

// TODO：把你寫好的 entity require 進來，加進下面的 entities 陣列
// （沒註冊的 entity，migration:generate 看不見）

const dataSource = new DataSource({
  type: 'postgres',
  host: config.get('db.host'),
  port: config.get('db.port'),
  username: config.get('db.username'),
  password: config.get('db.password'),
  database: config.get('db.database'),
  synchronize: config.get('db.synchronize'),   // ⚠️ 鐵律：.env 永遠填 false，結構一律走 Migration
  poolSize: 10,
  entities: [
    // TODO: 你的 entities
  ],
  migrations: ['db/migrations/*.js'],
  ssl: config.get('db.ssl')
})

module.exports = { dataSource }
