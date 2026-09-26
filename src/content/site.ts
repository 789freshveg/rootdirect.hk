/**
 * 有種直送 — centralised site content.
 * Single source of truth for wording, prices, delivery info and links.
 * Nothing below is duplicated anywhere else in the codebase.
 */

export const site = {
  name: "有種直送",
  nameEn: "Root Direct",
  title: "有種直送｜本地時令鮮菜・農場直送",
  description:
    "香港本地時令鮮菜。農場發辦當季菜包，清晨採摘、星期三直送，睇得到的信任。",
  keywords: [
    "香港本地蔬菜",
    "本地農場",
    "新鮮蔬菜",
    "蔬菜直送",
    "香港菜包",
    "本地菜包",
    "時令蔬菜",
    "農場直送",
    "香港農業",
  ],
  whatsapp: "+85290881857",
  whatsappHref: "https://wa.me/85290881857",
  instagram: "https://www.instagram.com/RootDirect.hk",
  facebook: "https://www.facebook.com/RootDirect.hk",
  youtube: "https://www.youtube.com/@RootDirect",
  jotform: "https://form.jotform.com/262508546542056",
} as const;

/** Main navigation (header + mobile menu). */
export const nav = [
  { href: "/", label: "菜包", en: "Package" },
  { href: "/howtoorder", label: "價格及訂購教學", en: "How to Order" },
  { href: "/about", label: "關於", en: "About" },
] as const;

/** Footer index — includes the order form and the admin console. */
export const footerNav = [
  { href: "/", label: "菜包", en: "Package" },
  { href: "/howtoorder", label: "價格及訂購教學", en: "How to Order" },
  { href: "/about", label: "關於", en: "About" },
  { href: "/order", label: "訂購", en: "Order" },
  { href: "/admin", label: "管理", en: "Admin" },
] as const;

/* ---------------------------------------------------------------- home */

export const hero = {
  eyebrow: "回歸食物本質",
  headline: "本地新鮮蔬菜，農場直送餐桌",
  cta: "立即訂購",
} as const;

/** Icons travel with their label, so reordering never mismatches them. */
export const sellingPoints = [
  { n: "01", label: "香港農場", en: "Local Farms", icon: "/icons/point-farm.png" },
  {
    n: "02",
    label: "再生農耕，種出菜味",
    en: "Regenerative Farming",
    icon: "/icons/point-fertilizer.png",
  },
  {
    n: "03",
    label: "清晨採摘，鮮菜直送",
    en: "Picked at Dawn",
    icon: "/icons/point-harvest.png",
  },
  { n: "04", label: "不時不食", en: "Seasonal Only", icon: "/icons/point-seasonal.png" },
] as const;

export const seasonal = {
  title: "11月菜包",
  en: "November Package",
  /** Highlighted in the copy — key selling information. */
  highlight: "3 款以上",
  currentCopy: "農場發辦，為你搭配 3 款以上時令蔬菜。清晨採摘，新鮮直送！",
  nextLabel: "下月預告",
  notice:
    "菜包內容或因天氣及收成調整，詳情請留意 Instagram、Facebook 或 WhatsApp 查詢。",
} as const;

/** 獨立菜款 — shown on Home under 11月菜包. */
export const items = {
  title: "獨立菜款",
  en: "By the Item",
  note: "部分菜款亦可單獨購買，歡迎填寫表格訂購。",
} as const;

export const boxPreview = {
  title: "菜包款式",
  en: "Vegetable Packages",
  items: [
    { name: "單次菜包", note: "適合第一次試菜" },
    { name: "月訂菜包", note: "連續 4 星期，每星期配送一次，免運費" },
    { name: "長期訂購", note: "WhatsApp 查詢" },
  ],
  cta: "查看價格及訂購教學",
} as const;

export const farmStory = {
  title: "睇得到的信任",
  en: "Farm Story",
  copy: "探索農場故事，見證蔬菜生長與農夫日常。",
  cta: "查看更多",
} as const;

