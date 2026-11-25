<script setup lang="ts">
import type { ErrorConfig, ErrorAction } from '@/types/error'
import { useI18n } from '@/i18n'
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import { useTypewriter } from '@/composables/useTypewriter'
import LanguageSwitcher from './LanguageSwitcher.vue'

const props = defineProps<{ config: ErrorConfig }>()
const { t } = useI18n()

const phase = ref<'boot' | 'title' | 'desc' | 'actions' | 'goodluck' | 'done' | 'command'>('boot')
const titleText = computed(() => `ERROR ${props.config.code}`)

const titleTw = useTypewriter(55)
const descTw = useTypewriter(28)
const actionTw = useTypewriter(28)
const luckTw = useTypewriter(45)
const cmdTw = useTypewriter(45)

const commandExecuting = ref(false)
const terminalRef = ref<HTMLElement | null>(null)

interface ActionSegment { text: string; action?: ErrorAction; isLink: boolean }
const actionSegments = ref<ActionSegment[]>([])

function buildActionSegments(): { plain: string; segments: ActionSegment[] } {
  const acts = props.config.actions
  const segs: ActionSegment[] = []
  let plain = ''
  const please = t('terminal.please_try') + ' '
  segs.push({ text: please, isLink: false }); plain += please
  acts.forEach((action, idx) => {
    const linkText = `[${action.label}]`
    segs.push({ text: linkText, action, isLink: true }); plain += linkText
    if (idx < acts.length - 1) {
      const or = ' ' + t('terminal.or') + ' '
      segs.push({ text: or, isLink: false }); plain += or
    }
  })
  segs.push({ text: '.', isLink: false }); plain += '.'
  return { plain, segments: segs }
}

function scrollToBottom() {
  nextTick(() => { if (terminalRef.value) terminalRef.value.scrollTop = terminalRef.value.scrollHeight })
}

let runId = 0
async function runSequence() {
  const myRun = ++runId
  titleTw.reset(); descTw.reset(); actionTw.reset(); luckTw.reset(); cmdTw.reset()
  commandExecuting.value = false; actionSegments.value = []

  phase.value = 'boot'
  await new Promise(r => setTimeout(r, 200))
  if (runId !== myRun) return

  phase.value = 'title'
  await titleTw.typeText(titleText.value)
  if (runId !== myRun) return; scrollToBottom()
  await new Promise(r => setTimeout(r, 250))
  if (runId !== myRun) return

  phase.value = 'desc'
  await descTw.typeText(props.config.description)
  if (runId !== myRun) return; scrollToBottom()
  await new Promise(r => setTimeout(r, 250))
  if (runId !== myRun) return

  phase.value = 'actions'
  const { plain, segments } = buildActionSegments()
  await actionTw.typeText(plain)
  if (runId !== myRun) return
  actionSegments.value = segments; scrollToBottom()
  await new Promise(r => setTimeout(r, 300))
  if (runId !== myRun) return

  phase.value = 'goodluck'
  await luckTw.typeText(t('terminal.goodluck'))
  if (runId !== myRun) return; scrollToBottom()
  await new Promise(r => setTimeout(r, 200))
  if (runId !== myRun) return
  phase.value = 'done'
}

onMounted(() => { runSequence() })
watch(() => props.config, () => { if (phase.value !== 'command') runSequence() })

function skipAnimation() {
  runId++
  titleTw.reset(); descTw.reset(); actionTw.reset(); luckTw.reset(); cmdTw.reset()
  titleTw.displayText.value = titleText.value
  descTw.displayText.value = props.config.description
  const { plain, segments } = buildActionSegments()
  actionTw.displayText.value = plain; actionSegments.value = segments
  luckTw.displayText.value = t('terminal.goodluck')
  commandExecuting.value = false; phase.value = 'done'
}

function getUrlParam(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key)
}

async function executeCommand(label: string, action: ErrorAction) {
  if (phase.value === 'command' || commandExecuting.value) return
  phase.value = 'command'; commandExecuting.value = true
  await cmdTw.typeText(label); scrollToBottom()
  await new Promise(r => setTimeout(r, 500))
  const homeUrl = getUrlParam('home_url')
  const contactUrl = getUrlParam('contact_url')
  switch (action.type) {
    case 'back': window.history.back(); break
    case 'home': window.location.href = homeUrl || '/'; break
    case 'retry': window.location.reload(); break
    case 'contact': window.location.href = contactUrl || action.href || '/'; break
    case 'custom': if (action.href) window.location.href = action.href; break
  }
}
</script>

