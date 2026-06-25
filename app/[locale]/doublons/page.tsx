'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { EnTete } from '@/components/EnTete'
import { GroupeFichiers } from '@/components/GroupeFichiers'
import { CarteKPI } from '@/components/CarteKPI'
import { ResultatScan, effectuerScan, formaterTaille, FichierMetadonnees } from '@/lib/servicesDetection'
import { AlertTriangle, Trash2, RefreshCw } from 'lucide-react'

export default function PageDoublons() {
  const t = useTranslations()
  const [resultat, setResultat] = useState<ResultatScan | null>(null)
  const [afficherHashs, setAfficherHashs] = useState(false)
  const [confirmationActive, setConfirmationActive] = useState(true)

  useEffect(() => {
    // Charger les données au montage
    const donnees = effectuerScan()
    setResultat(donnees)
    
    // Charger les préférences
    const hashPref = localStorage.getItem('afficher-hashs')
    const confirmPref = localStorage.getItem('confirmation-suppression')
    if (hashPref) setAfficherHashs(JSON.parse(hashPref))
    if (confirmPref !== null) setConfirmationActive(JSON.parse(confirmPref))
  }, [])

  const rechargerDoublons = () => {
    const donnees = effectuerScan()
    setResultat(donnees)
  }

  const gererSuppression = (fichiers: FichierMetadonnees[]) => {
    // Simuler la suppression
    console.log('Fichiers supprimés:', fichiers)
    alert(t('messages.fichierSupprime'))
    rechargerDoublons()
  }

  if (!resultat) {
    return (
      <div className="min-h-screen bg-arriere-plan flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-bordure border-t-accent-principal rounded-full animation-pulse mx-auto mb-4"></div>
          <p className="text-texte-secondaire">{t('commun.chargement')}</p>
        </div>
      </div>
    )
  }

  const sansMoyenGrands = resultat.groupesDoublons.length === 0

  return (
    <div className="min-h-screen bg-arriere-plan">
      <EnTete />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête */}
        <div className="animation-fade-in mb-12 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="titre-principal text-4xl mb-2">{t('doublons.titre')}</h1>
            <p className="text-texte-secondaire text-lg">{t('doublons.sousTitre')}</p>
          </div>
          <button
            onClick={rechargerDoublons}
            className="btn-secondaire flex items-center gap-2 flex-shrink-0 hover:bg-accent-secondaire hover:text-white transition-all duration-200"
            title={t('commun.titre')}
          >
            <RefreshCw className="w-5 h-5" />
            <span className="hidden sm:inline">{t('commun.titre')}</span>
          </button>
        </div>

        {sansMoyenGrands ? (
          // Aucun doublon détecté
          <div className="carte animation-slide-in text-center py-12 border-l-4 border-succes">
            <div className="w-16 h-16 bg-succes bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-succes" />
            </div>
            <h2 className="font-bold text-2xl mb-2 text-accent-principal">{t('doublons.nonDoublons')}</h2>
            <p className="text-texte-secondaire mb-6">{t('messages.aucunDoublon')}</p>
            <button
              onClick={rechargerDoublons}
              className="btn-principal bg-accent-principal hover:bg-accent-secondaire inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {t('commun.titre')}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* KPIs */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <CarteKPI
                titre={t('doublons.groupes')}
                valeur={resultat.groupesDoublons.length}
                couleur="accent"
              />
              <CarteKPI
                titre={t('kpis.fichiersDupliques')}
                valeur={resultat.nombreDoublons}
                couleur="alerte"
                icone={<AlertTriangle className="w-5 h-5" />}
              />
              <CarteKPI
                titre={t('kpis.spaceSaved')}
                valeur={formaterTaille(resultat.tailleRecuperee)}
                couleur="succes"
              />
              <CarteKPI
                titre={t('kpis.duplicateRate')}
                valeur={(resultat.tauxDoublons).toFixed(1)}
                unite="%"
                couleur="erreur"
              />
            </div>

            {/* Options d'affichage */}
            <div className="carte animation-slide-in">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={afficherHashs}
                  onChange={(e) => {
                    setAfficherHashs(e.target.checked)
                    localStorage.setItem('afficher-hashs', JSON.stringify(e.target.checked))
                  }}
                  className="w-4 h-4"
                />
                <span className="font-medium text-texte">{t('parametres.affichageHashs')}</span>
              </label>
            </div>

            {/* Groupes de doublons */}
            <div className="space-y-4">
              <h2 className="sous-titre text-2xl">{t('doublons.groupes')}</h2>
              <div className="space-y-4">
                {resultat.groupesDoublons.map((groupe, index) => (
                  <GroupeFichiers
                    key={groupe.hashMD5}
                    groupe={groupe}
                    index={index}
                    afficherHashs={afficherHashs}
                    onSuppression={gererSuppression}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
