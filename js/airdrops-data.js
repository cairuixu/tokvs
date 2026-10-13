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
    id: 'airdrop-20261012-sonic',
    name_zh: 'Sonic（S）第一/二季空投领取',
    name_en: 'Sonic (S) Season 1 & 2 Airdrop Claim',
    desc_zh: '约 15 分钟 · 0 资金，需连接钱包并支付少量 gas 完成链上领取。10-15 后约 3269 万枚未领 S 将被销毁，逾期无法补领；只认官方领取门户，谨防钓鱼网站。',
    desc_en: '~15 minutes · zero cost — connect a wallet and pay a small gas fee to complete the on-chain claim. After Oct 15, ~32.69M unclaimed S will be burned and late claims cannot be recovered; use only the official claim portal and beware of phishing sites.',
    deadline: '2026-10-15',
    tags: [
      { zh: '空投领取', en: 'Claim' },
      { zh: '需连接钱包', en: 'Wallet required' },
      { zh: '需少量 gas', en: 'Gas needed' }
    ],
    link: 'https://cryptocompass.com/articles/the-most-profitable-crypto-airdrops-of-the-week-week-41-and-the-october-15-sonic-burn',
    checklist_zh: [
      '打开 Sonic 官方领取门户 my.soniclabs.com/airdrop（认准官方域名）',
      '连接有领取资格的钱包',
      '确认 Season 1 / Season 2 分配额度',
      '完成链上领取（需少量 gas）',
      '10-15 截止，逾期视为放弃，不要再拖'
    ],
    checklist_en: [
      'Open the official Sonic claim portal my.soniclabs.com/airdrop (verify the official domain)',
      'Connect an eligible wallet',
      'Confirm your Season 1 / Season 2 allocation',
      'Complete the on-chain claim (small gas fee required)',
      'Deadline Oct 15 — unclaimed allocations are forfeited, do not wait'
    ],
    checklist_links: ['https://my.soniclabs.com/airdrop', 'guides/wallet-safety.html', '', 'https://my.soniclabs.com/airdrop', '']
  },
  {
    id: 'airdrop-20261012-concrete',
    name_zh: 'Concrete（CT）Earn Vault 用户 USDC 奖励领取',
    name_en: "Concrete (CT) Earn Vault Users' USDC Claim",
    desc_zh: '约 15 分钟 · 领取本身 0 资金（链上领取需少量 gas）。仅限此前用过 Concrete Earn Vault 的用户，额度按已记录的 Vault 持仓价值决定，现在新存入不计入本次分配；只认官方领取门户，谨防仿冒领取站。',
    desc_en: '~15 minutes · free to claim (a small on-chain gas fee applies). Restricted to existing Concrete Earn Vault users — allocation is sized by your recorded Vault position and new deposits do not count; use only the official claim portal and beware of copycat claim sites.',
    deadline: '2026-10-16 20:00',
    tags: [
      { zh: '空投领取', en: 'Claim' },
      { zh: '需连接钱包', en: 'Wallet required' },
      { zh: '需少量 gas', en: 'Gas needed' },
      { zh: '限 Vault 老用户', en: 'Existing Vault users only' }
    ],
    link: 'https://www.bitrue.com/blog/concrete-tge',
    checklist_zh: [
      '确认自己此前用过 Concrete Earn Vault',
      '10-16 20:00（北京时间）后打开官方领取门户（认准官方域名）',
      '连接当时存入 Vault 的同一钱包',
      '按已记录的 Vault 持仓价值确认 USDC 分配额度',
      '完成领取'
    ],
    checklist_en: [
      'Confirm you previously used Concrete Earn Vault',
      'After Oct 16 12:00 UTC, open the official claim portal (verify the official domain)',
      'Connect the same wallet you deposited with',
      'Confirm your USDC allocation, sized by your recorded Vault position value',
      'Complete the claim'
    ],
    checklist_links: ['', '', 'guides/wallet-safety.html', '', '']
  },
  {
    id: 'airdrop-20261012-giwa',
    name_zh: 'GIWA Chain 测试网交互',
    name_en: 'GIWA Chain Testnet Interaction',
    desc_zh: '约 30–60 分钟（一次性） · 0 资金，全程使用免费测试币，无需充值、无需预存资金。注意：官方尚未把测试网活动与任何奖励挂钩，空投未确认，不要为此投入真实资金；测试网请用全新钱包，只认官方渠道。',
    desc_en: '~30–60 minutes one-time · zero cost — free test tokens only, no deposit or pre-funding needed. Note: GIWA has NOT linked testnet activity to any reward, so any airdrop is unconfirmed — do not spend real funds chasing it; use a fresh wallet on testnets and only official links.',
    deadline: '',
    tags: [
      { zh: '测试网交互', en: 'Testnet' },
      { zh: '潜在空投（未确认）', en: 'Potential airdrop (unconfirmed)' },
      { zh: '0 资金', en: 'Zero cost' }
    ],
    link: 'https://usethebitcoin.com/airdrop/giwa-chain-airdrop-guide/',
    checklist_zh: [
      '打开 GIWA Sepolia 测试网浏览器并连接钱包添加网络',
      '在官方水龙头领取测试 ETH（每日限额）',
      '完成一次合约部署等基础交互',
      '关注 GIWA 官方账号等待主网消息',
      '只使用官方公布的链接'
    ],
    checklist_en: [
      'Open the GIWA Sepolia testnet explorer and connect a wallet to add the network',
      'Claim test ETH from the official faucet (daily limit)',
      'Complete basic interactions such as a contract deployment',
      "Follow GIWA's official account for mainnet news",
      'Use only links shared by official channels'
    ],
    checklist_links: ['guides/wallet-safety.html', '', '', '', '']
  },
  {
    id: 'airdrop-20261012-pharos',
    name_zh: 'Pharos（PROS）空投领取',
    name_en: 'Pharos (PROS) Airdrop Claim',
    desc_zh: '约 15 分钟 · 0 资金，需连接参与测试网时的同一钱包领取（gas 安排以官方公告为准）。资格面向测试网参与者等特定人群，先查资格再操作；逾期未领将退回基金会，只认官方领取门户，谨防仿冒。',
    desc_en: '~15 minutes · zero cost — connect the same wallet you used on testnet to claim (gas per the official announcement). Eligibility targets testnet participants and similar groups, so check first; unclaimed tokens return to the Foundation afterwards. Use only the official portal and beware of copycats.',
    deadline: '2026-10-25',
    tags: [
      { zh: '空投领取', en: 'Claim' },
      { zh: '需连接钱包', en: 'Wallet required' }
    ],
    link: 'https://cryptocompass.com/articles/the-most-profitable-crypto-airdrops-of-the-week-week-41-and-the-october-15-sonic-burn',
    checklist_zh: [
      '打开 Pharos 官方领取门户（认准官方域名）',
      '连接参与测试网时的同一钱包',
      '查询领取资格与额度',
      '确认领取并等待到账',
      '不要等到 10-25 当天，提前领取'
    ],
    checklist_en: [
      'Open the official Pharos claim portal (verify the official domain)',
      'Connect the same wallet you used on testnet',
      'Check your eligibility and allocation',
      'Confirm the claim and wait for it to arrive',
      "Don't leave it to Oct 25 — claim early"
    ],
    checklist_links: ['', 'guides/wallet-safety.html', '', '', '']
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
