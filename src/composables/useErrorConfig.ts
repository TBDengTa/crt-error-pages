import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getErrorConfig } from '@/data/errors'
import { useI18n } from '@/i18n'
import type { ErrorConfig } from '@/types/error'

/** HTTP 错误页 — 支持 query 参数覆盖 */
export function useHttpErrorConfig() {
  const route = useRoute()
  const { locale } = useI18n()
  return computed<ErrorConfig>(() => {
    const code = route.params.code as string
    const base = getErrorConfig(code, locale.value)
    return {
      ...base,
      title: (route.query.title as string) ?? base.title,
      description: (route.query.message as string) ?? base.description,
      code: (route.query.code as string) ?? base.code,
    }
  })
}

/** 自定义业务错误页 — 仅限白名单域名 */
export function useCustomErrorConfig() {
  const route = useRoute()
  const { locale } = useI18n()
  return computed<ErrorConfig>(() => {
    const type = route.query.type as string
    if (!type) return getErrorConfig('404', locale.value)
    const base = getErrorConfig(type, locale.value)
    return {
      ...base,
      title: (route.query.title as string) ?? base.title,
      description: (route.query.message as string) ?? base.description,
      code: (route.query.code as string) ?? base.code,
    }
  })
}
