const express = require('express')

const router = express.Router()
const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('CreditPackage')

// 招式 1：find —— 把全部組合包撈出來（SELECT 指定欄位 FROM "CREDIT_PACKAGE"）
router.get('/', async (req, res, next) => {
  // TODO（課堂）：getRepository('CreditPackage').find({ select: [...] })
})

// 招式 5：create + save —— 新增一筆組合包
// create() 只是在記憶體做物件（同步，不用 await）；save() 才寫進資料庫（要 await）
router.post('/', async (req, res, next) => {
  // TODO（課堂）：先驗欄位 → create → save → 201
})

// 招式 6：update —— 改價格（UPDATE ... SET ... WHERE id = ...）
router.patch('/:id', async (req, res, next) => {
  // TODO（課堂）：update(條件, 要改的欄位)；result.affected === 0 就回 404
})

module.exports = router
