import { ref, readonly } from 'vue'

export type Locale = 'zh-CN' | 'zh-TW' | 'en'

const LOCALES: Locale[] = ['zh-CN', 'zh-TW', 'en']

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  const params = new URLSearchParams(window.location.search)
  const forced = params.get('lang')
  if (forced === 'zh-CN' || forced === 'zh-TW' || forced === 'en') return forced

  const nav = navigator.language || 'en'
  if (nav.startsWith('zh-TW') || nav.startsWith('zh-Hant')) return 'zh-TW'
  if (nav.startsWith('zh')) return 'zh-CN'
  return 'en'
}

const locale = ref<Locale>(detectLocale())

type Messages = Record<string, string>

const zhCN: Messages = {
  'action.home': '返回首页',
  'action.back': '返回上页',
  'action.retry': '重试',
  'action.contact': '联系支持',
  'lang.zhc': '简体中文',
  'lang.zht': '繁體中文',
  'lang.en': 'English',
  'terminal.goodluck': '祝你好运。',
  'terminal.please_try': '请尝试',
  'terminal.or': '或',
  'terminal.skip': '跳过动画',

  'about.title': '关于 CRT Error Pages',
  'about.intro': 'CRT Error Pages 是一个开源的终端风格错误页面合集，基于 Vue 3、TypeScript 和 Vite 构建，无需后端即可部署到任意静态网站服务。',
  'about.features': '项目特性',
  'about.feature.crt': 'CRT 扫描线、噪点和打字机动画，支持跳过动画与减少动态效果偏好。',
  'about.feature.http': '内置 400、401、403、404、500、502、503、504 等标准 HTTP 错误页面。',
  'about.feature.custom': '支持地区限制、IP 限制、频率限制、维护中等业务错误场景。',
  'about.feature.i18n': '支持简体中文、繁体中文和英文，可根据浏览器语言自动切换。',
  'about.preview': '页面预览',
  'about.preview.alt': 'CRT Error Pages 桌面端页面截图',
  'about.preview.caption': '桌面端 404 错误页面',
  'about.quickstart': '快速开始',
  'about.quickstart.desc': '克隆仓库、安装依赖，然后启动本地开发服务器。',
  'about.routes': '页面路由',
  'about.routes.http': '标准 HTTP 错误页，例如 /404、/500。',
  'about.routes.custom': '自定义业务错误页，例如 /custom?type=maintenance。',
  'about.routes.about': '项目介绍、使用说明和配置文档。',
  'about.params': '自定义参数',
  'about.params.desc': '支持 title、message、code、home_url、contact_url 和 lang 参数。自定义内容参数需要在 VITE_ALLOWED_DOMAINS 中允许当前域名，lang 参数始终可用。',
  'about.config': '域名配置',
  'about.config.desc': '复制 .env.example 为 .env.local，配置 VITE_ALLOWED_DOMAINS。本地默认允许 localhost 和 127.0.0.1；生产环境请加入自己的域名。设置为 * 可允许所有域名，但公共部署不建议这样做。',
  'about.deploy': '构建与部署',
  'about.deploy.desc': '运行 npm run build 生成 dist 目录，将其部署到静态服务器，并配置所有路由回退到 index.html。',
  'about.license': '开源许可',
  'about.license.desc': '本项目基于 MIT 许可证开源，可自由使用、修改和分发。',
  'about.support': '社区与反馈',
  'about.support.desc': '欢迎提交 Issue 或 Pull Request，一起改进这个项目。',
  'about.repository': '查看 GitHub 仓库',
  'about.return': '返回首页',

  'error.400.title': '请求错误',
  'error.400.description': '服务器无法理解您发送的请求。请检查请求参数后重试。',
  'error.401.title': '未授权',
  'error.401.description': '您需要登录才能访问此页面。请先进行身份验证。',
  'error.403.title': '禁止访问',
  'error.403.description': '您没有权限访问此资源。如需帮助，请联系管理员。',
  'error.404.title': '页面未找到',
  'error.404.description': '您访问的页面可能已被移除、更名或暂时不可用。',
  'error.500.title': '服务器内部错误',
  'error.500.description': '服务器出现了问题，我们的技术团队已收到通知，正在处理中。',
  'error.502.title': '网关错误',
  'error.502.description': '上游服务器返回了无效响应。请稍后重试。',
  'error.503.title': '服务不可用',
  'error.503.description': '服务暂时不可用，可能正在维护中。请稍后重试。',
  'error.504.title': '网关超时',
  'error.504.description': '服务器响应超时。请稍后重试。',
  'error.geo-blocked.title': '地区限制',
  'error.geo-blocked.description': '您所在的地区暂时无法使用此服务。此限制基于您的地理位置。',
  'error.ip-blocked.title': 'IP 限制',
  'error.ip-blocked.description': '您的 IP 地址已被限制访问此服务。如需帮助，请联系管理员。',
  'error.rate-limited.title': '请求过于频繁',
  'error.rate-limited.description': '您的请求过于频繁。请降低请求频率后重试。',
  'error.maintenance.title': '维护中',
  'error.maintenance.description': '我们正在进行系统维护，预计很快就会恢复。感谢您的耐心。',
  'error.service-unavailable.title': '服务不可用',
  'error.service-unavailable.description': '服务暂时不可用。请稍后重试或联系技术支持。',
  'error.gateway-timeout.title': '网关超时',
  'error.gateway-timeout.description': '请求处理超时。请稍后重试。',
  'error.generic.title': '出现了问题',
  'error.generic.description': '发生了意外错误。请稍后重试。',
}

