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
    id: 'airdrop-20261015-hyperlynx',
    name_zh: 'Hyperlynx（$LYNX）「The Hunt」积分',
    name_en: 'Hyperlynx ($LYNX) "The Hunt" Points',
    desc_zh: '每日 10–20 分钟 · 需真实资金：在 HyperEVM 上交易与提供流动性赚积分，gas 用 HYPE 支付。3 亿枚 $LYNX（总量 30%）已确认为空投池，TGE 时按积分占比分配；TGE 时间官方尚未公布。注意：团队匿名，属高风险 DeFi 交互；只认官方域名 hyperlynx.fi，不索要私钥/助记词。',
    desc_en: '~10–20 minutes daily · requires real funds: trade and provide liquidity on HyperEVM to earn points, gas paid in HYPE. 300M $LYNX (30% of supply) is confirmed as the airdrop pool, distributed pro-rata at TGE; the TGE date is not announced. Note: the team is anonymous — high-risk DeFi interaction; official domain only: hyperlynx.fi, never share private keys/mnemonics.',
    deadline: '',
    tags: [
      { zh: 'DeFi 积分', en: 'DeFi points' },
      { zh: '已确认分配', en: 'Confirmed allocation' },
      { zh: '需连接钱包', en: 'Wallet required' },
      { zh: '需真实资金', en: 'Real funds needed' }
    ],
    link: 'https://www.hyperlynx.fi/',
    checklist_zh: [
      '打开官网 hyperlynx.fi 并连接 HyperEVM 兼容钱包（认准官方域名）',
      '准备 HYPE（付 gas）与 USDC 等做市资金，注意真实资金风险',
      '在现货市场做兑换赚取交易积分（占积分池 30%）',
      '向 HYPE/USDC 等池子提供集中流动性赚大头积分（占 70%，保持在价格区间内）',
      '每周检查仓位维持在区间内，累积连续周忠诚加成'
    ],
    checklist_en: [
      'Open hyperlynx.fi and connect a HyperEVM-compatible wallet (verify the official domain)',
      'Prepare HYPE (for gas) and USDC etc. as LP capital — real funds at risk',
      'Swap on spot markets to earn trading points (30% of the points pool)',
      'Provide concentrated liquidity to pools like HYPE/USDC for the bulk of points (70% — stay in range)',
      'Check positions weekly to stay in range and stack the loyalty bonus'
    ],
    checklist_links: ['https://www.hyperlynx.fi/', 'guides/wallet-safety.html', '', '', '']
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
  {
    id: 'airdrop-20261013-push',
    name_zh: 'Push Chain（$PC）Season 3 积分计划',
    name_en: 'Push Chain ($PC) Season 3 Points Program',
    desc_zh: '每日 10–20 分钟 · 0 资金，测试网 gas 由官方水龙头提供（每 6 小时刷新），无需投入真钱。需连接钱包或社交账号登录，仅钱包签名、不索要私钥/助记词。注意：代币经济学确认 10% 的 $PC 预留空投，但 Season 3 的 TGE 日期官方尚未公布，持续参与赚积分即可。',
    desc_en: '~10–20 minutes daily · zero cost — testnet gas comes from the official faucet (refreshes every 6 hours), no real money needed. Connect a wallet or sign in with a social account; signature only, never shares private keys/mnemonics. Note: tokenomics reserve 10% of $PC for airdrops, but the Season 3 TGE date is not yet announced — keep earning points.',
    deadline: '',
    tags: [
      { zh: '测试网积分', en: 'Testnet points' },
      { zh: '潜在空投', en: 'Potential airdrop' },
      { zh: '需连接钱包', en: 'Wallet required' },
      { zh: '0 资金', en: 'Zero cost' }
    ],
    link: 'https://portal.push.org/rewards',
    checklist_zh: [
      '打开官方奖励门户 portal.push.org/rewards 并连接钱包/社交账号',
      '从 portal 内置水龙头领取免费测试网 $PC（每 6 小时可领）',
      '验证 X/Discord 社交账号解锁任务板',
      '做每周轮换的 App 任务赚 XP（流动性/兑换/游戏/预测等）',
      '每日签到 + Spin 转盘累积 Rare Pass'
    ],
    checklist_en: [
      'Open the official rewards portal portal.push.org/rewards and connect a wallet/social account',
      'Claim free testnet $PC from the portal faucet (refreshes every 6 hours)',
      'Verify your X/Discord social accounts to unlock the quest board',
      'Complete rotating weekly App tasks to earn XP (liquidity/swap/gaming/prediction etc.)',
      'Daily check-in + Spin to collect Rare Passes'
    ],
    checklist_links: ['https://portal.push.org/rewards', '', 'guides/wallet-safety.html', '', '']
  },
  {
    id: 'airdrop-20261013-titan',
    name_zh: 'Titan Exchange 测试网交互（Canton Perp DEX）',
    name_en: 'Titan Exchange Testnet (Canton Perp DEX)',
    desc_zh: '首次约 5–10 分钟 · 0 资金，全程测试币 + 钱包签名，无需 KYC。注意：空投尚未官宣，积分不等于代币承诺，按"潜在空投"收录；测试网请用全新钱包，只认官方域名，不索要私钥/助记词。',
    desc_en: '~5–10 minutes for the first run · zero cost — test tokens and wallet signatures only, no KYC. Note: no airdrop has been announced, so points are NOT a token promise — filed as a "potential airdrop"; use a fresh wallet on testnet, official domains only, never share private keys/mnemonics.',
    deadline: '',
    tags: [
      { zh: '测试网交互', en: 'Testnet' },
      { zh: '潜在空投（未确认）', en: 'Potential airdrop (unconfirmed)' },
      { zh: '需连接钱包', en: 'Wallet required' },
      { zh: '0 资金', en: 'Zero cost' }
    ],
    link: 'https://testnet.titanx.cc',
    checklist_zh: [
      '打开官方测试网 testnet.titanx.cc（认准官方域名）',
      '连接钱包（与 waitlist 用同一钱包）',
      '从应用内水龙头领取测试 USDC',
      '点击 Enable Trading 并在钱包里确认一次签名',
      '选择 BTC-USDCx 等市场完成一次自然交易'
    ],
    checklist_en: [
      'Open the official testnet at testnet.titanx.cc (verify the official domain)',
      'Connect your wallet (same one used for the waitlist)',
      'Claim test USDC from the in-app faucet',
      'Click "Enable Trading" and confirm one signature in your wallet',
      'Complete one natural trade on a market such as BTC-USDCx'
    ],
    checklist_links: ['https://testnet.titanx.cc', '', 'guides/wallet-safety.html', '', '']
  },
  {
    id: 'airdrop-20261012-pharos',
    name_zh: 'Pharos（PROS）空投领取',
    name_en: 'Pharos (PROS) Airdrop Claim',
    desc_zh: '约 15 分钟 · 0 资金，需连接参与测试网时的同一钱包领取（gas 安排以官方公告为准）。资格面向测试网参与者等特定人群，先查资格再操作；10 月 31 日截止，逾期未领将退回社区储备；只认官方领取门户 claim.pharos.xyz，谨防仿冒。',
    desc_en: '~15 minutes · zero cost — connect the same wallet you used on testnet to claim (gas per the official announcement). Eligibility targets testnet participants and similar groups, so check first; the claim window closes October 31; unclaimed tokens return to the community reserve afterwards. Use only the official portal claim.pharos.xyz and beware of copycats.',
    deadline: '2026-10-31',
    tags: [
      { zh: '空投领取', en: 'Claim' },
      { zh: '需连接钱包', en: 'Wallet required' }
    ],
    link: 'https://claim.pharos.xyz',
    checklist_zh: [
      '打开 Pharos 官方领取门户 claim.pharos.xyz（认准官方域名）',
      '连接参与测试网时的同一钱包',
      '查询领取资格与额度',
      '确认领取并等待到账',
      '不要等到 10-31 当天，提前领取'
    ],
    checklist_en: [
      'Open the official Pharos claim portal (verify the official domain)',
      'Connect the same wallet you used on testnet',
      'Check your eligibility and allocation',
      'Confirm the claim and wait for it to arrive',
      "Don't leave it to Oct 31 — claim early"
    ],
    checklist_links: ['https://claim.pharos.xyz', 'guides/wallet-safety.html', '', '', '']
  },
  {
    id: 'airdrop-20261010-htx',
    name_zh: 'HTX C2C / 闪兑交易活动',
    name_en: 'HTX C2C / Convert Trading Campaign',
    desc_zh: '约 20 分钟 · 需预存真实交易资金。注册 HTX 并完成 KYC L3 认证、在活动页报名后，C2C 与闪兑各完成 1 笔 ≥20 USDT 交易即可领取奖励，也可按需冲更高交易档位瓜分奖池；具体规则以 HTX 官方活动页为准。',
    desc_en: '~20 minutes · requires real trading funds. Register on HTX, complete KYC L3 verification and sign up on the campaign page, then complete one C2C trade and one Convert trade of at least 20 USDT each to earn rewards; higher volume tiers share a bigger pool. The rules on the official HTX campaign page prevail.',
    deadline: '2026-10-18',
    tags: [
      { zh: '交易所活动', en: 'Exchange campaign' },
      { zh: '需 KYC', en: 'KYC required' },
      { zh: '需预存资金', en: 'Deposit required' }
    ],
    link: 'https://www.htx.com/',
    checklist_zh: [
      '注册 HTX 并完成 KYC L3 认证',
      '在活动页点击报名',
      'C2C 完成 1 笔 ≥20 USDT 交易',
      '闪兑完成 1 笔 ≥20 USDT 交易，领取 1 USDT',
      '按需冲更高交易档位，瓜分奖池'
    ],
    checklist_en: [
      'Register on HTX and complete KYC L3 verification',
      'Hit "Register now" on the campaign page',
      'Complete one C2C trade of at least 20 USDT',
      'Complete one Convert trade of at least 20 USDT to earn 1 USDT',
      'Optionally push higher volume tiers for a bigger pool share'
    ],
    checklist_links: ['https://www.htx.com/', 'https://www.htx.com/', '', '', '']
  }
];
