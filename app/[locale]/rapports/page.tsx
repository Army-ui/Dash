'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { EnTete } from '@/components/EnTete'
import { CarteKPI } from '@/components/CarteKPI'
import { ResultatScan, effectuerScan, formaterTaille, formaterPourcentage } from '@/lib/servicesDetection'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Download, FileJson, FileText } from 'lucide-react'
import { exporterEnJSON, exporterEnCSV } from '@/lib/utilitaires'

export default function PageRapports() {
  const t = useTranslations()
  const [resultat, setResultat] = useState<ResultatScan | null>(null)

  useEffect(() => {
    const donnees = effectuerScan()
    setResultat(donnees)
  }, [])

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

  // Préparer les données pour les graphiques
  const donneesParType = resultat.fichierAnalyses.reduce(
    (acc, f) => {
      const type = f.extension.toUpperCase()
      const existing = acc.find((x) => x.nom === type)
      if (existing) {
        existing.total += 1
      } else {
        acc.push({ nom: type, total: 1 })
      }
      return acc
    },
    [] as { nom: string; total: number }[]
  )

  const donneesDistribution = [
    { nom: t('kpis.fichiersTotaux'), valeur: resultat.fichiersTotaux, fill: '#2d2d2d' },
    { nom: t('kpis.fichiersDupliques'), valeur: resultat.nombreDoublons, fill: '#4d4d4d' },
  ]

  const tauxRecuperation = ((resultat.tailleRecuperee / (resultat.tailleRecuperee + resultat.fichiersTotaux * 1024)) * 100) || 0

  const handleExportJSON = () => {
    exporterEnJSON(
      {
        dateRapport: new Date().toISOString(),
        statistiques: {
          fichiersTotaux: resultat.fichiersTotaux,
          nombreDoublons: resultat.nombreDoublons,
          tailleRecuperee: formaterTaille(resultat.tailleRecuperee),
          tauxDoublons: formaterPourcentage(resultat.tauxDoublons),
          tempsEcoule: resultat.tempsEcoule,
        },
        groupesDoublons: resultat.groupesDoublons.map((g) => ({
          hash: g.hashMD5,
          nombreFichiers: g.nombreFichiers,
          tailleTotal: formaterTaille(g.tailleTotal),
          fichiers: g.fichiers.map((f) => ({
            chemin: f.cheminFichier,
            taille: formaterTaille(f.tailleOctets),
          })),
        })),
      },
      `rapport-doublons-${new Date().toISOString().split('T')[0]}.json`
    )
  }

  const handleExportCSV = () => {
    const donnees = resultat.groupesDoublons.flatMap((g) =>
      g.fichiers.map((f) => ({
        hash: g.hashMD5,
        chemin: f.cheminFichier,
        taille: f.tailleOctets,
        date: f.dateModification,
        propriete: f.proprietaire || 'N/A',
      }))
    )
    exporterEnCSV(donnees, `rapport-doublons-${new Date().toISOString().split('T')[0]}.csv`)
  }

  return (
    <div className="min-h-screen bg-arriere-plan">
      <EnTete />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête */}
        <div className="animation-fade-in mb-12">
          <h1 className="titre-principal text-4xl mb-2">{t('rapports.titre')}</h1>
          <p className="text-texte-secondaire text-lg">{t('rapports.sousTitre')}</p>
        </div>

        {/* KPIs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <CarteKPI
            titre={t('rapports.totalFichiers')}
            valeur={resultat.fichiersTotaux}
            couleur="accent"
          />
          <CarteKPI
            titre={t('rapports.totalDoublons')}
            valeur={resultat.nombreDoublons}
            couleur="alerte"
          />
          <CarteKPI
            titre={t('rapports.tailleRecuperee')}
            valeur={formaterTaille(resultat.tailleRecuperee)}
            couleur="succes"
          />
          <CarteKPI
            titre={t('rapports.tauxDeduplication')}
            valeur={formaterPourcentage(resultat.tauxDoublons)}
            couleur="accent"
          />
        </div>

        {/* Graphiques */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Distribution fichiers */}
          <div className="carte animation-slide-in">
            <h3 className="sous-titre text-lg mb-6">{t('rapports.graphiques.distribution')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={donneesParType}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-bordure)" />
                <XAxis dataKey="nom" stroke="var(--color-texte-secondaire)" />
                <YAxis stroke="var(--color-texte-secondaire)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-arriere-plan-secondaire)',
                    border: `1px solid var(--color-bordure)`,
                    color: 'var(--color-texte)',
                  }}
                />
                <Bar dataKey="total" fill="#2d2d2d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Répartition doublons vs normaux */}
          <div className="carte animation-slide-in">
            <h3 className="sous-titre text-lg mb-6">{t('rapports.graphiques.distribution')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={donneesDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ nom, valeur }) => `${nom}: ${valeur}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="valeur"
                >
                  {donneesDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-arriere-plan-secondaire)',
                    border: `1px solid var(--color-bordure)`,
                    color: 'var(--color-texte)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Buttons d'exportation */}
        <div className="carte animation-slide-in mb-12">
          <h3 className="sous-titre text-lg mb-4">{t('rapports.exportation')}</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleExportJSON}
              className="btn-principal bg-accent-principal hover:bg-accent-secondaire flex items-center justify-center gap-2 flex-1"
            >
              <FileJson className="w-5 h-5" />
              JSON
            </button>
            <button
              onClick={handleExportCSV}
              className="btn-principal bg-accent-principal hover:bg-accent-secondaire flex items-center justify-center gap-2 flex-1"
            >
              <Download className="w-5 h-5" />
              CSV
            </button>
          </div>
        </div>

        {/* Résumé détaillé */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="carte animation-slide-in">
            <h3 className="sous-titre text-lg mb-4">{t('rapports.statistiques')}</h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-texte-secondaire">{t('rapports.totalFichiers')}</dt>
                <dd className="font-semibold text-accent-principal">{resultat.fichiersTotaux}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-texte-secondaire">{t('rapports.totalDoublons')}</dt>
                <dd className="font-semibold text-accent-principal">{resultat.nombreDoublons}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-texte-secondaire">{t('rapports.tailleRecuperee')}</dt>
                <dd className="font-semibold text-accent-principal">{formaterTaille(resultat.tailleRecuperee)}</dd>
              </div>
              <div className="flex justify-between border-t border-bordure pt-3 mt-3">
                <dt className="text-texte-secondaire">{t('rapports.tauxDeduplication')}</dt>
                <dd className="font-semibold text-accent-principal">{formaterPourcentage(tauxRecuperation)}</dd>
              </div>
            </dl>
          </div>

          <div className="carte animation-slide-in">
            <h3 className="sous-titre text-lg mb-4">{t('kpis.storageOptimization')}</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-texte-secondaire">{t('kpis.duplicateRate')}</span>
                  <span className="font-semibold text-accent-principal">{formaterPourcentage(resultat.tauxDoublons)}</span>
                </div>
                <div className="w-full bg-bordure rounded-full h-2">
                  <div
                    className="bg-accent-principal h-full rounded-full"
                    style={{ width: `${Math.min(resultat.tauxDoublons * 5, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
