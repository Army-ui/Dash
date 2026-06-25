'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { EnTete } from '@/components/EnTete'
import { definirTheme, obtenirTheme } from '@/lib/utilitaires'
import { Check } from 'lucide-react'

export default function PageParametres() {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const [theme, setTheme] = useState<'clair' | 'sombre' | 'auto'>('auto')
  const [afficherHashs, setAfficherHashs] = useState(false)
  const [confirmationActive, setConfirmationActive] = useState(true)
  const [notificationsActive, setNotificationsActive] = useState(true)
  const [messageSauvegarde, setMessageSauvegarde] = useState('')

  useEffect(() => {
    setTheme(obtenirTheme())
    const hashPref = localStorage.getItem('afficher-hashs')
    const confirmPref = localStorage.getItem('confirmation-suppression')
    const notifPref = localStorage.getItem('notifications-actives')

    if (hashPref) setAfficherHashs(JSON.parse(hashPref))
    if (confirmPref !== null) setConfirmationActive(JSON.parse(confirmPref))
    if (notifPref !== null) setNotificationsActive(JSON.parse(notifPref))
  }, [])

  const sauvegarderParametres = () => {
    localStorage.setItem('afficher-hashs', JSON.stringify(afficherHashs))
    localStorage.setItem('confirmation-suppression', JSON.stringify(confirmationActive))
    localStorage.setItem('notifications-actives', JSON.stringify(notificationsActive))
    
    definirTheme(theme)
    
    setMessageSauvegarde(t('parametres.sauvegarder'))
    setTimeout(() => setMessageSauvegarde(''), 3000)
  }

  const reinitialiserParametres = () => {
    if (window.confirm(t('parametres.reinitialiser'))) {
      localStorage.clear()
      window.location.reload()
    }
  }

  const changerLangue = (lang: string) => {
    router.push(`/${lang}/parametres`)
  }

  return (
    <div className="min-h-screen bg-arriere-plan">
      <EnTete />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête */}
        <div className="animation-fade-in mb-12">
          <h1 className="titre-principal text-4xl mb-2">{t('parametres.titre')}</h1>
          <p className="text-texte-secondaire text-lg">{t('parametres.sousTitre')}</p>
        </div>

        {/* Message de sauvegarde */}
        {messageSauvegarde && (
          <div className="mb-6 carte bg-succes bg-opacity-20 border border-succes animation-slide-in flex items-center gap-3">
            <Check className="w-5 h-5 text-succes flex-shrink-0" />
            <span className="text-succes font-medium">{messageSauvegarde}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Section Langue */}
          <div className="carte animation-slide-in">
            <h2 className="sous-titre text-lg mb-4">{t('parametres.langue')}</h2>
            <div className="flex gap-2">
              <button
                onClick={() => changerLangue('fr')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  locale === 'fr'
                    ? 'btn-principal bg-accent-principal text-white'
                    : 'btn-secondaire'
                }`}
              >
                Français
              </button>
              <button
                onClick={() => changerLangue('en')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  locale === 'en'
                    ? 'btn-principal bg-accent-principal text-white'
                    : 'btn-secondaire'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Section Thème */}
          <div className="carte animation-slide-in">
            <h2 className="sous-titre text-lg mb-4">{t('parametres.theme')}</h2>
            <div className="space-y-3">
              {(['auto', 'clair', 'sombre'] as const).map((themeOption) => (
                <label key={themeOption} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-arriere-plan-secondaire rounded transition-colors">
                  <input
                    type="radio"
                    name="theme"
                    value={themeOption}
                    checked={theme === themeOption}
                    onChange={(e) => setTheme(e.target.value as 'clair' | 'sombre' | 'auto')}
                    className="w-4 h-4"
                  />
                  <span className="font-medium">
                    {themeOption === 'auto' && t('parametres.themeAuto')}
                    {themeOption === 'clair' && t('parametres.themeClair')}
                    {themeOption === 'sombre' && t('parametres.themeSombre')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Section Notifications */}
          <div className="carte animation-slide-in">
            <h2 className="sous-titre text-lg mb-4">{t('parametres.notifications')}</h2>
            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-arriere-plan-secondaire rounded transition-colors">
              <input
                type="checkbox"
                checked={notificationsActive}
                onChange={(e) => setNotificationsActive(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="font-medium">{t('parametres.notificationsActivees')}</span>
            </label>
          </div>

          {/* Section Sécurité */}
          <div className="carte animation-slide-in">
            <h2 className="sous-titre text-lg mb-4">{t('parametres.securite')}</h2>
            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-arriere-plan-secondaire rounded transition-colors">
              <input
                type="checkbox"
                checked={confirmationActive}
                onChange={(e) => setConfirmationActive(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="font-medium">{t('parametres.confirmationSuppression')}</span>
            </label>
          </div>

          {/* Section Affichage Avancé */}
          <div className="carte animation-slide-in">
            <h2 className="sous-titre text-lg mb-4">{t('parametres.affichageAvance')}</h2>
            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-arriere-plan-secondaire rounded transition-colors">
              <input
                type="checkbox"
                checked={afficherHashs}
                onChange={(e) => setAfficherHashs(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="font-medium">{t('parametres.affichageHashs')}</span>
            </label>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-4">
            <button
              onClick={sauvegarderParametres}
              className="btn-principal bg-accent-principal hover:bg-accent-secondaire flex-1 py-3 font-semibold"
            >
              {t('parametres.sauvegarder')}
            </button>
            <button
              onClick={reinitialiserParametres}
              className="btn-secondaire hover:bg-erreur hover:text-white flex-1 py-3 font-semibold transition-colors duration-200"
            >
              {t('parametres.reinitialiser')}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
