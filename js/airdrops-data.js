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
    id: 'airdrop-20261120-hyperlynx',
    name_zh: 'Hyperlynx The Hunt 积分（HyperEVM 现货 DEX，3 亿 LYNX 已确认分配）',
    name_en: 'Hyperlynx The Hunt Points (HyperEVM Spot DEX, 300M LYNX Allocation Confirmed)',
    desc_zh: '约 30 分钟上手 + 持续链上操作 · 需真实资金（HyperEVM 上交易/做市，HYPE 作 gas）：HyperEVM 现货 DEX 与交易终端 Hyperlynx 的积分计划 The Hunt 进行中，官网确认 3 亿枚 LYNX（固定总量 10 亿枚的 30%）按积分占比在 TGE 时分配，积分权重为交易 30%、做市 70%，积分在 TGE 前不可转让。注意：TGE 目标为 2026 年 10–11 月，但至今未公布确切日期与领取规则，存在延期可能；官网首页仍标注 Genesis 2 倍加成，但 10 月第三方核查称该加成已结束，请以官网当前页面为准；做市与交易均有真实资金风险，不保证人人有分配。需连接钱包，只认官方域名 hyperlynx.fi，不索要私钥/助记词，谨防仿冒。',
    desc_en: '~30 minutes to start + ongoing on-chain activity · requires real funds (trade or provide liquidity on HyperEVM, HYPE for gas): Hyperlynx, a spot DEX and trading terminal on HyperEVM, runs The Hunt points program. The official site confirms 300M LYNX (30% of the fixed 1B supply) will be distributed at TGE in proportion to points earned, weighted 30% trading and 70% liquidity provision; points are non-transferable until TGE. Note: TGE is targeted for October–November 2026, but no exact date or claim rules have been published, so a delay is possible. The homepage still shows a Genesis 2x boost, but a third-party check in October said that boost had ended — follow what the official site currently shows. Trading and liquidity provision carry real capital risk, and an allocation is not guaranteed for everyone. Wallet connection required; official domain only: hyperlynx.fi. Never share private keys/mnemonics; beware of fakes.',
    deadline: '',
    tags: [
      { zh: '积分计划', en: 'Points program' },
      { zh: '主网交互', en: 'Mainnet activity' },
      { zh: '需连接钱包', en: 'Wallet required' },
      { zh: '需真实资金（交易/做市）', en: 'Real funds needed (trading/LP)' }
    ],
    link: 'https://www.hyperlynx.fi/',
    checklist_zh: [
      '打开官网 hyperlynx.fi，核对 The Hunt 积分规则与 3 亿 LYNX 分配说明（认准官方域名，勿点第三方空投链接）',
      '在钱包添加 HyperEVM 网络，并准备少量 HYPE 作 gas 与用于交易/做市的 HYPE、USDC',
      '在交易终端做现货兑换赚积分（权重 30%），或在流动性页开区间做市仓位赚积分（权重 70%）',
      '留意官网公布的 TGE 确切日期与领取规则，积分在 TGE 前不可转让，不要轻信非官方代币合约',
      '做市前先小额试水并理解无常损失风险，只用能承受损失的资金参与'
    ],
    checklist_en: [
      'Open the official site hyperlynx.fi and check The Hunt points rules and the 300M LYNX allocation (verify the official domain; do not click third-party airdrop links)',
      'Add the HyperEVM network to your wallet and prepare a small amount of HYPE for gas plus HYPE and USDC for trading or liquidity',
      'Earn points with spot swaps in the trading terminal (30% weighting) or by opening in-range liquidity positions (70% weighting)',
      'Watch official announcements for the exact TGE date and claim rules; points are non-transferable before TGE, and do not trust unofficial token contracts',
      'Start with a small test amount for liquidity provision, understand impermanent-loss risk, and only use funds you can afford to lose'
    ],
    checklist_links: ['https://www.hyperlynx.fi/', '', '', '', '']
  },
  {
    id: 'airdrop-20261119-aura-protocol',
    name_zh: 'Aura Protocol Airdrop ZERO（LitVM 测试网，1.5 亿 AURA 奖励池）',
    name_en: 'Aura Protocol Airdrop ZERO (LitVM Testnet, 150M AURA Pool)',
    desc_zh: '约 30 分钟上手 + 持续测试网操作 · 测试网 0 资金（免费测试 zkLTC）：LitVM 上的硬件与 RWA 项目发行平台 Aura Protocol 激励测试网进行中，最终轮 Bonus Epoch 已开放；官方文档确认 Airdrop ZERO 共分配 1.5 亿枚 AURA（总量 30%），其中 Bonus Epoch 占 1500 万枚；每笔测试网交易得 15 分，质押、投票、社交任务与每日签到也可赚分，完成人性验证得 5000 分；快照资格要求至少 10000 分 + 绑定 X 账号 + 至少 1 笔 dApp 交易，低于 10000 分无奖励。注意：AURA 尚未发行，合约地址待公布，快照与领取日期均未公布，积分与 AURA 不是 1:1 兑换；官方明确付费 Booster（1–4 美元/级，Arbitrum 主网 ETH 支付）非必需且不保证换成代币，建议跳过付费项；项目未公布团队与审计信息，只认官方域名 auralaunch.org / beta.auralaunch.org，不索要私钥/助记词，谨防同名仿冒项目。',
    desc_en: '~30 minutes to start + ongoing testnet activity · zero cost on testnet (free test zkLTC): Aura Protocol, a launchpad for hardware and RWA projects on LitVM, runs an incentivized testnet with the final Bonus Epoch now open. Official docs confirm Airdrop ZERO allocates 150M AURA (30% of supply), with 15M AURA in the Bonus Epoch. Each testnet transaction earns 15 points; staking, voting, social tasks and daily logins also earn points, and the humanity check is worth 5,000 points. Snapshot eligibility requires at least 10,000 points, a linked X account and at least one dApp transaction — below 10,000 points there is no reward. Note: AURA is not live yet, the contract address is TBA, and snapshot and claim dates are unannounced; points do not convert 1:1 into AURA. The official docs say paid Boosters ($1–$4 per level, paid in ETH on Arbitrum One mainnet) are not required and do not guarantee tokens — skip the paid items. The project names no team and no audit; official domains only: auralaunch.org / beta.auralaunch.org. Never share private keys/mnemonics; beware of lookalike projects also called Aura.',
    deadline: '',
    tags: [
      { zh: '测试网交互', en: 'Testnet' },
      { zh: '潜在空投（1.5 亿 AURA 已确认分配）', en: 'Potential airdrop (150M AURA allocation confirmed)' },
      { zh: '需连接钱包', en: 'Wallet required' },
      { zh: '0 资金（测试网）', en: 'Zero cost (testnet)' }
    ],
    link: 'https://beta.auralaunch.org/incentives',
    checklist_zh: [
      '打开官方激励页 beta.auralaunch.org/incentives（认准官方域名 auralaunch.org，勿点同名仿冒项目链接）',
      '在钱包添加 LitVM LiteForge 测试网（链 ID 4441，gas 代币 zkLTC），从激励页水龙头领免费测试 zkLTC',
      '连接钱包并绑定 X 账号，完成人性验证（5000 分），领取每日签到奖励',
      '做测试网交易（质押、投票、参与测试发售或部署代币），每笔得 15 分，持续累积至 10000 分以上',
      '确保至少完成 1 笔 Aura dApp 交易；可选参加 11 月 30 日截止的 Token Quest，留意官方公布的快照与领取规则，不买付费 Booster'
    ],
    checklist_en: [
      'Open the official incentives page beta.auralaunch.org/incentives (verify the official domain auralaunch.org; do not click lookalike projects also called Aura)',
      'Add the LitVM LiteForge testnet to your wallet (chain ID 4441, gas token zkLTC) and claim free test zkLTC from the faucet on the incentives page',
      'Connect your wallet, link your X account, complete the humanity check (5,000 points) and claim the daily login bonus',
      'Do testnet transactions (stake, vote, join test sales or deploy a token) at 15 points each and keep accumulating past 10,000 points',
      'Make sure you complete at least one Aura dApp transaction; optionally enter the Token Quest before its Nov 30 deadline, watch official announcements for snapshot and claim rules, and do not buy paid Boosters'
    ],
    checklist_links: ['https://beta.auralaunch.org/incentives', 'https://beta.auralaunch.org/incentives', '', '', '']
  },
  {
    id: 'airdrop-20261117-gate-candydrop-wlfi',
    name_zh: 'Gate CandyDrop × WLFI（分享 906,120 WLFI，11 月 23 日截止）',
    name_en: 'Gate CandyDrop x WLFI (Share 906,120 WLFI, Closes Nov 23)',
    desc_zh: '约 10 分钟上手 + 交易任务 · 需真实资金（现货交易）：Gate 第 192 期 CandyDrop，活动 11 月 13 日 10:00 至 11 月 23 日 10:00（UTC），总奖池 906,120 WLFI；首次在 Gate 做现货交易且 USD1 现货交易量 ≥800 美元可固定得 100 WLFI（先到先得，总池 10 万枚），交易 WLFI 赚糖果分 60 万枚奖池，邀好友再分 206,120 WLFI（每人上限 1000 枚）；奖励在活动结束后 14 个工作日内发放。注意：需 Gate 账号并完成 KYC，交易量按 USD1 交易对计算（USDT/USD1 与 USD1/USDT 除外），先到先得部分可能提前分完，奖励不保证人人有份；只认 Gate 官方公告页，不索要私钥/助记词，谨防仿冒活动页。',
    desc_en: '~10 minutes to start + trading tasks · requires real funds (spot trading): Gate\'s 192nd CandyDrop runs Nov 13, 10:00 to Nov 23, 10:00 (UTC) with a 906,120 WLFI prize pool. A first-ever spot trade on Gate with USD1 spot volume of at least $800 earns a fixed 100 WLFI (first-come, first-served; 100,000 WLFI pool); trading WLFI earns candies toward a 600,000 WLFI pool, and inviting friends shares a further 206,120 WLFI (up to 1,000 WLFI per person). Rewards are distributed within 14 working days after the event ends. Note: a Gate account and KYC are required; volume counts only on USD1 pairs (USDT/USD1 and USD1/USDT excluded), and first-come, first-served portions may run out — rewards are not guaranteed for everyone. Official Gate announcement page only; never share private keys/mnemonics; beware of fake campaign pages.',
    deadline: '2026-11-23',
    tags: [
      { zh: '交易所活动', en: 'Exchange campaign' },
      { zh: '需真实资金（交易）', en: 'Real funds needed (trading)' },
      { zh: '需 KYC', en: 'KYC required' },
      { zh: '先到先得', en: 'First-come, first-served' }
    ],
    link: 'https://www.gate.com/announcements/article/102764',
    checklist_zh: [
      '打开 Gate 官方公告页，确认第 192 期 CandyDrop 的活动时间与任务规则',
      '注册/登录 Gate 账号并完成 KYC（认准官方域名 www.gate.com）',
      '在活动期内做 USD1 现货交易：首次现货交易量 ≥800 USD1 可领固定 100 WLFI（先到先得）',
      '交易 WLFI 赚糖果参与 60 万枚奖池分红，邀请好友再分邀请奖池（每人上限 1000 WLFI）',
      '活动结束后 14 个工作日内在 Gate 账户核对 WLFI 到账；只认官方公告页，不点第三方活动链接'
    ],
    checklist_en: [
      'Open the official Gate announcement page and confirm the 192nd CandyDrop dates and task rules',
      'Register or sign in to a Gate account and complete KYC (verify the official domain www.gate.com)',
      'Trade USD1 spot pairs during the event: a first-ever spot volume of at least 800 USD1 earns a fixed 100 WLFI (first-come, first-served)',
      'Trade WLFI to earn candies toward the 600,000 WLFI pool, and invite friends to share the referral pool (up to 1,000 WLFI per person)',
      'Check your Gate account for the WLFI credit within 14 working days after the event; use the official announcement page only, never third-party campaign links'
    ],
    checklist_links: ['https://www.gate.com/announcements/article/102764', '', '', '', '']
  },
  {
    id: 'airdrop-20261116-vibevibe',
    name_zh: 'VIBEVIBE 测试网（Robinhood Chain，5% 总量测试网奖励池）',
    name_en: 'VIBEVIBE Testnet (Robinhood Chain, 5% of Supply for Testnet Rewards)',
    desc_zh: '约 30 分钟上手 + 持续测试网操作 · 测试网 0 资金（免费测试 ETH）：Seedify 团队做的 Robinhood Chain 无许可发币平台 vibe/vibe，测试网已上线（Season 0 进行中）；官方代币经济确认测试网用户与创作者共分 5% 总量（5000 万枚 VIBEVIBE），另有 25% 分给 SPARK 持币者（快照尚未进行，在 11 月 12 日公售之后）；TGE 预计 11 月，确切日期与个人分配公式均未公布。注意：测试网不需要持有 SPARK；公售需 KYC 且有地域限制，与测试网奖励是两回事；只用免费测试 ETH，不索要私钥/助记词，只认官方域名 vibevibe.fun / testnet.vibevibe.fun，谨防仿冒。',
    desc_en: '~30 minutes to start + ongoing testnet activity · zero cost on testnet (free test ETH): vibe/vibe, a permissionless token launchpad on Robinhood Chain from the Seedify team, has its testnet live (Season 0 in progress). Official tokenomics reserve 5% of supply (50M VIBEVIBE) for testnet users and builders, plus 25% for SPARK holders (snapshot not yet taken — it follows the Nov 12 public sale). TGE is expected in November, but the exact date and the per-user allocation formula are unannounced. Note: testnet participation does not require holding SPARK; the public sale needs KYC, has geographic restrictions, and is separate from testnet rewards. Only free test ETH is used; never share private keys/mnemonics. Official domains only: vibevibe.fun / testnet.vibevibe.fun — beware of fakes.',
    deadline: '',
    tags: [
      { zh: '测试网交互', en: 'Testnet' },
      { zh: '潜在空投（5% 已确认分配）', en: 'Potential airdrop (5% allocation confirmed)' },
      { zh: '需连接钱包', en: 'Wallet required' },
      { zh: '0 资金（测试网）', en: 'Zero cost (testnet)' }
    ],
    link: 'https://testnet.vibevibe.fun',
    checklist_zh: [
      '打开官方测试网 testnet.vibevibe.fun（认准官方域名，勿点第三方空投链接）',
      '在钱包添加 Robinhood Chain 测试网（链 ID 46630），并从官方水龙头领免费测试 ETH',
      '用全新测试钱包连接测试网，体验发币、交易与项目创建功能',
      '参与 Season 0 活动，留意官方排行榜与毕业空投注册（vibevibe.fun/airdrops）',
      '留意官方公布的 TGE 日期与个人分配规则，不轻信非官方代币合约'
    ],
    checklist_en: [
      'Open the official testnet testnet.vibevibe.fun (verify the official domain; do not click third-party airdrop links)',
      'Add the Robinhood Chain Testnet (chain ID 46630) to your wallet and claim free test ETH from the official faucet',
      'Connect with a fresh test wallet and try token launches, trading and project creation',
      'Take part in Season 0 and watch the official leaderboards and graduation-airdrop registration (vibevibe.fun/airdrops)',
      'Watch official announcements for the TGE date and per-user allocation rules — do not trust unofficial token contracts'
    ],
    checklist_links: ['https://testnet.vibevibe.fun', 'https://faucet.testnet.chain.robinhood.com', '', 'https://vibevibe.fun/airdrops', '']
  },
  {
    id: 'airdrop-20261112-grass-stage2',
    name_zh: 'Grass Stage 2 USDC 领取（仅限老参与者，2027 年 1 月 22 日截止）',
    name_en: 'Grass Stage 2 USDC Claim (Existing Participants Only, Closes Jan 22, 2027)',
    desc_zh: '约 10 分钟核对 + 连接钱包领取 · 0 新增资金（仅 Solana gas + 每笔 0.15 美元 Turnkey 手续费）：仅限 2024 年 10 月 14 日至 2026 年 6 月 8 日期间分享带宽赚过 Network Points（Epoch 1–19，须大于 0 分）的老用户；奖励按每 Network Point 0.0049 USDC 折算，以 USDC（Solana）发放，不新增发 GRASS 代币，持有 GRASS 不影响资格；领取窗口 2026 年 7 月 22 日至 2027 年 1 月 22 日，逾期未领作废，且全部领完可能提前关闭。注意：新用户无法参与；只认官方仪表盘 app.grass.io/dashboard（奖励条款指定的唯一领取站），不索要私钥/助记词，谨防仿冒领取站。',
    desc_en: '~10 minutes to check + connect wallet to claim · no new funds (Solana gas only + a $0.15 Turnkey fee per transaction): for existing Grass users only — those who earned Network Points (Epochs 1–19, more than 0 points) by sharing bandwidth between Oct 14, 2024 and Jun 8, 2026. Rewards convert at $0.0049 USDC per Network Point and pay out in USDC on Solana; no new GRASS is minted and holding GRASS does not affect eligibility. The claim window runs Jul 22, 2026 to Jan 22, 2027; unclaimed rewards expire and the window may close early once all allocations are claimed. Note: new users cannot join. Official dashboard only: app.grass.io/dashboard — the only claim site named in the Rewards Terms. Never share private keys/mnemonics; beware of fake claim sites.',
    deadline: '2027-01-22',
    tags: [
      { zh: '空投领取', en: 'Airdrop claim' },
      { zh: '仅限老参与者', en: 'Existing participants only' },
      { zh: '需连接钱包', en: 'Wallet required' },
      { zh: 'USDC 发放', en: 'Paid in USDC' }
    ],
    link: 'https://app.grass.io/dashboard',
    checklist_zh: [
      '直接在浏览器输入 app.grass.io/dashboard 打开官方仪表盘（勿点私信、回复或广告里的领取链接）',
      '登录 Stage 2 分享带宽时用的同一 Grass 账号，核对 USDC 分配额',
      '确认分配额与到账钱包（Solana），提交领取并支付少量 gas 与 0.15 美元 Turnkey 手续费',
      '在仪表盘核对 USDC 到账，不要买入 GRASS——持币不影响本次领取资格',
      '在 2027 年 1 月 22 日前完成领取，窗口可能提前关闭，不要拖到最后一天'
    ],
    checklist_en: [
      'Type app.grass.io/dashboard into your browser to open the official dashboard (never click claim links from DMs, replies or ads)',
      'Sign in with the same Grass account you used to share bandwidth in Stage 2 and check your USDC allocation',
      'Confirm the allocation and the receiving wallet (Solana), then submit the claim and pay the small gas fee plus the $0.15 Turnkey fee',
      'Verify the USDC credit on the dashboard — do not buy GRASS, as holding it does not affect this claim',
      'Finish before Jan 22, 2027; the window may close early, so do not leave it to the last day'
    ],
    checklist_links: ['https://app.grass.io/dashboard', '', '', '', '']
  },
  {
    id: 'airdrop-20261111-standx',
    name_zh: 'StandX DUSD 空投领取（取消发币，改发稳定币 DUSD，12 月 31 日截止）',
    name_en: 'StandX DUSD Airdrop Claim (Token Cancelled, Paid in DUSD Stablecoin, Closes Dec 31)',
    desc_zh: '约 10 分钟核对 + 连接钱包领取 · 0 新增资金（仅 gas）：仅限 StandX 老参与者——在 StandX 攒过积分或通过 Kaito 计划获分配的用户；项目 10 月 15 日宣布取消发币、改为一次性发放 DUSD 稳定币（无锁仓），领取窗口 11 月 2 日至 12 月 31 日 08:00（UTC），逾期未领作废；最终提现与 DUSD 赎回截止 2027 年 1 月 31 日。注意：新用户无法参与，分配额以官方查询页为准，官方明确不会通过私信索要助记词、不收解锁费；只认官方域名 standx.com，不索要私钥/助记词，谨防仿冒领取站。',
    desc_en: '~10 minutes to check + connect wallet to claim · no new funds (gas only): for existing StandX participants only — users who earned StandX points or received an allocation through the Kaito program. The project announced on Oct 15 it will not launch a token and will instead pay a one-time DUSD stablecoin distribution with no lockup; the claim window runs Nov 2 to Dec 31, 08:00 UTC, and unclaimed allocations expire. Final withdrawals and DUSD redemptions end Jan 31, 2027. Note: new users cannot join; amounts follow the official checker. The team will never DM you for a seed phrase or charge a fee to unlock a claim. Official domain only: standx.com, never share private keys/mnemonics; beware of fake claim sites.',
    deadline: '2026-12-31',
    tags: [
      { zh: '空投领取', en: 'Airdrop claim' },
      { zh: '仅限老参与者', en: 'Existing participants only' },
      { zh: '需连接钱包', en: 'Wallet required' },
      { zh: '0 新增资金', en: 'No new funds' }
    ],
    link: 'https://standx.com/airdrop',
    checklist_zh: [
      '直接在浏览器输入 standx.com/airdrop 打开官方领取页（勿点私信、回复或广告里的领取链接）',
      '连接在 StandX 活动时用的同一钱包（BNB Chain 或 Solana），核对 DUSD 分配额',
      '在 12 月 31 日 08:00（UTC）前提交领取，确认 DUSD 到账',
      '如需换回 USDT，按官方门户指引在 2027 年 1 月 31 日前完成赎回申请',
      '全程不向任何人提供助记词/私钥，不付任何“解锁费”'
    ],
    checklist_en: [
      'Type standx.com/airdrop into your browser to open the official claim page (never click claim links from DMs, replies or ads)',
      'Connect the same wallet you used on StandX (BNB Chain or Solana) and check your DUSD allocation',
      'Submit the claim before Dec 31, 08:00 UTC and confirm the DUSD credit',
      'To convert back to USDT, follow the official portal and submit the redemption request before Jan 31, 2027',
      'Never share your seed phrase or private key with anyone, and never pay any “unlock fee”'
    ],
    checklist_links: ['https://standx.com/airdrop', '', '', '', '']
  },
  {
    id: 'airdrop-20261109-aster-stage6',
    name_zh: 'Aster Stage 6 领取窗口（6400 万 ASTER，100% 归属）',
    name_en: 'Aster Stage 6 Claim Window (64M ASTER, 100% Vested)',
    desc_zh: '约 10 分钟核对 + 连接钱包领取 · 0 新增资金（仅 gas）：仅面向 Stage 6 老参与者——2026 年 2 月 2 日至 3 月 29 日 Stage 6 积分满 10000 且在 4 月 20 日至 5 月 2 日选了 6 个月全额归属的用户；6400 万枚 ASTER（占总量 0.8%）已于 11 月 4 日 20:00（北京时间）开放领取，领取后 100% 解锁、无后续锁仓。注意：官方窗口至 12 月 4 日 20:00（北京时间），但按安全线请在 11 月 28 日 20:00 前完成领取；新用户无法参与，已在 5 月领过 50% 的用户剩余部分已销毁、无可领。只认官方页 asterdex.com/en/airdrop，不索要私钥/助记词，谨防仿冒领取站。',
    desc_en: '~10 minutes to check + connect wallet to claim · no new funds (gas only): for Stage 6 participants only — those who scored at least 10,000 Stage 6 points (Feb 2–Mar 29, 2026) and chose the 6-month full-vesting option between Apr 20 and May 2. The 64M ASTER pool (0.8% of supply) opened for claims on Nov 4 at 12:00 UTC; claimed tokens are 100% unlocked with no further vesting. Note: the official window runs to Dec 4, 12:00 UTC, but claim by Nov 28, 20:00 Beijing time as the safe line. New users cannot join; anyone who took the 50% early claim in May has nothing left (the rest was burned). Official page only: asterdex.com/en/airdrop. Never share private keys/mnemonics; beware of fake claim sites.',
    deadline: '2026-11-28',
    tags: [
      { zh: '空投领取', en: 'Airdrop claim' },
      { zh: '仅限老参与者', en: 'Existing participants only' },
      { zh: '需连接钱包', en: 'Wallet required' },
      { zh: '0 新增资金', en: 'No new funds' }
    ],
    link: 'https://www.asterdex.com/en/airdrop',
    checklist_zh: [
      '直接在浏览器输入 asterdex.com/en/airdrop 打开官方领取页（勿点私信、回复或广告里的领取链接）',
      '连接 Stage 6 赚积分时用的同一钱包，核对 Stage 6（Convergence）分配',
      '确认领取数量与 100% 解锁状态，提交领取交易（按官方说明，仅需少量 gas）',
      '领取后在 Aster 应用内现货余额核对到账 ASTER',
      '11 月 28 日 20:00（北京时间）前完成领取，不要拖到官方窗口最后一天'
    ],
    checklist_en: [
      'Type asterdex.com/en/airdrop into your browser to open the official claim page (never click claim links from DMs, replies or ads)',
      'Connect the same wallet you used to earn Stage 6 points and check your Stage 6 (Convergence) allocation',
      'Confirm the claim amount and 100% unlocked status, then submit the claim transaction (only a small gas fee per official instructions)',
      'Verify the ASTER credit in your Aster app spot balance after claiming',
      'Finish before Nov 28, 20:00 Beijing time — do not leave it to the last day of the official window'
    ],
    checklist_links: ['https://www.asterdex.com/en/airdrop', '', '', '', '']
  },
  {
    id: 'airdrop-20261105-incentiv',
    name_zh: 'Incentiv 主网 Epoch 0 XP 活动（$CENT 空投积分）',
    name_en: 'Incentiv Mainnet Epoch 0 XP Campaign ($CENT Airdrop Points)',
    desc_zh: '约 30 分钟上手 + 持续链上操作 · 主网操作可能产生 gas/桥接成本：EVM 兼容 PoW Layer 1 Incentiv 的主网 XP 活动 Epoch 0 进行中，在官方 Portal 创建主网钱包、做链上转账/兑换/桥接等 UserOps 赚 XP，活动期间符合条件的新 UserOps XP 享 3 倍加成；XP 路线需至少 1000 XP 才有资格，初始分配池为用户类别 8500 万枚 $CENT（含 XP、测试网与社区贡献，不只面向新参与者）。注意：达标不保证获得分配，个人分配额与领取日期尚未公布，奖励按 3 个月锁仓 + 12 个月线性释放；已在交易所交易的 CENT 与 Epoch 0 空投分配是两回事。需连接/创建主网钱包，只认官方域名 portal.incentiv.io / docs.incentiv.io，不索要私钥/助记词。',
    desc_en: '~30 minutes to start + ongoing on-chain activity · mainnet activity may incur gas/bridge costs: EVM-compatible PoW Layer 1 Incentiv\'s mainnet XP campaign Epoch 0 is live — create a mainnet wallet in the official Portal and earn XP from on-chain transfers, swaps, bridging and other UserOps, with a temporary 3x boost on eligible new UserOps XP. The XP route requires at least 1,000 XP to qualify; the initial Users-category pool is 85M $CENT (covering XP, testnet and community contributions, not only new participants). Note: qualifying does not guarantee an allocation, individual amounts and claim dates are unannounced, and rewards vest over a 3-month cliff plus 12 months linear; CENT already trading on exchanges is separate from Epoch 0 airdrop allocations. Wallet connection/creation required; official domains only: portal.incentiv.io / docs.incentiv.io, never share private keys/mnemonics.',
    deadline: '2026-11-30',
    tags: [
      { zh: '积分计划', en: 'Points program' },
      { zh: '主网交互', en: 'Mainnet activity' },
      { zh: '需连接钱包', en: 'Wallet required' },
      { zh: '可能产生 gas/桥接成本', en: 'Possible gas/bridge costs' }
    ],
    link: 'https://portal.incentiv.io/',
    checklist_zh: [
      '打开官方 Portal portal.incentiv.io（认准官方域名，勿点第三方空投链接）',
      '创建主网钱包并连接社交账号，查看 XP 与徽章面板',
      '做链上 UserOps（转账、兑换、桥接等）赚 XP，争取 3 倍加成期内的操作',
      '累积至少 1000 XP 以满足 XP 路线资格门槛，并留意 Mystery Box 与成就任务',
      '11 月 30 日 10:00（UTC）截止前完成操作，之后按官方公告等分配与领取规则'
    ],
    checklist_en: [
      'Open the official Portal portal.incentiv.io (verify the official domain; do not click third-party airdrop links)',
      'Create a mainnet wallet, connect social accounts, and check your XP and badges panel',
      'Do on-chain UserOps (transfers, swaps, bridging) to earn XP, using the 3x boost window while it lasts',
      'Reach at least 1,000 XP to meet the XP-route qualification threshold, and check Mystery Boxes and achievement tasks',
      'Finish activity before the Nov 30, 10:00 UTC deadline, then wait for official allocation and claim rules'
    ],
    checklist_links: ['https://portal.incentiv.io/', '', '', '', '']
  },
];
