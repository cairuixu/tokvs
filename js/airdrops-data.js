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
    id: 'airdrop-20261012-dogeos',
    name_zh: 'DogeOS「Grand Heist」忠诚活动',
    name_en: 'DogeOS Grand Heist Loyalty Campaign',
    desc_zh: '约 30 分钟起 · 0 资金，当前测试网活动免费参与，无需充值。注意：DogeOS 尚未发布原生代币、未确认空投，当前奖励为 XP、徽章与门票，不等于代币承诺；项目方已警告提防冒名假币，参与只认官方活动页。',
    desc_en: '~30 minutes to start · zero cost — current testnet activities are free, no deposit needed. Note: DogeOS has not launched a native token and has not confirmed an airdrop — current rewards are XP, medals and tickets, not a token promise; the project itself warns against scam tokens using its name.',
    deadline: '',
    tags: [
      { zh: '测试网活动', en: 'Testnet campaign' },
      { zh: '潜在空投（未确认）', en: 'Potential airdrop (unconfirmed)' },
      { zh: '需连接钱包', en: 'Wallet required' },
      { zh: '0 资金', en: 'Zero cost' }
    ],
    link: 'https://cryptoworldheadline.com/dogeos-airdrop-information-the-best-way-to-be-a-part-of-the-grand-heist/',
    checklist_zh: [
      '通过 DogeOS 官方渠道进入 Grand Heist 活动页',
      '连接钱包/账号参与 Chapter 1 任务',
      '完成任务积累 XP、徽章与门票',
      '留意后续章节与官方揭晓公告',
      '警惕冒用 DogeOS 名义的假代币'
    ],
    checklist_en: [
      'Enter the Grand Heist campaign through DogeOS official channels',
      'Connect your wallet/account and join Chapter 1 quests',
      'Earn XP, medals and tickets as you complete tasks',
      'Watch for later chapters and the official reveal',
      'Beware of fake tokens trading on the DogeOS name'
    ],
    checklist_links: ['', 'guides/wallet-safety.html', '', '', '']
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
