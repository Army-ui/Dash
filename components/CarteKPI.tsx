'use client'

import { ReactNode } from 'react'
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'

interface CarteKPIProps {
  titre: string
  valeur: string | number
  unite?: string
  sousTitre?: string
  icone?: ReactNode
  couleur?: 'accent' | 'alerte' | 'erreur' | 'succes'
  tendance?: 'hausse' | 'baisse'
  pourcentageTendance?: number
}

export function CarteKPI({
  titre,
  valeur,
  unite = '',
  sousTitre,
  icone,
  couleur = 'accent',
  tendance,
  pourcentageTendance,
}: CarteKPIProps) {
  const couleurs = {
    accent: 'bg-accent-principal text-white',
    alerte: 'bg-alerte bg-opacity-20 text-alerte',
    erreur: 'bg-erreur bg-opacity-20 text-erreur',
    succes: 'bg-succes bg-opacity-20 text-succes',
  }

  const couleurFond = {
    accent: 'bg-accent-principal bg-opacity-10',
    alerte: 'bg-alerte bg-opacity-10',
    erreur: 'bg-erreur bg-opacity-10',
    succes: 'bg-succes bg-opacity-10',
  }

  return (
    <div className="carte animation-slide-in hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <h3 className="sous-titre text-sm font-semibold">{titre}</h3>
        {icone && <div className={`p-2 rounded-lg ${couleurFond[couleur]}`}>{icone}</div>}
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-accent-principal">{valeur}</span>
          {unite && <span className="text-texte-secondaire font-medium">{unite}</span>}
        </div>

        {tendance && pourcentageTendance !== undefined && (
          <div className="flex items-center gap-2 text-sm">
            {tendance === 'hausse' ? (
              <TrendingUp className="w-4 h-4 text-erreur" />
            ) : (
              <TrendingDown className="w-4 h-4 text-succes" />
            )}
            <span className={tendance === 'hausse' ? 'text-erreur' : 'text-succes'}>
              {tendance === 'hausse' ? '+' : '-'}
              {pourcentageTendance.toFixed(1)}%
            </span>
          </div>
        )}

        {sousTitre && <p className="text-texte-secondaire text-xs">{sousTitre}</p>}
      </div>
    </div>
  )
}
