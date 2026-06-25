import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const defaultMessages = await import('../messages/fr.json')
    return {
      messages: defaultMessages.default,
    }
  }

  return {
    messages: (
      await import(`../messages/${locale}.json`)
    ).default,
  }
})
