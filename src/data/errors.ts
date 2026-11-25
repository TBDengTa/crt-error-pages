import type { ErrorConfig, ErrorAction } from '@/types/error'
import { t, type Locale } from '@/i18n'

export function getErrorActions(key: string, locale: Locale): ErrorAction[] {
  const homeAction: ErrorAction = { label: t('action.home', locale), type: 'home', variant: 'primary' }
  const backAction: ErrorAction = { label: t('action.back', locale), type: 'back', variant: 'secondary' }
  const retryAction: ErrorAction = { label: t('action.retry', locale), type: 'retry', variant: 'primary' }
  const contactAction: ErrorAction = {
    label: t('action.contact', locale),
    type: 'contact',
    href: 'https://github.com/TBDengTa/crt-error-pages/issues',
    variant: 'secondary',
  }

  const actionMap: Record<string, ErrorAction[]> = {
    '400': [homeAction, backAction],
    '401': [homeAction, backAction],
    '403': [homeAction, backAction, contactAction],
    '404': [homeAction, backAction],
    '500': [retryAction, homeAction, contactAction],
    '502': [retryAction, homeAction],
    '503': [retryAction, homeAction],
    '504': [retryAction, homeAction],
    'geo-blocked': [homeAction, contactAction],
    'ip-blocked': [homeAction, backAction, contactAction],
    'rate-limited': [retryAction, homeAction],
    'maintenance': [retryAction],
    'service-unavailable': [retryAction, homeAction, contactAction],
    'gateway-timeout': [retryAction, homeAction],
  }

  return actionMap[key] ?? [homeAction, backAction, contactAction]
}

export function getErrorConfig(key: string, locale: Locale): ErrorConfig {
  const base: Omit<ErrorConfig, 'title' | 'description' | 'actions'> | undefined = errorMeta[key]

  if (!base) {
    return {
      key,
      category: 'business',
      code: key.toUpperCase(),
      title: t('error.generic.title', locale),
      description: t('error.generic.description', locale),
      illustration: 'generic',
      actions: getErrorActions(key, locale),
    }
  }

  return {
    ...base,
    title: t(`error.${key}.title`, locale),
    description: t(`error.${key}.description`, locale),
    actions: getErrorActions(key, locale),
  }
}

type ErrorMeta = {
  key: string
  category: 'http' | 'business'
  code: string
  statusCode?: number
  illustration: string
}

const errorMeta: Record<string, ErrorMeta> = {
  '400': { key: '400', category: 'http', code: '400', statusCode: 400, illustration: 'bad-request' },
  '401': { key: '401', category: 'http', code: '401', statusCode: 401, illustration: 'unauthorized' },
  '403': { key: '403', category: 'http', code: '403', statusCode: 403, illustration: 'forbidden' },
  '404': { key: '404', category: 'http', code: '404', statusCode: 404, illustration: 'not-found' },
  '500': { key: '500', category: 'http', code: '500', statusCode: 500, illustration: 'server-error' },
  '502': { key: '502', category: 'http', code: '502', statusCode: 502, illustration: 'bad-gateway' },
  '503': { key: '503', category: 'http', code: '503', statusCode: 503, illustration: 'service-unavailable' },
  '504': { key: '504', category: 'http', code: '504', statusCode: 504, illustration: 'gateway-timeout' },
  'geo-blocked': { key: 'geo-blocked', category: 'business', code: 'GEO-BLOCKED', illustration: 'geo-block' },
  'ip-blocked': { key: 'ip-blocked', category: 'business', code: 'IP-BLOCKED', illustration: 'ip-block' },
  'rate-limited': { key: 'rate-limited', category: 'business', code: 'RATE-LIMITED', illustration: 'rate-limit' },
  'maintenance': { key: 'maintenance', category: 'business', code: 'MAINTENANCE', illustration: 'maintenance' },
  'service-unavailable': { key: 'service-unavailable', category: 'business', code: 'SVC-UNAVAILABLE', illustration: 'service-unavailable' },
  'gateway-timeout': { key: 'gateway-timeout', category: 'business', code: 'GW-TIMEOUT', illustration: 'gateway-timeout' },
}
