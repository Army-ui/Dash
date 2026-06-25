'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useState, useEffect } from 'react'
import { Moon, Sun, Globe } from 'lucide-react'
import { definirTheme, obtenirTheme, appliquerTheme, ecouterChangementThemeSysteme } from '@/lib/utilitaires'

export function EnTete() {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const [theme, setTheme] = useState<'clair' | 'sombre' | 'auto'>('auto')
  const [estMonte, setEstMonte] = useState(false)

  useEffect(() => {
    setEstMonte(true)
    const themeActuel = obtenirTheme()
    setTheme(themeActuel)
    appliquerTheme(themeActuel)
    
    const unsubscribe = ecouterChangementThemeSysteme(() => {
      setTheme(obtenirTheme())
    })
    
    return unsubscribe
  }, [])

  const changerTheme = () => {
    const nouveauTheme = theme === 'clair' ? 'sombre' : theme === 'sombre' ? 'auto' : 'clair'
    setTheme(nouveauTheme)
    definirTheme(nouveauTheme)
  }

  const changerLangue = () => {
    const nouvelleLangue = locale === 'fr' ? 'en' : 'fr'
    router.push(`/${nouvelleLangue}/`)
  }

  if (!estMonte) return null

  return (
    <header className="animation-fade-in bg-arriere-plan-secondaire border-b border-bordure sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et Titre */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-principal rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">DD</span>
            </div>
            <div>
              <h1 className="titre-principal text-2xl">{t('commun.titre')}</h1>
              <p className="text-texte-secondaire text-sm">{t('commun.sousTitre')}</p>
            </div>
          </div>

          {/* Contrôles */}
          <div className="flex items-center gap-2">
            {/* Bouton Langue */}
            <button
              onClick={changerLangue}
              className="btn-secondaire flex items-center gap-2 hover:bg-accent-secondaire hover:text-white transition-all duration-200"
              title={locale === 'fr' ? t('commun.anglais') : t('commun.francais')}
            >
              <Globe className="w-5 h-5" />
              <span className="font-semibold">{locale.toUpperCase()}</span>
            </button>

            {/* Bouton Thème */}
            <button
              onClick={changerTheme}
              className="btn-secondaire flex items-center gap-2 hover:bg-accent-secondaire hover:text-white transition-all duration-200"
              title={theme === 'clair' ? t('commun.modeNoir') : t('commun.modeClair')}
            >
              {theme === 'clair' || (theme === 'auto' && !window.matchMedia('(prefers-color-scheme: dark)').matches) ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
