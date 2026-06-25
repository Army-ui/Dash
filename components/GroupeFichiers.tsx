'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown, Copy, Trash2 } from 'lucide-react'
import { GroupeDoublons, formaterTaille, FichierMetadonnees } from '@/lib/servicesDetection'
import { formaterDate, copierVersPressePapiers } from '@/lib/utilitaires'

interface GroupeFichiersProps {
  groupe: GroupeDoublons
  index: number
  afficherHashs: boolean
  onSuppression?: (fichiers: FichierMetadonnees[]) => void
}

export function GroupeFichiers({
  groupe,
  index,
  afficherHashs,
  onSuppression,
}: GroupeFichiersProps) {
  const t = useTranslations()
  const [estOuvert, setEstOuvert] = useState(false)
  const [fichierSelectionnes, setFichierSelectionnes] = useState<string[]>([])

  const basculerFichier = (cheminFichier: string) => {
    setFichierSelectionnes((prev) =>
      prev.includes(cheminFichier)
        ? prev.filter((f) => f !== cheminFichier)
        : [...prev, cheminFichier]
    )
  }

  const basculerTous = () => {
    if (fichierSelectionnes.length === groupe.fichiers.length) {
      setFichierSelectionnes([])
    } else {
      setFichierSelectionnes(groupe.fichiers.map((f) => f.cheminFichier))
    }
  }

  const suppressionFichiers = () => {
    const fichiersASupprimer = groupe.fichiers.filter((f) =>
      fichierSelectionnes.includes(f.cheminFichier)
    )
    if (onSuppression && fichiersASupprimer.length > 0) {
      if (window.confirm(t('messages.confirmationSuppression'))) {
        onSuppression(fichiersASupprimer)
        setFichierSelectionnes([])
      }
    }
  }

  return (
    <div className="carte animation-slide-in border-l-4 border-accent-principal overflow-hidden">
      {/* En-tête du groupe */}
      <button
        onClick={() => setEstOuvert(!estOuvert)}
        className="w-full text-left"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <ChevronDown
              className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                estOuvert ? 'rotate-180' : ''
              }`}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-accent-principal text-lg truncate">
                {t('doublons.groupes')} #{index + 1}
              </h3>
              <p className="text-texte-secondaire text-sm">
                {groupe.nombreFichiers} {t('doublons.nombreFichiers')} • {formaterTaille(groupe.tailleTotal)}
              </p>
            </div>
          </div>
          <div className="badge badge-erreur flex-shrink-0">
            {groupe.nombreFichiers} {t('kpis.fichiersDupliques')}
          </div>
        </div>
      </button>

      {/* Contenu du groupe */}
      {estOuvert && (
        <div className="mt-4 pt-4 border-t border-bordure space-y-3 animation-fade-in">
          {/* Hash MD5 */}
          {afficherHashs && (
            <div className="p-3 bg-arriere-plan rounded-lg border border-bordure">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs text-texte-secondaire font-medium">{t('doublons.hash')}</p>
                  <p className="font-mono text-xs text-texte truncate">{groupe.hashMD5}</p>
                </div>
                <button
                  onClick={() => copierVersPressePapiers(groupe.hashMD5)}
                  className="p-2 hover:bg-accent-principal hover:text-white rounded transition-colors flex-shrink-0"
                  title="Copier"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Checkbox Tous */}
          <label className="flex items-center gap-2 p-2 hover:bg-arriere-plan-secondaire rounded cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={fichierSelectionnes.length === groupe.fichiers.length}
              onChange={basculerTous}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sm font-medium text-texte-secondaire">
              {t('doublons.selectionner')} {t('commun.titre')}
            </span>
          </label>

          {/* Liste des fichiers */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {groupe.fichiers.map((fichier) => (
              <label
                key={fichier.cheminFichier}
                className="flex items-start gap-3 p-3 hover:bg-arriere-plan-secondaire rounded border border-transparent hover:border-bordure transition-all duration-200 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={fichierSelectionnes.includes(fichier.cheminFichier)}
                  onChange={() => basculerFichier(fichier.cheminFichier)}
                  className="w-4 h-4 mt-1 cursor-pointer flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs text-texte truncate">{fichier.cheminFichier}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-texte-secondaire">
                    <span>{formaterTaille(fichier.tailleOctets)}</span>
                    <span>{formaterDate(fichier.dateModification)}</span>
                    {fichier.proprietaire && <span>{fichier.proprietaire}</span>}
                  </div>
                </div>
              </label>
            ))}
          </div>

          {/* Bouton Suppression */}
          {onSuppression && fichierSelectionnes.length > 0 && (
            <button
              onClick={suppressionFichiers}
              className="w-full btn-principal bg-erreur hover:bg-opacity-90 flex items-center justify-center gap-2 mt-4"
            >
              <Trash2 className="w-4 h-4" />
              {t('doublons.supprimer')} ({fichierSelectionnes.length})
            </button>
          )}
        </div>
      )}
    </div>
  )
}
