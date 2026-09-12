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
  const skillRepo = dataSource.getRepository('Skill')

  const skills = await skillRepo.save([
    { name: '拳擊' },
    { name: '游泳' },
    { name: '皮拉提斯' }
  ]);

  const userRepo = dataSource.getRepository('User')
  const users = await userRepo.save([
  {
    name: '張教練',
    email: 'xin@gmail.com',
    role: 'COACH'
  },
  {
    name: '李教練',
    email: 'li@gmail.com',
    role: 'COACH'
  }
])

  const courseRepo = dataSource.getRepository('Course')
  await courseRepo.save([
    {
      name: '拳擊入門',
      description: '拳擊基礎課程',
      start_at: new Date('2026-09-15 10:00:00'),
      end_at: new Date('2026-09-15 12:00:00'),
      max_participants: 10,

      user:users[0],
      skill:skills[0]
    },
    {
      name: '游泳入門',
      description: '游泳基礎課程',
      start_at: new Date('2026-09-15 10:00:00'),
      end_at: new Date('2026-09-15 12:00:00'),
      max_participants: 8,

      user:users[0],
      skill:skills[1]
    },
    {
      name: '皮拉提斯入門',
      description: '皮拉提斯基礎課程',
      start_at: new Date('2026-09-15 10:00:00'),
      end_at: new Date('2026-09-15 12:00:00'),
      max_participants: 6,

      user:users[1],
      skill:skills[2]
    },
    {
  name: '進階拳擊',
  description: '拳擊進階課程',
  start_at: new Date('2026-09-16 10:00:00'),
  end_at: new Date('2026-09-16 12:00:00'),
  max_participants: 10,

  user: users[1],
  skill: skills[0]
}
  ])

  const creditPackage = dataSource.getRepository('CreditPackage')
  await creditPackage.save([
    {
      name: '10次課程包',
      price: 1000,
      credit_amount: 10
    },
    {
      name: '20次課程包',
      price: 1800,
      credit_amount: 20
    },
    {
      name: '50次課程包',
      price: 4000,
      credit_amount: 50
    }
  ])

  console.log('🌱 seed 完成')
  await dataSource.destroy()
}

main().catch((e) => { console.error('seed 失敗：', e.message); process.exit(1) })
