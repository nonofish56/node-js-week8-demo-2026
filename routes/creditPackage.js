const express = require('express')

const router = express.Router()
const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('CreditPackage')

// 方案列表
router.get('/', async (req, res, next) => {
  // TODO：find({ select: [...] }) → 200
})

// 新增方案
router.post('/', async (req, res, next) => {
  // TODO：驗欄位 400 → 查重複 409 → create → save → 200
})

// 刪除方案
router.delete('/:creditPackageId', async (req, res, next) => {
  // TODO：檢查 id → delete → affected === 0 回 400 'ID錯誤' → 200
})

module.exports = router