export const delivery = {
  title: "運送安排",
  en: "Delivery",
  headline: "星期一截單，星期三清晨採摘，直送餐桌",
  steps: [
    { day: "MON", label: "星期一", detail: "20:00 截單" },
    { day: "WED", label: "星期三", detail: "清晨採摘" },
    { day: "WED", label: "星期三", detail: "11:00–17:00 直送" },
  ],
  notes: [
    "如星期三為公眾假期，順延至星期四送達。",
    "配送範圍：香港島、九龍及新界。",
    "到達前司機會以電話／WhatsApp 通知。",
    "菜包送至大廈管理處，或送到住所附近停車處自取。",
    "偏遠及離島地區暫不設配送。個別地區可 WhatsApp 另議。",
  ],
} as const;

/** Closing order band at the foot of the 菜包 Package (home) page. */
export const orderBand = {
  eyebrow: "Order — 立即訂購",
  statement: "本地新鮮蔬菜，農場直送餐桌",
  cta: "立即訂購",
} as const;

export const faq = {
  title: "常見問題",
  en: "FAQ",
  /** `bold` phrases render in bold black inside each answer. */
  items: [
    {
      q: "菜包裡會有甚麼蔬菜？",
      a: "農場發辦，每星期按時令收成搭配 3 款以上時令蔬菜。菜包內容或因天氣及收成調整，詳情請留意 Instagram 及 Facebook。",
      bold: ["農場發辦", "3 款以上"],
    },
    {
      q: "可以指定蔬菜嗎？",
      a: "菜包以農場發辦為主；如需指定蔬菜或有過敏考量，請於訂購表格備註，或 WhatsApp 查詢，我們會盡量安排。",
      bold: ["菜包以農場發辦為主"],
    },
    {
      q: "送貨時間可以指定嗎？",
      a: "固定於星期三 11:00–17:00 送達，到達前司機會以電話／WhatsApp 通知。如需其他安排，請提前 WhatsApp 聯絡。",
      bold: ["星期三 11:00–17:00 送達"],
    },
    {
      q: "若星期三是公眾假期？",
      a: "如星期三為公眾假期，配送將順延至星期四，詳細安排會透過 WhatsApp 通知。",
      bold: ["順延至星期四"],
    },
    {
      q: "如何付款？",
      a: "支援銀行轉賬、轉數快（FPS）及 PayMe。完成付款後上載截圖以確認訂單。",
      bold: [],
    },
    {
      q: "如何更改配送日期或退款？",
      a: "若配送日未能在港，請於星期一晚上 8 時截單前透過 WhatsApp 通知，我們會按個別情況，另行安排配送日期。\n\n若需退款，請透過 WhatsApp 提供訂購人姓名、訂單資料及付款證明；退款安排將按個別情況另行協議。",
      bold: ["星期一晚上 8 時截單前"],
    },
  ],
} as const;

/* --------------------------------------------------------------- order */

export const plans = {
  single: {
    name: "單次菜包",
    en: "Single Package",
    note: "+ $50 運費",
    rows: [
      { size: "3 斤", gram: "1800g", price: "$150", extra: "+ $50 運費" },
      { size: "4 斤", gram: "2400g", price: "$200", extra: "+ $50 運費" },
      { size: "5 斤", gram: "3000g", price: "$250", extra: "+ $50 運費" },
      { size: "10 斤", gram: "6000g", price: "$450", extra: "+ $50 運費" },
    ],
  },
  monthly: {
    name: "月訂菜包",
    en: "Monthly Package",
    note: "連續 4 星期，每星期送貨一次，免運費。",
    rows: [
      { size: "3 斤", gram: "1800g", price: "$600", extra: "免運費" },
      { size: "4 斤", gram: "2400g", price: "$800", extra: "免運費" },
      { size: "5 斤", gram: "3000g", price: "$1,000", extra: "免運費" },
      { size: "10 斤", gram: "6000g", price: "$1,800", extra: "免運費" },
    ],
  },
  longTerm: {
    name: "長期訂購",
    en: "Ongoing",
    note: "新舊客戶如想長期訂購，請 WhatsApp 查詢，另作安排。",
  },
} as const;

export const orderFlow = {
  title: "訂購步驟",
  en: "Order Steps",
  steps: [
    { n: "01", title: "填寫表格", copy: "選擇訂菜方案及填寫資料。" },
    { n: "02", title: "完成付款", copy: "支援銀行轉賬 / FPS / PayMe。" },
    { n: "03", title: "上載截圖", copy: "提交付款證明以確認訂單。" },
    { n: "04", title: "週三直送", copy: "逢週三送達，送貨前專人通知。" },
  ],
} as const;

