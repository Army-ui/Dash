'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { AlertTriangle, RotateCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-arriere-plan flex items-center justify-center px-4">
      <div className="carte text-center max-w-md mx-auto animation-slide-in border-l-4 border-erreur">
        <div className="w-16 h-16 bg-erreur bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-erreur" />
        </div>
        <h1 className="title-principal text-2xl mb-2">{t('commun.erreur')}</h1>
        <p className="text-texte-secondaire mb-6">{error.message || t('messages.erreurChargement')}</p>
        <button
          onClick={() => reset()}
          className="btn-principal bg-accent-principal hover:bg-accent-secondaire inline-flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          {t('commun.reessayer')}
        </button>
      </div>
    </div>
  )
}
