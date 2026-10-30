/* 币VS · TokVS 空投数据（阶段 4）
   每日更新只需改这一个文件：TOKVS_AIRDROPS 数组。
   字段：id（与 localStorage tokvs_farming 的进度键一致，勿随意改）
        name_zh / name_en        项目名
        desc_zh / desc_en        说明（含时间/资金成本与要求标注：连接钱包 / gas / KYC / 预存资金）
        deadline                 截止日期字符串（如 "2026-10-15"），无明确截止留空字符串
        tags                     [{zh, en}] 类型与要求标签
        link                     来源/官方链接（禁止放交易所返佣链接；交易所活动只放官方活动页/官网）
        checklist_zh / checklist_en  撸毛步骤清单（与 desc 配套）
        checklist_links           与 checklist 等长的步骤跳转链接（中英共用一份）：
                                  完整 URL（https://…）原样使用；站内页写语言目录相对路径
                                  （如 "guides/wallet-safety.html"，中英空投页各自在本语言
                                  目录下解析，不要加 en/ 前缀）；没有合适链接的步骤放 ""。
                                  只许用官方门户/条目 link 的官网/站内页，禁止编造 URL */
window.TOKVS_AIRDROPS = [
  {
    id: 'airdrop-20261031-hyperlynx',
    name_zh: 'Hyperlynx「The Hunt」积分计划（3 亿 $LYNX 奖池）',
    name_en: 'Hyperlynx "The Hunt" Points Program (300M $LYNX Pool)',
    desc_zh: '约 30 分钟上手 + 持续做市/交易 · 需真实资金：HyperEVM 上的现货 DEX 与交易终端，积分计划 The Hunt 已确认 3 亿枚 $LYNX（占固定 10 亿总量的 30%），TGE（官方窗口 2026 年 10–11 月，具体日期未公布）时按积分占比瓜分；积分 70% 来自提供流动性、30% 来自交易，创世期 2 倍加成已结束。需连接 HyperEVM 兼容钱包并投入真实 HYPE/USDC 做市或交易，有无常损失与市场波动风险；积分在 TGE 前不可转让，具体分配以官方规则为准；只认官方域名 hyperlynx.fi，不索要私钥/助记词。',
    desc_en: '~30 minutes to start + ongoing LP/trading · requires real funds: a spot DEX and trading terminal on HyperEVM. The Hunt points program is confirmed at 300M $LYNX (30% of the fixed 1B supply), claimable pro-rata by points share at TGE (official window Oct–Nov 2026, exact date TBA); 70% of points come from providing liquidity, 30% from trading; the 2x Genesis bonus has ended. Requires a HyperEVM-compatible wallet plus real HYPE/USDC for LP or trading — impermanent loss and market risk apply; points are non-transferable until TGE and official rules prevail. Official domain only: hyperlynx.fi, never share private keys/mnemonics.',
    deadline: '',
    tags: [
      { zh: '积分计划', en: 'Points program' },
      { zh: '需真实资金（做市/交易）', en: 'Real funds needed (LP/trading)' },
      { zh: '需连接钱包', en: 'Wallet required' }
    ],
    link: 'https://www.hyperlynx.fi/',
    checklist_zh: [
      '打开官方网站 hyperlynx.fi（认准官方域名）',
      '连接 HyperEVM 兼容钱包，并准备 HYPE 与 USDC',
      '在现货交易终端完成交易赚取交易积分（占积分池 30%）',
      '在 HYPE 相关池子提供区间流动性赚取做市积分（占 70%）',
      '留意官方 TGE 公告，TGE 时按积分占比领取 $LYNX'
    ],
    checklist_en: [
      'Open the official site hyperlynx.fi (verify the official domain)',
      'Connect a HyperEVM-compatible wallet and prepare HYPE and USDC',
      'Trade on the spot terminal to earn trading points (30% of the points pool)',
      'Provide in-range liquidity in HYPE pools to earn LP points (70%)',
      'Watch official TGE announcements and claim $LYNX pro-rata by points at TGE'
    ],
    checklist_links: ['https://www.hyperlynx.fi/', '', '', '', '']
  },
  {
    id: 'airdrop-20261028-bybit-usd1',
    name_zh: 'Bybit「USD1 持币赚币」加码月（2700 万 WLFI 奖池）',
    name_en: 'Bybit "USD1 Hold & Earn" Bonus Month (27M WLFI Pool)',
    desc_zh: '约 5 分钟设置 + 每日自动计息 · 需真实资金：在 Bybit 账户持有至少 1 枚 USD1 即自动参与，无需质押/锁仓/申购；加码月 10 月 17 日–11 月 15 日，2700 万 WLFI 奖池，每日按小时快照的有效持仓与当日 APR 计息，次日约 06:00（UTC）发放到主账户资金账户；前 50 名大户另有持仓排行榜。注意：APR 随总参与量与市场价浮动，官方未公布固定收益率；需 KYC，资格与发奖以 Bybit 官方规则为准；只认官方域名 www.bybit.com，不索要私钥/助记词。',
    desc_en: '~5 minutes to set up + automatic daily accrual · requires real funds: hold at least 1 USD1 in your Bybit account to join automatically — no staking, subscription or lock-up. Bonus month Oct 17–Nov 15: a 27,000,000 WLFI pool, daily rewards from hourly snapshots of effective holdings and the day\'s APR, credited to the Main Account Funding Wallet around 06:00 UTC the next day; a Top-50 holder leaderboard runs alongside. Note: APR varies with total participation and market prices — no fixed yield is published; KYC required, official rules prevail. Official domain only: www.bybit.com, never share private keys/mnemonics.',
    deadline: '2026-11-15',
    tags: [
      { zh: '交易所活动', en: 'Exchange campaign' },
      { zh: '需真实资金（持仓）', en: 'Real funds needed (holding)' },
      { zh: '每日发放', en: 'Daily payouts' }
    ],
    link: 'https://www.bybit.com/',
    checklist_zh: [
      '注册 Bybit 账号并完成 KYC 认证（认准官方域名 www.bybit.com）',
      '在账户中持有至少 1 枚 USD1（无需质押或锁仓，自动参与）',
      '保持持仓稳定：每日按小时快照的有效持仓决定当日奖励',
      '次日约 06:00（UTC）核查主账户资金账户到账的 WLFI',
      '加码月 10 月 17 日–11 月 15 日结束前留意官方规则与 APR 变化'
    ],
    checklist_en: [
      'Register a Bybit account and complete KYC (verify the official domain www.bybit.com)',
      'Hold at least 1 USD1 in your account (no staking or lock-up — participation is automatic)',
      'Keep your balance stable: daily rewards are based on hourly snapshots of effective holdings',
      'Check your Main Account Funding Wallet around 06:00 UTC the next day for the WLFI credit',
      'Watch official rules and APR changes through the bonus month (Oct 17–Nov 15)'
    ],
    checklist_links: ['https://www.bybit.com/', '', '', '', '']
  },
  {
    id: 'airdrop-20261024-elyon',
    name_zh: 'ELYON Chain「Incentivized Testnet Season 1」测试网任务',
    name_en: 'ELYON Chain "Incentivized Testnet Season 1" Testnet Quests',
    desc_zh: '约 1–2 小时完成全部任务 + 每天几分钟签到 · 0 资金：激励测试网第一季，连接钱包（仅签名、无需 gas）、从官方水龙头领测试 ELN、发测试交易、委托验证者、铸造任务徽章等 8 个任务，单次做完共 390 积分；另有每日任务、社交任务与推荐奖励（推荐人拿被推荐人 10% 积分）。注意：官方未公布代币分配规则，积分≠未来代币，属未确认潜在机会；测试网请用全新钱包，需连接钱包，只认官方域名 airdrop.elyon.network，不索要私钥/助记词。',
    desc_en: '~1–2 hours for all quests + a few minutes daily · zero cost: Incentivized Testnet Season 1 — connect a wallet (one signature, no gas), claim test ELN from the official faucet, send test transactions, delegate to a validator, mint a quest badge and more across 8 quests (390 points for one-time completion). Extra points from daily quests, social tasks and referrals (referrers earn 10% of referred friends\' points). Note: no confirmed token allocation — points do NOT guarantee future tokens; unconfirmed potential only. Use a fresh wallet, connect via the official domain only: airdrop.elyon.network, never share private keys/mnemonics.',
    deadline: '',
    tags: [
      { zh: '测试网交互', en: 'Testnet' },
      { zh: '潜在空投（未确认）', en: 'Potential airdrop (unconfirmed)' },
      { zh: '需连接钱包', en: 'Wallet required' },
      { zh: '0 资金', en: 'Zero cost' }
    ],
    link: 'https://airdrop.elyon.network',
    checklist_zh: [
      '打开官方活动网站 airdrop.elyon.network（认准官方域名）',
      '连接钱包完成签名（仅签名、不消耗 gas），创建活动档案',
      '在官方水龙头领取测试 ELN（每日可领，计 20 积分任务）',
      '完成发送测试交易、委托验证者 10 测试 ELN、铸造任务徽章',
      '每天做一次每日任务（水龙头、交易、发推文）持续累积积分'
    ],
    checklist_en: [
      'Open the official campaign site airdrop.elyon.network (verify the official domain)',
      'Connect your wallet and sign (signature only, no gas) to create your campaign profile',
      'Claim test ELN from the official faucet (daily task worth 20 points)',
      'Send a test transaction, delegate 10 test ELN to a validator, mint the quest badge',
      'Do the daily tasks each day (faucet claim, test transaction, tweet) to keep earning points'
    ],
    checklist_links: ['https://airdrop.elyon.network', '', '', '', '']
  },
  {
    id: 'airdrop-20261023-binance-rlusd-xrp',
    name_zh: 'Binance「持有 RLUSD 分享 60 万 XRP」持仓空投',
    name_en: 'Binance "Hold RLUSD to Share 600,000 XRP" Holding Airdrop',
    desc_zh: '约 10 分钟操作 + 持仓 4 周 · 需真实资金：在币安任意账户持有 RLUSD（每日快照取当日最低余额），按 7 日均余额分享 60 万 XRP 奖池，分 4 周发放；奖励每周六 02:00 前（东八区）直接空投到主账户现货账户。奖励自 10 月 23 日 08:00（东八区）起计。注意：用借入的 USDT/USDC/USD1 等稳定币换来的 RLUSD，杠杆部分只按 40% 折算计入；细则以币安官方公告为准；不索要私钥/助记词，谨防仿冒公告。',
    desc_en: '~10 minutes to set up + 4-week holding period · requires real funds: hold RLUSD in any Binance account (daily eligible balance = the lowest balance in hourly snapshots that day) to share a 600,000 XRP prize pool by 7-day average balance, paid weekly over 4 weeks directly to your main account\'s Spot account (by 02:00 UTC+8 every Saturday). Rewards start accruing from Oct 23, 08:00 (UTC+8). Note: RLUSD obtained by borrowing other stablecoins (USDT/USDC/USD1 etc.) counts the leveraged portion at only 40%; official announcement terms prevail. No private keys/mnemonics needed — beware of fake announcements.',
    deadline: '2026-11-20',
    tags: [
      { zh: '交易所活动', en: 'Exchange campaign' },
      { zh: '需真实资金（持仓）', en: 'Real funds needed (holding)' },
      { zh: '每周发放', en: 'Weekly payouts' }
    ],
    link: 'https://www.binance.com/en/square/post/379640270716781',
    checklist_zh: [
      '注册币安账号并完成 KYC（认准官方域名 www.binance.com）',
      '阅读「持有 RLUSD 分享 60 万 XRP」官方公告，确认活动周期与计息规则',
      '在现货/资金/杠杆等任意账户持有 RLUSD（每日保持余额稳定，快照取当日最低值）',
      '每周六 02:00（东八区）前核查主账户现货账户到账的 XRP',
      '注意：用借入的 USDT/USDC/USD1 等换 RLUSD 的杠杆部分只按 40% 计入；波动风险自担'
    ],
    checklist_en: [
      'Register a Binance account and complete KYC (verify the official domain www.binance.com)',
      'Read the official "Hold RLUSD to Share 600,000 XRP" announcement and confirm the campaign terms',
      'Hold RLUSD in any Spot / Funding / Margin account (keep the balance stable — snapshots take the day\'s lowest balance)',
      'Check your main account\'s Spot account each Saturday (before 02:00 UTC+8) for the XRP airdrop',
      'Note: the leveraged portion of RLUSD obtained by borrowing USDT/USDC/USD1 etc. counts at only 40%; market risk is on you'
    ],
    checklist_links: ['https://www.binance.com/en/square/post/379640270716781', '', '', '', '']
  },
  {
    id: 'airdrop-20261020-binance-pick',
    name_zh: 'Binance「Pick」预测市场活动（最高 100 万 USDC 奖池）',
    name_en: 'Binance "Pick" Prediction Campaign (Up to 1M USDC Prize Pool)',
    desc_zh: '报名 10–20 分钟 + 每天几分钟签到 · 预测使用活动积分（Scores，仅活动积分、无货币价值，不可兑换现金），奖池按早鸟预约人数浮动、最高 100 万 USDC：50 万赛季排行榜（前 2 万名）、每周 10 万 USDC（共 4 周）、10 万参与奖（完成至少 5 次签到，每人最高 5 USDC）。早鸟预约 10 月 19 日–20 日 23:59（UTC）；预测期 10 月 21 日–11 月 15 日。部分任务（如交易类）需真实资金；需币安账号 + KYC，任务可用性因地区而异；只认官方域名 www.binance.com，不索要私钥/助记词，谨防仿冒活动页。',
    desc_en: '10–20 minutes to sign up + a few minutes of daily check-ins · predictions spend campaign-only Scores (no monetary value, cannot be redeemed for cash). The prize pool scales with early-bird sign-ups, up to 1M USDC: 500K season leaderboard (top 20,000), 100K USDC per week for 4 weeks, and a 100K participation pool (at least 5 check-ins, up to 5 USDC each). Early-bird reservations Oct 19–20, 23:59 UTC; prediction period Oct 21–Nov 15. Some tasks (e.g. trading) require real funds; Binance account + KYC required, task availability varies by region. Official domain only: www.binance.com, never share private keys/mnemonics, beware of fake campaign pages.',
    deadline: '2026-11-15',
    tags: [
      { zh: '交易所活动', en: 'Exchange campaign' },
      { zh: '预测市场', en: 'Prediction markets' },
      { zh: '签到+任务积分', en: 'Check-ins + task scores' }
    ],
    link: 'https://www.binance.com/',
    checklist_zh: [
      '注册币安账号并完成 KYC（认准官方域名 www.binance.com）',
      '在 10 月 20 日 23:59（UTC）前完成 Pick 活动早鸟预约',
      '预测期（10 月 21 日–11 月 15 日）每天签到、做任务赚取 Scores',
      '用 Scores 在预测市场中做预测，冲赛季榜与每周榜',
      '赛季结束后核对排名，按官方规则领取 USDC 奖励'
    ],
    checklist_en: [
      'Register a Binance account and complete KYC (verify the official domain www.binance.com)',
      'Complete the Pick campaign early-bird reservation before 23:59 UTC on Oct 20',
      'During the prediction period (Oct 21–Nov 15), check in daily and complete tasks to earn Scores',
      'Use Scores to make predictions in the prediction markets; chase the season and weekly leaderboards',
      'Check your ranking after the season and claim USDC rewards per official rules'
    ],
    checklist_links: ['https://www.binance.com/', '', '', '', '']
  },
  {
    id: 'airdrop-20261017-bybit-stocks',
    name_zh: 'Bybit「Full Stocks Ahead」美股交易活动（15万USDC奖池）',
    name_en: 'Bybit "Full Stocks Ahead" Stock Trading Campaign (150K USDC Prize Pool)',
    desc_zh: '每天约 15–30 分钟 · 需真实资金：在 Bybit 美股/ETF 交易板块参与 20 天活动（10 月 12 日–10 月 31 日），按交易量与持仓瓜分 15 万 USDC。含首单奖励、每日奖励盒（单日美股交易超 2000 美元领最高 50 USDC 奖励盒）、10 万 USDC Stock Splash 交易量分成（至少交易 1000 美元股票且活动结束时持仓不少于 1000 美元）、联盟推荐榜 2 万 USDC。需 KYC 认证，具体资格与发奖以官方规则为准；只认官方域名 www.bybit.com，不索要私钥/助记词。',
    desc_en: '~15–30 minutes daily · requires real funds: trade US stocks/ETFs on Bybit in a 20-day campaign (Oct 12–31) to share a 150,000 USDC pool. Includes a first-trade reward, a daily reward box (trade >$2,000 in stocks per day for a box worth up to 50 USDC), the 100,000 USDC Stock Splash volume share (trade at least $1,000 in stocks and hold at least $1,000 in stocks at campaign end), and a 20,000 USDC affiliate leaderboard. KYC required; official rules prevail. Official domain only: www.bybit.com, never share private keys/mnemonics.',
    deadline: '2026-10-31',
    tags: [
      { zh: '交易所活动', en: 'Exchange campaign' },
      { zh: '需真实资金', en: 'Real funds needed' },
      { zh: '需 KYC', en: 'KYC required' }
    ],
    link: 'https://www.bybit.com/',
    checklist_zh: [
      '注册 Bybit 账号并完成 KYC 认证（认准官方域名）',
      '进入活动页报名参加 Full Stocks Ahead（按官方规则）',
      '完成首笔美股/ETF 交易领取首单奖励',
      '每日交易超 2000 美元美股，领取每日奖励盒',
      '保持活动期间交易量与持仓达标，参与 10 万 USDC 交易量分成'
    ],
    checklist_en: [
      'Register a Bybit account and complete KYC (verify the official domain)',
      'Sign up for Full Stocks Ahead on the campaign page (per official rules)',
      'Place your first US stock/ETF trade to earn the first-trade reward',
      'Trade over $2,000 in stocks daily to collect the daily reward box',
      'Keep your volume and holdings on target to share the 100K USDC Stock Splash'
    ],
    checklist_links: ['https://www.bybit.com/', '', '', '', '']
  },
  {
    id: 'airdrop-20261015-dogeos',
    name_zh: 'DogeOS「The Grand Heist」测试网任务',
    name_en: 'DogeOS "The Grand Heist" Testnet Quests',
    desc_zh: '约 30–60 分钟（一次性） · 0 资金，测试 DOGE 从官方水龙头免费领，无需真实资金。需连接钱包。MyDoge V3 与 25+ 测试网应用于 10 月 8 日上线，10 月 12 日官方宣布任务完成数突破 10 万。注意：官方未公布代币与空投条款，属未确认潜在机会；测试网请用全新钱包，只认官方域名，不索要私钥/助记词。',
    desc_en: '~30–60 minutes one-time · zero cost — test DOGE is free from the official faucet, no real funds needed. Wallet connection required. MyDoge V3 and 25+ testnet apps went live Oct 8, and the team announced 100K+ completed quests on Oct 12. Note: no token or airdrop terms announced — unconfirmed potential only; use a fresh wallet on testnet, official domains only, never share private keys/mnemonics.',
    deadline: '',
    tags: [
      { zh: '测试网交互', en: 'Testnet' },
      { zh: '潜在空投（未确认）', en: 'Potential airdrop (unconfirmed)' },
      { zh: '需连接钱包', en: 'Wallet required' },
      { zh: '0 资金', en: 'Zero cost' }
    ],
    link: 'https://heist.dogeos.com',
    checklist_zh: [
      '打开官方任务平台 heist.dogeos.com（认准官方域名）',
      '在官方水龙头 faucet.testnet.dogeos.com 领取测试 DOGE',
      '把 DogeOS 测试网添加到钱包（以官方文档的 Chain ID 为准）',
      '体验 Moar Finance 等测试网应用（供应/借出/还款等）',
      '完成 The Grand Heist 任务页的可用任务'
    ],
    checklist_en: [
      'Open the official quest platform heist.dogeos.com (verify the official domain)',
      'Claim test DOGE from the official faucet faucet.testnet.dogeos.com',
      'Add the DogeOS testnet to your wallet (use the Chain ID from official docs)',
      'Try testnet apps like Moar Finance (supply/borrow/repay etc.)',
      'Complete available quests on The Grand Heist quest page'
    ],
    checklist_links: ['https://heist.dogeos.com', 'https://faucet.testnet.dogeos.com', 'guides/wallet-safety.html', '', '']
  },
  {
    id: 'airdrop-20261014-allox',
    name_zh: 'AlloX（$ALLOX）积分与 Gems 奖励',
    name_en: 'AlloX ($ALLOX) Points & Gems Rewards',
    desc_zh: '注册约 15–20 分钟起、每日任务约 10 分钟 · 需真实资金：组合在链上执行、投入的是真钱（有市场波动风险，非测试网）· 需连接钱包 + X 账号。35% 的 $ALLOX 总量预留给社区，官方确认积分将计入未来 $ALLOX 奖励（具体分配规则待公布）；$100 万公募 10 月 12 日已在 Coinbase 旗下 Sonar 以 $0.065 开启。只认官方域名 app.allox.ai，谨防仿冒。',
    desc_en: '~15–20 minutes to set up, ~10 minutes daily · requires real funds: portfolios execute on-chain with real money (market risk — this is NOT a testnet) · wallet + X account required. 35% of $ALLOX supply is reserved for the community, and the team confirmed Points count toward future $ALLOX rewards (allocation rules TBA); a $1M public sale opened Oct 12 on Coinbase-owned Sonar at $0.065. Official domain only: app.allox.ai — beware of copycats.',
    deadline: '',
    tags: [
      { zh: '积分/Gems', en: 'Points/Gems' },
      { zh: '潜在空投', en: 'Potential airdrop' },
      { zh: '需连接钱包', en: 'Wallet required' },
      { zh: '需真实资金', en: 'Real funds needed' }
    ],
    link: 'https://app.allox.ai',
    checklist_zh: [
      '打开官方应用 app.allox.ai 并连接钱包（认准官方域名）',
      '领取 5000 积分迎新奖励，完成每日签到任务',
      '用 AI 创建一个叙事组合（投入少量真实资金，注意市场风险）',
      '分享组合卡片到 X，参与 Gems 奖励活动',
      '开启推荐链接，邀请好友创建组合赚多级奖励'
    ],
    checklist_en: [
      'Open the official app at app.allox.ai and connect your wallet (verify the official domain)',
      'Claim the 5,000-Point welcome bonus and complete daily check-in tasks',
      'Create a narrative portfolio with the AI (invest a small amount of real funds — mind the market risk)',
      'Share your portfolio card on X to join the Gems rewards campaign',
      'Activate your referral link and earn multi-tier rewards when friends create portfolios'
    ],
    checklist_links: ['https://app.allox.ai', '', 'guides/wallet-safety.html', '', '']
  },
];
