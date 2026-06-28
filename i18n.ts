import { getRequestConfig } from 'next-intl/server'
import { routing } from './i18n/routing'

export default getRequestConfig(async ({ locale }) => {
  const validLocale = routing.locales.includes(locale as any)
    ? locale
    : routing.defaultLocale // ou 'fr' si tu préfères

  return {
    locale: validLocale, // ✅ OBLIGATOIRE
    messages: (await import(`./messages/${validLocale}.json`)).default,
  }
})
