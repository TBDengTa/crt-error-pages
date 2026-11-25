const configuredDomains = ((import.meta.env.VITE_ALLOWED_DOMAINS as string | undefined) ?? '')
  .split(',')
  .map(domain => domain.trim().toLowerCase())
  .filter(Boolean)

const ALLOWED_DOMAINS = ['localhost', '127.0.0.1', ...configuredDomains]

export function isDomainAllowed(): boolean {
  if (typeof window === 'undefined') return true
  if (ALLOWED_DOMAINS.includes('*')) return true

  const hostname = window.location.hostname.toLowerCase()
  return ALLOWED_DOMAINS.some(
    domain => hostname === domain || hostname.endsWith('.' + domain)
  )
}