export const payments = {
  title: "付款教學",
  en: "Payment",
  /** Emphasised in brand green at the end of every method's instruction. */
  highlight: "完成後，上載付款截圖以確認訂單。",
  methods: [
    {
      key: "bank",
      name: "銀行轉賬",
      detail:
        "請轉賬至以下帳戶，\n並於備註填寫訂購人姓名，\n完成後，上載付款截圖以確認訂單。",
    },
    {
      key: "fps",
      name: "轉數快 FPS",
      detail: "使用 FPS 轉帳至下列識別碼，\n完成後，上載付款截圖以確認訂單。",
    },
    {
      key: "payme",
      name: "PayMe",
      detail: "以 PayMe 付款至下列帳戶，\n完成後，上載付款截圖以確認訂單。",
    },
  ],
} as const;

/* --------------------------------------------------------------- about */

export const about = {
  eyebrow: "ABOUT US",
  title: "有種直送",
  titleEn: "Root Direct",
  intro: {
    /** 時令菜包・農夫故事・睇得到的信任 — rendered as three pillars. */
    pillars: [
      { zh: "農夫故事", en: "Farmer Stories" },
      { zh: "時令菜包", en: "Seasonal Package" },
      { zh: "睇得到的信任", en: "Visible Trust" },
    ],
    statement: [
      "透過農夫故事與時令菜包，讓大家看得見生產過程，建立「睇得到的信任」，",
      "同時支持本地農業、健康及環保的生活方式。",
    ],
  },
  why: {
    heading: "連結「有心種 × 有心買」",
    body: [
      "暴雨淹沒的農田、",
      "黑雨前無處銷售的南瓜，",
      "以及錯過花期的年花。",
      "重新連結「有心種 × 有心買」，",
      "讓每一份收成，都有機會找到懂得珍惜的人。",
    ],
    caption: "ORIGIN — 源起",
  },
  meaning: {
    glyph: "有種",
    rows: [
      { term: "種", def: "有心種植的人" },
      { term: "有種", def: "堅持的傻勁" },
    ],
    note: "「直送」不是強調速度，而是直接連結農場與顧客。",
    caption: "MEANING — 字義",
  },
  belief: {
    heading: "睇得到的信任",
    body: [
      "我們用真實食物與農夫日常，取代過度包裝。",
      "透過記錄農場日常及分享農夫故事，讓顧客看見每份收成背後的努力，也讓農夫得到更直接、合理的回報。",
    ],
    caption: "BELIEF — 信念",
  },
  chain: {
    title: "FARM TO TABLE",
    stages: [
      { zh: "農田", en: "Land" },
      { zh: "時令收成", en: "Harvest" },
      { zh: "菜包", en: "Package" },
      { zh: "餐桌", en: "Table" },
    ],
  },
  farms: {
    title: "合作農場",
    en: "Partner Farms",
    empty: "合作農場資料整理中。",
    /** Bolded wherever they appear in a farm introduction. */
    highlight: [
      "作物生產有機認證（IFOAM 認可）",
      "食本地鮮 Eat Local",
      "與不同學校合作",
      "再生農耕",
    ],
  },
  regenerative: {
    caption: "REGENERATIVE — 再生農耕",
    heading: "再生農耕，慢一點的耕作",
    body: [
      "再生農耕蔬菜的價值，在於農夫願意投入更多時間與心力，照顧土壤、觀察作物，維持農場的生態平衡。",
      "從使用堆肥、減少翻土，到種植覆蓋作物、保留生物多樣性，每一步都需長期投入資源，讓土地逐步恢復活力，同時減少農業對環境的負擔。",
      "健康的土壤，才能孕育出質感更好、味道更自然的蔬菜。好味，沒有捷徑。",
    ],
    /** Emphasised in the closing line. */
    highlight: "好味，沒有捷徑。",
    linkLabel: "Homeland Green",
    linkNote: "了解更多再生農耕",
    href: "https://www.homelandgreen.hk/",
    images: [
      { src: "images/about-seed.jpg", alt: "手心中的泥土與剛發芽的種子", caption: "養土 — 有機堆肥與覆蓋" },
      { src: "images/farm.jpg", alt: "香港農場中輪種的菜畦", caption: "輪種 — 保留生物多樣性" },
    ],
  },
} as const;

