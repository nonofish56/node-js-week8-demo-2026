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
  //   1. 先種「被指著」的表：SKILL 三筆（拳擊、游泳、皮拉提斯）、USER 兩位教練
  //   2. 再種 COURSE 四堂課——relation 直接塞整個物件：
  //      courseRepo.save({ name: '...', user: 教練物件, skill: 技能物件 })
  //   3. CreditPackage 三筆

  console.log('🌱 seed 完成')
  await dataSource.destroy()
}

main().catch((e) => { console.error('seed 失敗：', e.message); process.exit(1) })
