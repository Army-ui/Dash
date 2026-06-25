'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Search, RotateCw } from 'lucide-react'
import { ResultatScan, effectuerScan } from '@/lib/servicesDetection'

interface FormulaireScanProps {
  onScanTermine?: (resultat: ResultatScan) => void
  enChargement?: boolean
}

export function FormulaireScan({ onScanTermine, enChargement = false }: FormulaireScanProps) {
  const t = useTranslations()
  const [chemin, setChemin] = useState('')
  const [chargement, setChargement] = useState(false)

  const demarrerScan = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!chemin.trim()) {
      alert(t('scan.chemin'))
      return
    }

    setChargement(true)
    try {
      // Simuler un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      const resultat = effectuerScan()
      onScanTermine?.(resultat)
    } catch (erreur) {
      console.error('Erreur lors du scan:', erreur)
      alert(t('messages.erreurChargement'))
    } finally {
      setChargement(false)
    }
  }

  return (
    <form onSubmit={demarrerScan} className="carte animation-slide-in space-y-4">
      <div>
        <label htmlFor="chemin" className="block text-sm font-semibold text-accent-principal mb-2">
          {t('scan.chemin')}
        </label>
        <input
          id="chemin"
          type="text"
          placeholder={t('scan.cheminPlaceholder')}
          value={chemin}
          onChange={(e) => setChemin(e.target.value)}
          disabled={chargement || enChargement}
          className="input-texte disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p className="text-xs text-texte-secondaire mt-2">
          {t('commun.description')}
        </p>
      </div>

      <button
        type="submit"
        disabled={chargement || enChargement}
        className="w-full btn-principal bg-accent-principal hover:bg-accent-secondaire disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold py-3"
      >
        {chargement || enChargement ? (
          <>
            <RotateCw className="w-5 h-5 animation-pulse" />
            {t('scan.enCours')}
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            {t('scan.boutonScan')}
          </>
        )}
      </button>
    </form>
  )
}
