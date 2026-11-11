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
    id: 'airdrop-20261108-vearl',
    name_zh: 'Vearl 公开 GPU 挖矿测试网（0.7% 主网供应分配）',
    name_en: 'Vearl Public GPU-Mining Testnet (0.7% of Mainnet Supply)',
    desc_zh: '需 GPU 与电费 + 至少 3 天活跃挖矿 · 测试网挖矿：公开 GPU 挖矿测试网 10 月 23 日上线，官方参与页明确为本轮测试网的合格矿工预留主网最大供应量的 0.7%（五轮测试网合计 7%）；每出 1 个块得 1 分、付费任务 1.5 分，达标需至少 3 个活跃日、占总积分至少 0.005% 并签署奖励地址注册。注意：需自备 GPU 与电费，挖矿软件只从官网 vearl.org 下载，不要在存有主钱包的机器上跑矿机；分配以官方规则为准。只认官方域名 vearl.org，不索要私钥/助记词。',
    desc_en: 'GPU and electricity costs + at least 3 active days of mining · testnet mining: the public GPU-mining testnet opened on Oct 23, and the official participate page reserves 0.7% of maximum mainnet supply for this testnet\'s eligible miners (7% across five planned testnets); miners earn 1 point per block and 1.5 points for paid work. Qualifying needs at least 3 active days, at least 0.005% of total points and a signed reward-address registration. Note: you need your own GPU and electricity; download the miner only from the official site vearl.org and never run mining software on a machine holding your main wallet. Official rules prevail. Official domain only: vearl.org, never share private keys/mnemonics.',
    deadline: '',
    tags: [
      { zh: '测试网交互', en: 'Testnet' },
      { zh: '挖矿', en: 'GPU mining' },
      { zh: '需 GPU 与电费', en: 'GPU and electricity costs' },
      { zh: '已明确分配 0.7%', en: 'Defined 0.7% allocation' }
    ],
    link: 'https://vearl.org/',
    checklist_zh: [
      '打开官网 vearl.org（认准官方域名，只从官网下载矿机软件）',
      '在官网完成奖励地址注册并签署注册信息',
      '在不存主钱包的机器上安装矿机并开始挖矿，累计至少 3 个活跃日',
      '争取占总积分至少 0.005%，留意付费任务 1.5 分的加成',
      '留意官方公布的测试网结束与分配规则，核对奖励地址'
    ],
    checklist_en: [
      'Open the official site vearl.org (verify the official domain; download the miner only from there)',
      'Complete the reward-address registration on the official site and sign it',
      'Install the miner on a machine that holds no main wallet and start mining for at least 3 active days',
      'Aim for at least 0.005% of total points, and note the 1.5-point bonus for paid work',
      'Watch official announcements for the testnet close and allocation rules, and double-check your reward address'
    ],
    checklist_links: ['https://vearl.org/', '', '', '', '']
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
  {
    id: 'airdrop-20261104-asentum',
    name_zh: 'Asentum 激励测试网 XP（ASE 空投积分）',
    name_en: 'Asentum Incentivized Testnet XP (ASE Airdrop Points)',
    desc_zh: '约 30 分钟上手 + 每天几分钟链上操作 · 测试网 0 资金：激励测试网自 9 月 17 日上线（链 ID 1423），做验证、换币、加流动性、签到与社交任务赚 XP，官方文档明确 XP 即未来 ASE 空投的计分方式；但转换公式、快照日期与 6000 万 ASE 之类的传闻数字均未公布，属未确认潜在机会。可选：质押真实主网 ASE 可获 2–10 倍 XP 加成，但有价格波动风险，非必需。需连接钱包，测试网请用全新钱包，只认官方域名 asentum.com / airdrop.asentum.com，不索要私钥/助记词。',
    desc_en: '~30 minutes to start + a few minutes of daily on-chain activity · zero cost on testnet: the incentivized testnet has been live since Sep 17 (chain ID 1423) — earn XP by validating, swapping, adding liquidity, daily check-ins and social tasks. Official docs state XP is how the future ASE airdrop is scored, but the conversion formula, snapshot dates and rumored figures such as 60M ASE are unpublished — unconfirmed potential only. Optional: staking real mainnet ASE multiplies XP 2x–10x but carries price risk and is not required. Wallet connection required; use a fresh wallet on testnet. Official domains only: asentum.com / airdrop.asentum.com, never share private keys/mnemonics.',
    deadline: '',
    tags: [
      { zh: '测试网交互', en: 'Testnet' },
      { zh: '潜在空投（XP 计分、规则未公布）', en: 'Potential airdrop (XP-scored, rules TBA)' },
      { zh: '需连接钱包', en: 'Wallet required' },
      { zh: '0 资金（可选真实质押加成）', en: 'Zero cost (optional real-stake boost)' }
    ],
    link: 'https://airdrop.asentum.com',
    checklist_zh: [
      '打开官方空投面板 airdrop.asentum.com（认准官方域名）',
      '连接钱包并完成注册签名，把 Asentum 测试网（链 ID 1423）加进钱包',
      '从官方水龙头领测试 ASE，开始验证、换币或加流动性赚 XP',
      '每天做签到与链上任务保持 XP 累积，注意每日上限',
      '留意官方公布的 XP 转换公式与快照规则，不轻信传闻的分配数字'
    ],
    checklist_en: [
      'Open the official airdrop dashboard airdrop.asentum.com (verify the official domain)',
      'Connect your wallet, sign the registration message, and add the Asentum testnet (chain ID 1423) to your wallet',
      'Claim test ASE from the official faucet, then validate, swap or add liquidity to earn XP',
      'Do the daily check-ins and on-chain tasks to keep XP accumulating, minding the daily caps',
      'Watch for the official XP conversion formula and snapshot rules — do not trust rumored allocation figures'
    ],
    checklist_links: ['https://airdrop.asentum.com', '', '', '', '']
  },
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
];
