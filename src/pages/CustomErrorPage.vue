<script setup lang="ts">
import { isDomainAllowed } from '@/utils/domain'
import { getErrorConfig } from '@/data/errors'
import { useI18n } from '@/i18n'
import { useRoute } from 'vue-router'
import ErrorPage from '@/components/ErrorPage.vue'
import { computed } from 'vue'

const route = useRoute()
const { locale } = useI18n()
const allowed = isDomainAllowed()

// type 参数受域名限制，其他参数（message/title/code/lang）不受限制
const config = computed(() => {
  const type = route.query.type as string
  const hasType = !!type

  if (hasType && !allowed) {
    // 非白名单域名使用了 type 参数 → 忽略 type，回退到 403，但保留其他自定义参数
    const base = getErrorConfig('403', locale.value)
    return {
      ...base,
      title: (route.query.title as string) ?? base.title,
      description: (route.query.message as string) ?? base.description,
      code: (route.query.code as string) ?? base.code,
    }
  }

  if (hasType && allowed) {
    // 白名单域名使用 type 参数 → 正常显示自定义业务错误
    const base = getErrorConfig(type, locale.value)
    return {
      ...base,
      title: (route.query.title as string) ?? base.title,
      description: (route.query.message as string) ?? base.description,
      code: (route.query.code as string) ?? base.code,
    }
  }

  // 没有 type 参数 → 回退到 404，支持 message/title/code 覆盖
  const base = getErrorConfig('404', locale.value)
  return {
    ...base,
    title: (route.query.title as string) ?? base.title,
    description: (route.query.message as string) ?? base.description,
    code: (route.query.code as string) ?? base.code,
  }
})
</script>

<template>
  <ErrorPage :config="config" />
</template>