const zhTW: Messages = {
  'action.home': '返回首頁',
  'action.back': '返回上頁',
  'action.retry': '重試',
  'action.contact': '聯繫支援',
  'lang.zhc': '简体中文',
  'lang.zht': '繁體中文',
  'lang.en': 'English',
  'terminal.goodluck': '祝你好運。',
  'terminal.please_try': '請嘗試',
  'terminal.or': '或',
  'terminal.skip': '跳過動畫',

  'about.title': '關於 CRT Error Pages',
  'about.intro': 'CRT Error Pages 是一個開源的終端機風格錯誤頁面合集，基於 Vue 3、TypeScript 和 Vite 建置，無需後端即可部署到任意靜態網站服務。',
  'about.features': '專案特性',
  'about.feature.crt': 'CRT 掃描線、雜訊和打字機動畫，支援跳過動畫與減少動態效果偏好。',
  'about.feature.http': '內建 400、401、403、404、500、502、503、504 等標準 HTTP 錯誤頁面。',
  'about.feature.custom': '支援地區限制、IP 限制、頻率限制、維護中等業務錯誤場景。',
  'about.feature.i18n': '支援簡體中文、繁體中文和英文，可根據瀏覽器語言自動切換。',
  'about.preview': '頁面預覽',
  'about.preview.alt': 'CRT Error Pages 桌面版頁面截圖',
  'about.preview.caption': '桌面版 404 錯誤頁面',
  'about.quickstart': '快速開始',
  'about.quickstart.desc': '複製專案倉庫、安裝依賴，然後啟動本機開發伺服器。',
  'about.routes': '頁面路由',
  'about.routes.http': '標準 HTTP 錯誤頁，例如 /404、/500。',
  'about.routes.custom': '自訂業務錯誤頁，例如 /custom?type=maintenance。',
  'about.routes.about': '專案介紹、使用說明和設定文件。',
  'about.params': '自訂參數',
  'about.params.desc': '支援 title、message、code、home_url、contact_url 和 lang 參數。自訂內容參數需要在 VITE_ALLOWED_DOMAINS 中允許目前網域，lang 參數始終可用。',
  'about.config': '網域設定',
  'about.config.desc': '複製 .env.example 為 .env.local，設定 VITE_ALLOWED_DOMAINS。本機預設允許 localhost 和 127.0.0.1；正式環境請加入自己的網域。設定為 * 可允許所有網域，但公開部署不建議這樣做。',
  'about.deploy': '建置與部署',
  'about.deploy.desc': '執行 npm run build 產生 dist 目錄，將其部署到靜態伺服器，並設定所有路由回退到 index.html。',
  'about.license': '開源授權',
  'about.license.desc': '本專案基於 MIT 授權條款開源，可自由使用、修改和散布。',
  'about.support': '社群與回饋',
  'about.support.desc': '歡迎提交 Issue 或 Pull Request，一起改善這個專案。',
  'about.repository': '查看 GitHub 倉庫',
  'about.return': '返回首頁',

  'error.400.title': '請求錯誤',
  'error.400.description': '伺服器無法理解您發送的請求。請檢查請求參數後重試。',
  'error.401.title': '未授權',
  'error.401.description': '您需要登入才能存取此頁面。請先進行身份驗證。',
  'error.403.title': '禁止存取',
  'error.403.description': '您沒有權限存取此資源。如需幫助，請聯繫管理員。',
  'error.404.title': '頁面未找到',
  'error.404.description': '您存取的頁面可能已被移除、更名或暫時不可用。',
  'error.500.title': '伺服器內部錯誤',
  'error.500.description': '伺服器出現了問題，我們的技術團隊已收到通知，正在處理中。',
  'error.502.title': '閘道錯誤',
  'error.502.description': '上游伺服器返回了無效回應。請稍後重試。',
  'error.503.title': '服務不可用',
  'error.503.description': '服務暫時不可用，可能正在維護中。請稍後重試。',
  'error.504.title': '閘道逾時',
  'error.504.description': '伺服器回應逾時。請稍後重試。',
  'error.geo-blocked.title': '地區限制',
  'error.geo-blocked.description': '您所在的地區暫時無法使用此服務。此限制基於您的地理位置。',
  'error.ip-blocked.title': 'IP 限制',
  'error.ip-blocked.description': '您的 IP 位址已被限制存取此服務。如需幫助，請聯繫管理員。',
  'error.rate-limited.title': '請求過於頻繁',
  'error.rate-limited.description': '您的請求過於頻繁。請降低請求頻率後重試。',
  'error.maintenance.title': '維護中',
  'error.maintenance.description': '我們正在進行系統維護，預計很快就會恢復。感謝您的耐心。',
  'error.service-unavailable.title': '服務不可用',
  'error.service-unavailable.description': '服務暫時不可用。請稍後重試或聯繫技術支援。',
  'error.gateway-timeout.title': '閘道逾時',
  'error.gateway-timeout.description': '請求處理逾時。請稍後重試。',
  'error.generic.title': '出現了問題',
  'error.generic.description': '發生了意外錯誤。請稍後重試。',
}

