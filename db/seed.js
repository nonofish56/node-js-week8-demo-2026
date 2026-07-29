/**
 * Seeder —— 種一點資料，證明表真的能用。
 * 規則：可重複執行（先清空、再種入），跑兩次資料不會翻倍。
 * 執行順序：一定要先 npm run migration:run（表都還沒有，種什麼）
 */
const { dataSource } = require('./data-source')

/** 清空：被 FK 指著的表最後刪（先刪 COURSE，再 USER / SKILL）。 */
async function clearAll() {
  for (const name of ['Course', 'User', 'Skill', 'CreditPackage']) {
    if (dataSource.hasMetadata(name)) {
      await dataSource.createQueryBuilder().delete().from(name).execute()
    }
  }
}

async function main() {
  await dataSource.initialize()
  await clearAll()

  // TODO：種資料
  //   1. 先種「被指著」的表：SKILL 三筆（重訓、瑜珈、飛輪）、USER 兩位教練
  //   2. 再種 COURSE 四堂課——relation 直接塞整個物件：
  //      courseRepo.save({ name: '...', User: 教練, Skill: 技能 })
  //   3. CreditPackage 三筆

  console.log('🌱 seed 完成')
  await dataSource.destroy()
}

main().catch((e) => { console.error('seed 失敗：', e.message); process.exit(1) })
