'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { EnTete } from '@/components/EnTete'
import { FormulaireScan } from '@/components/FormulaireScan'
import { CarteKPI } from '@/components/CarteKPI'
import { ResultatScan, formaterTaille, formaterDuree, formaterPourcentage } from '@/lib/servicesDetection'
import { FileText, Clock, AlertTriangle, CheckCircle } from 'lucide-react'

export default function PageScan() {
  const t = useTranslations()
  const [resultat, setResultat] = useState<ResultatScan | null>(null)

  return (
    <div className="min-h-screen bg-arriere-plan">
      <EnTete />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête */}
        <div className="animation-fade-in mb-12">
          <h1 className="titre-principal text-4xl mb-2">{t('scan.titre')}</h1>
          <p className="text-texte-secondaire text-lg">{t('scan.sousTitre')}</p>
        </div>

        {/* Formulaire de Scan */}
        <div className="mb-12">
          <FormulaireScan onScanTermine={setResultat} />
        </div>

        {/* Résultats du Scan */}
        {resultat && (
          <div className="space-y-8 animation-fade-in">
            {/* En-tête des résultats */}
            <div className="carte border-l-4 border-succes">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-succes flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="font-bold text-xl text-accent-principal mb-2">
                    {t('scan.resultats')}
                  </h2>
                  <p className="text-texte-secondaire">
                    {t('messages.scanTermine')} • {t('messages.doublonsTrouves', { count: resultat.nombreDoublons })}
                  </p>
                </div>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <CarteKPI
                titre={t('scan.fichierAnalyses')}
                valeur={resultat.fichiersTotaux}
                couleur="accent"
                icone={<FileText className="w-5 h-5" />}
              />
              <CarteKPI
                titre={t('doublons.nombreFichiers')}
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
                titre={t('scan.tempsEcoule')}
                valeur={formaterDuree(resultat.tempsEcoule)}
                couleur="accent"
                icone={<Clock className="w-5 h-5" />}
              />
            </div>

            {/* Taux de Doublons */}
            <div className="carte animation-slide-in">
              <h3 className="sous-titre text-lg mb-4">{t('scan.tauxDoublons')}</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-end justify-between mb-2">
                    <span className="font-semibold text-texte">{formaterPourcentage(resultat.tauxDoublons)}</span>
                    <span className="text-sm text-texte-secondaire">
                      {resultat.nombreDoublons} / {resultat.fichiersTotaux}
                    </span>
                  </div>
                  <div className="w-full bg-bordure rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-accent-principal h-full transition-all duration-500"
                      style={{ width: `${Math.min(resultat.tauxDoublons * 10, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Résumé */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="carte text-center">
                <p className="text-3xl font-bold text-accent-principal mb-2">{resultat.fichiersTotaux}</p>
                <p className="text-texte-secondaire">{t('scan.fichierScanne')}</p>
              </div>
              <div className="carte text-center">
                <p className="text-3xl font-bold text-accent-principal mb-2">{resultat.groupesDoublons.length}</p>
                <p className="text-texte-secondaire">{t('scan.doublonsTrouves')}</p>
              </div>
              <div className="carte text-center">
                <p className="text-3xl font-bold text-accent-principal mb-2">{formaterTaille(resultat.tailleRecuperee)}</p>
                <p className="text-texte-secondaire">{t('kpis.spaceSaved')}</p>
              </div>
            </div>
          </div>
        )}

        {!resultat && (
          <div className="text-center py-12">
            <p className="text-texte-secondaire text-lg">{t('commun.description')}</p>
          </div>
        )}
      </main>
    </div>
  )
}
