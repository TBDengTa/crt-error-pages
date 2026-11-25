<script setup lang="ts">
import { useI18n, type Locale } from '@/i18n'

const { locale, setLocale } = useI18n()

const localeLabels: Record<Locale, string> = {
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'en': 'English',
}
</script>

<template>
  <div class="flex flex-row items-center gap-2 sm:gap-3">
    <button
      v-for="loc in (['zh-CN', 'zh-TW', 'en'] as Locale[])"
      :key="loc"
      @click="setLocale(loc)"
      :class="[
        'transition-colors cursor-pointer',
        locale === loc
          ? 'crt-text'
          : 'crt-text-dim opacity-40 hover:opacity-70',
      ]"
    >
      [{{ localeLabels[loc] }}]
    </button>
  </div>
</template>
