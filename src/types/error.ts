export type ErrorCategory = 'http' | 'business'

export interface ErrorAction {
  label: string
  type: 'back' | 'home' | 'retry' | 'contact' | 'custom'
  href?: string
  variant: 'primary' | 'secondary'
}

export interface ErrorConfig {
  key: string
  category: ErrorCategory
  code: string
  title: string
  description: string
  illustration: string
  actions: ErrorAction[]
  statusCode?: number
}