/** Seed values used when the database tables are still empty. */
export const seed = {
  hero: [
    { src: "images/hero-01.jpg", alt: "清晨的香港農田與菜田" },
    { src: "images/hero-02.jpg", alt: "農夫清晨採摘鮮菜" },
  ],
  seasonal: [
    { name: "菜心", src: "images/veg-01.jpg", period: "current" },
    { name: "芥蘭", src: "images/veg-02.jpg", period: "current" },
    { name: "南瓜", src: "images/about-land.jpg", period: "current" },
    { name: "本地蘿蔔", src: "images/veg-01.jpg", period: "current" },
    { name: "茼蒿", src: "images/veg-02.jpg", period: "current" },
    { name: "白菜", src: "images/hero-02.jpg", period: "current" },
    { name: "菠菜", src: "images/veg-01.jpg", period: "next" },
    { name: "西蘭花", src: "images/veg-02.jpg", period: "next" },
  ],
  products: [
    { name: "菜心", price: "$28 / 斤 (600g)", src: "images/veg-01.jpg" },
    { name: "芥蘭", price: "$32 / 斤 (600g)", src: "images/veg-02.jpg" },
    { name: "茼蒿", price: "$30 / 斤 (600g)", src: "images/hero-02.jpg" },
    { name: "南瓜", price: "$25 / 斤 (600g)", src: "images/about-land.jpg" },
    { name: "本地蘿蔔", price: "$22 / 斤 (600g)", src: "images/veg-01.jpg" },
    { name: "白菜", price: "$26 / 斤 (600g)", src: "images/veg-02.jpg" },
    { name: "生菜", price: "$24 / 斤 (600g)", src: "images/veg-02.jpg" },
    { name: "菠菜", price: "$30 / 斤 (600g)", src: "images/veg-01.jpg" },
    { name: "西蘭花", price: "$36 / 斤 (600g)", src: "images/about-harvest.jpg" },
    { name: "翠玉瓜", price: "$28 / 斤 (600g)", src: "images/about-land.jpg" },
  ],
  farms: [
    {
      name: "康苗有機農場",
      description:
        "位於錦田大江埔，由農夫昌哥耕耘超過 25 年，並獲作物生產有機認證（IFOAM 認可）。他一直鑽研有機及「再生農耕」，從自製有機魚肥、養土護泥到使用有機覆蓋物，細心照顧土地與作物。\n\n農場重視時令種植，按季節種植不同蔬菜，讓土地保持生機，也讓大家品嚐當造蔬菜的自然鮮甜。",
      images: ["images/farm.jpg", "images/veg-02.jpg"],
    },
    {
      name: "Eva 新鳳有機農場",
      description:
        "Eva 新鳳有機農場是香港少數實踐再生農耕的農場之一，並列於「食本地鮮 Eat Local」漁場農場會員名單。農夫 Eva 以健康土壤為起點，減少耕犁，善用有機肥料、覆蓋作物及多元生態，讓土地逐步恢復活力，種出強壯、健康、帶有自然香味的農作物。\n\n農場亦與不同學校合作，向學生介紹再生農耕，推廣珍惜食物及尊重土地的生活理念，讓更多人了解食物從農田到餐桌的過程。",
      images: ["images/about-harvest.jpg", "images/veg-01.jpg"],
    },
  ],
  payments: [
    { key: "bank", name: "銀行轉賬", detail: "", image: "images/payments/bank.png" },
    { key: "fps", name: "轉數快 FPS", detail: "", image: "images/payments/fps.png" },
    { key: "payme", name: "PayMe", detail: "", image: "images/payments/payme.png" },
  ],
  gallery: [
    { src: "images/about-harvest.jpg", caption: "清晨採收" },
    { src: "images/veg-02.jpg", caption: "當季葉菜" },
    { src: "images/farm.jpg", caption: "田間日常" },
    { src: "images/about-seed.jpg", caption: "育苗" },
    { src: "images/hero-02.jpg", caption: "帶土直送" },
    { src: "images/veg-01.jpg", caption: "菜包內容" },
    { src: "images/about-land.jpg", caption: "雨後農田" },
    { src: "images/about-table.jpg", caption: "餐桌上的當造" },
  ],
} as const;
