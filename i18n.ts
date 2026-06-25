import { getRequestConfig } from 'next-intl/server'
import { routing } from './i18n/routing'

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as any)) {
    return {
      messages: {},
    }
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