<template>
  <!-- CRT 屏幕 (所有内容和效果都在这里面) -->
  <div class="crt-screen">

    <!-- 终端内容 (z-5, 在扫描线之上) -->
    <div ref="terminalRef" class="crt-terminal overflow-y-auto">
      <div class="space-y-4 sm:space-y-5">

        <!-- 标题 ERROR 404 (白色，带光标) -->
        <h1 v-if="phase !== 'boot'" class="crt-text-bright font-mono font-bold text-3xl sm:text-5xl lg:text-6xl leading-tight select-none">
          {{ titleTw.displayText.value }}<span v-if="phase === 'title'" class="cursor-blink ml-1"></span>
        </h1>

        <!-- 描述 (> 前缀 + 打字机) -->
        <p v-if="phase !== 'boot' && phase !== 'title'" class="crt-text font-mono text-sm sm:text-base lg:text-lg leading-relaxed">
          <span class="crt-text-dim">&gt; </span>{{ descTw.displayText.value }}<span v-if="phase === 'desc'" class="cursor-blink ml-0.5"></span>
        </p>

        <!-- 操作行 (打字中 → 纯文本; 打完 → 带链接) -->
        <div v-if="phase !== 'boot' && phase !== 'title' && phase !== 'desc'" class="crt-text font-mono text-sm sm:text-base lg:text-lg leading-relaxed">
          <span class="crt-text-dim">&gt; </span>
          <template v-if="actionSegments.length === 0">
            {{ actionTw.displayText.value }}<span v-if="phase === 'actions'" class="cursor-blink ml-0.5"></span>
          </template>
          <template v-else>
            <template v-for="(seg, i) in actionSegments" :key="i">
              <a v-if="seg.isLink && seg.action" @click.prevent="executeCommand(seg.text.slice(1, -1), seg.action)" class="crt-link">{{ seg.text }}</a>
              <span v-else>{{ seg.text }}</span>
            </template>
          </template>
        </div>

        <!-- GOOD LUCK -->
        <p v-if="phase === 'goodluck' || phase === 'done' || phase === 'command'" class="crt-text font-mono text-sm sm:text-base lg:text-lg">
          <span class="crt-text-dim">&gt; </span>{{ luckTw.displayText.value }}<span v-if="phase === 'goodluck'" class="cursor-blink ml-0.5"></span>
        </p>

        <!-- 完成后等待输入 -->
        <div v-if="phase === 'done'" class="flex items-center gap-0 pt-2">
          <span class="crt-text-dim font-mono text-sm sm:text-base">&gt;&nbsp;</span>
          <span class="cursor-blink"></span>
        </div>

        <!-- 命令输入 -->
        <div v-if="phase === 'command'" class="flex items-center gap-0 pt-2">
          <span class="crt-text-dim font-mono text-sm sm:text-base">&gt;&nbsp;</span>
          <span class="cmd-line font-mono text-sm sm:text-base">{{ cmdTw.displayText.value }}</span>
          <span v-if="cmdTw.isTyping.value" class="cursor-blink ml-0.5"></span>
          <span v-else class="crt-text-dim font-mono text-sm sm:text-base opacity-50 ml-1">...</span>
        </div>

      </div>
    </div>

    <!-- 扫描线 + 滑动线 (::before) — 在终端内容之下 -->
    <div class="crt-overlay"></div>

    <!-- 噪点纹理 -->
    <svg class="crt-noise" xmlns="http://www.w3.org/2000/svg">
      <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
      <rect width="100%" height="100%" filter="url(#n)" />
    </svg>
  </div>

  <!-- 底部栏: 跳过 + 语言 -->
  <div class="lang-bar">
    <button
      v-if="phase !== 'done' && phase !== 'command'"
      @click="skipAnimation"
      class="crt-link cursor-pointer"
    >
      [{{ t('terminal.skip') }}]
    </button>
    <LanguageSwitcher />
  </div>
</template>
