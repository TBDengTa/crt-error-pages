import { ref, onUnmounted } from 'vue'

export function useTypewriter(speed = 45) {
  const displayText = ref('')
  const isTyping = ref(false)
  let timer: ReturnType<typeof setTimeout> | null = null
  let cancelled = false

  function typeText(text: string): Promise<void> {
    return new Promise((resolve) => {
      if (cancelled) { resolve(); return }
      let i = 0
      displayText.value = ''
      isTyping.value = true

      function tick() {
        if (cancelled) { resolve(); return }
        if (i < text.length) {
          displayText.value += text[i]
          i++
          timer = setTimeout(tick, speed + Math.random() * 30)
        } else {
          isTyping.value = false
          resolve()
        }
      }
      tick()
    })
  }

  function cancel() {
    cancelled = true
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    isTyping.value = false
  }

  function reset() {
    cancel()
    cancelled = false
    displayText.value = ''
  }

  onUnmounted(() => {
    cancel()
  })

  return { displayText, isTyping, typeText, cancel, reset }
}
