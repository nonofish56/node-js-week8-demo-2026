const express = require('express')

const router = express.Router()
const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('CreditPackage')

// 招式 1：find —— 把全部組合包撈出來（SELECT 指定欄位 FROM "CREDIT_PACKAGE"）
router.get('/', async (req, res, next) => {
  // TODO（課堂）：getRepository('CreditPackage').find({ select: [...] }) → 200
})

// 招式 5：create + save —— 新增一筆組合包
// create() 只是在記憶體做物件（同步，不用 await）；save() 才寫進資料庫（要 await）
router.post('/', async (req, res, next) => {
  // TODO（課堂）：守門三函式驗欄位 400 → 查重複 409 → create → save → 200
})

// 招式 6：delete —— 刪掉一個方案
router.delete('/:creditPackageId', async (req, res, next) => {
  // TODO（課堂）：檢查 id → delete → affected === 0 回 400 'ID錯誤' → 200
})

module.exports = router