const en: Messages = {
  'action.home': 'RETURN TO THE HOMEPAGE',
  'action.back': 'GO BACK',
  'action.retry': 'TRY AGAIN',
  'action.contact': 'CONTACT SUPPORT',
  'lang.zhc': '简体中文',
  'lang.zht': '繁體中文',
  'lang.en': 'English',
  'terminal.goodluck': 'GOOD LUCK.',
  'terminal.please_try': 'PLEASE TRY TO',
  'terminal.or': 'OR',
  'terminal.skip': 'SKIP',

  'about.title': 'ABOUT CRT ERROR PAGES',
  'about.intro': 'CRT Error Pages is an open-source collection of terminal-style error pages built with Vue 3, TypeScript, and Vite. It requires no backend and can be deployed to any static hosting service.',
  'about.features': 'FEATURES',
  'about.feature.crt': 'CRT scanlines, noise, and typewriter animations with skip and reduced-motion support.',
  'about.feature.http': 'Built-in pages for 400, 401, 403, 404, 500, 502, 503, and 504 HTTP errors.',
  'about.feature.custom': 'Business error scenarios including region restrictions, IP blocks, rate limits, and maintenance.',
  'about.feature.i18n': 'Simplified Chinese, Traditional Chinese, and English with automatic browser-language detection.',
  'about.preview': 'PREVIEW',
  'about.preview.alt': 'CRT Error Pages desktop screenshot',
  'about.preview.caption': 'Desktop 404 error page',
  'about.quickstart': 'QUICK START',
  'about.quickstart.desc': 'Clone the repository, install dependencies, and start the local development server.',
  'about.routes': 'ROUTES',
  'about.routes.http': 'Standard HTTP error page, such as /404 or /500.',
  'about.routes.custom': 'Custom business error page, such as /custom?type=maintenance.',
  'about.routes.about': 'Project introduction, usage guide, and configuration documentation.',
  'about.params': 'CUSTOM PARAMETERS',
  'about.params.desc': 'Supports title, message, code, home_url, contact_url, and lang. Custom content parameters require the current domain to be allowed in VITE_ALLOWED_DOMAINS. The lang parameter is always available.',
  'about.config': 'DOMAIN CONFIGURATION',
  'about.config.desc': 'Copy .env.example to .env.local and configure VITE_ALLOWED_DOMAINS. Local development allows localhost and 127.0.0.1 by default; add your production domains as needed. Set it to * to allow every domain, which is not recommended for public deployments.',
  'about.deploy': 'BUILD & DEPLOY',
  'about.deploy.desc': 'Run npm run build to generate the dist directory, deploy it to a static server, and configure all routes to fall back to index.html.',
  'about.license': 'OPEN-SOURCE LICENSE',
  'about.license.desc': 'This project is open source under the MIT License and is free to use, modify, and distribute.',
  'about.support': 'COMMUNITY & FEEDBACK',
  'about.support.desc': 'Issues and pull requests are welcome.',
  'about.repository': 'VIEW THE GITHUB REPOSITORY',
  'about.return': 'RETURN TO HOMEPAGE',

  'error.400.title': 'Bad Request',
  'error.400.description': 'THE SERVER COULD NOT UNDERSTAND THE REQUEST YOU SENT. PLEASE CHECK YOUR PARAMETERS AND TRY AGAIN.',
  'error.401.title': 'Unauthorized',
  'error.401.description': 'YOU NEED TO SIGN IN TO ACCESS THIS PAGE. PLEASE AUTHENTICATE FIRST.',
  'error.403.title': 'Forbidden',
  'error.403.description': "YOU DON'T HAVE PERMISSION TO ACCESS THIS RESOURCE. CONTACT THE ADMINISTRATOR IF YOU NEED HELP.",
  'error.404.title': 'Page Not Found',
  'error.404.description': 'THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED, HAD ITS NAME CHANGED OR IS TEMPORARILY UNAVAILABLE.',
  'error.500.title': 'Internal Server Error',
  'error.500.description': 'SOMETHING WENT WRONG ON OUR END. OUR TECHNICAL TEAM HAS BEEN NOTIFIED AND IS WORKING ON IT.',
  'error.502.title': 'Bad Gateway',
  'error.502.description': 'WE RECEIVED AN INVALID RESPONSE FROM UPSTREAM. PLEASE TRY AGAIN SHORTLY.',
  'error.503.title': 'Service Unavailable',
  'error.503.description': 'THE SERVICE IS TEMPORARILY UNAVAILABLE, POSSIBLY DUE TO MAINTENANCE. PLEASE TRY AGAIN LATER.',
  'error.504.title': 'Gateway Timeout',
  'error.504.description': 'THE SERVER TOOK TOO LONG TO RESPOND. PLEASE TRY AGAIN.',
  'error.geo-blocked.title': 'Region Restricted',
  'error.geo-blocked.description': 'THIS SERVICE IS NOT AVAILABLE IN YOUR CURRENT REGION. THIS RESTRICTION IS BASED ON YOUR GEOGRAPHIC LOCATION.',
  'error.ip-blocked.title': 'Access Restricted',
  'error.ip-blocked.description': 'YOUR IP ADDRESS HAS BEEN RESTRICTED FROM ACCESSING THIS SERVICE. CONTACT THE ADMINISTRATOR IF YOU NEED HELP.',
  'error.rate-limited.title': 'Too Many Requests',
  'error.rate-limited.description': "YOU'VE MADE TOO MANY REQUESTS. PLEASE SLOW DOWN AND TRY AGAIN LATER.",
  'error.maintenance.title': 'Under Maintenance',
  'error.maintenance.description': "WE'RE PERFORMING SCHEDULED MAINTENANCE AND WILL BE BACK SHORTLY. THANK YOU FOR YOUR PATIENCE.",
  'error.service-unavailable.title': 'Service Unavailable',
  'error.service-unavailable.description': 'THE SERVICE IS TEMPORARILY UNAVAILABLE. PLEASE TRY AGAIN LATER OR CONTACT SUPPORT.',
  'error.gateway-timeout.title': 'Gateway Timeout',
  'error.gateway-timeout.description': 'THE REQUEST TIMED OUT. PLEASE TRY AGAIN.',
  'error.generic.title': 'Something Went Wrong',
  'error.generic.description': 'AN UNEXPECTED ERROR OCCURRED. PLEASE TRY AGAIN LATER.',
}

const locales: Record<Locale, Messages> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en': en,
}

export function t(key: string, loc: Locale): string {
  return locales[loc][key] ?? locales['en'][key] ?? key
}

export function useI18n() {
  function setLocale(l: Locale) {
    locale.value = l
    document.documentElement.lang = l
    const url = new URL(window.location.href)
    url.searchParams.set('lang', l)
    window.history.replaceState({}, '', url.toString())
  }

  const currentLocale = readonly(locale)

  function translate(key: string) {
    return t(key, locale.value)
  }

  return {
    locale: currentLocale,
    setLocale,
    t: translate,
    locales: LOCALES,
  }
}
