const express = require('express')

const router = express.Router()
const { dataSource } = require('../db/data-source')

// 招式 2：relations —— 把外來鍵指著的資料一起撈回來（JOIN 的感覺）
// 招式 3：巢狀 select —— 連 relation 裡要哪些欄位都能指定
router.get('/', async (req, res, next) => {
  // TODO（課堂）：find({ select: { ..., User: { name: true } }, relations: { User: true, Skill: true } })
})

// 招式 4：findOne —— WHERE id = ... 只拿一筆，找不到回 null
router.get('/:id', async (req, res, next) => {
  // TODO（課堂）：findOne({ where, relations })；null 就回 404
})

module.exports = router
