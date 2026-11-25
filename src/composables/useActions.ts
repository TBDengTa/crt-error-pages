import { useRouter } from 'vue-router'
import type { ErrorAction } from '@/types/error'

function getUrlParam(key: string): string | null {
  if (typeof window === 'undefined') return null
  return new URLSearchParams(window.location.search).get(key)
}

export function useActions() {
  const router = useRouter()

  function handleAction(action: ErrorAction) {
    const homeUrl = getUrlParam('home_url')
    const contactUrl = getUrlParam('contact_url')

    switch (action.type) {
      case 'back':
        router.back()
        break
      case 'home':
        window.location.href = homeUrl || '/'
        break
      case 'retry':
        window.location.reload()
        break
      case 'contact':
        window.location.href = contactUrl || action.href || '/'
        break
      case 'custom':
        if (action.href) window.location.href = action.href
        break
    }
  }

  return { handleAction }
}
