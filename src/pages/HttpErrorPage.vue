<script setup lang="ts">
import { useHttpErrorConfig } from '@/composables/useErrorConfig'
import ErrorPage from '@/components/ErrorPage.vue'

const config = useHttpErrorConfig()
</script>

<template>
  <ErrorPage :config="config" />
</template>
