'use client'

/**
 * Utilitaires généraux pour l'application
 */

export function formaterDate(dateISO: string): string {
  const date = new Date(dateISO)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function copierVersPressePapiers(texte: string): Promise<void> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(texte)
  }
  
  return new Promise((resolve, reject) => {
    const textarea = document.createElement('textarea')
    textarea.value = texte
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    
    try {
      document.execCommand('copy')
      resolve()
    } catch (err) {
      reject(err)
    } finally {
      document.body.removeChild(textarea)
    }
  })
}

export function exporterEnJSON(donnees: any, nomFichier: string): void {
  const json = JSON.stringify(donnees, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const lien = document.createElement('a')
  lien.href = url
  lien.download = nomFichier
  lien.click()
  URL.revokeObjectURL(url)
}

export function exporterEnCSV(donnees: any[], nomFichier: string): void {
  if (donnees.length === 0) return
  
  const entetes = Object.keys(donnees[0])
  const lignes = donnees.map(ligne =>
    entetes.map(entete => {
      const valeur = ligne[entete]
      if (typeof valeur === 'string' && valeur.includes(',')) {
        return `"${valeur}"`
      }
      return valeur
    }).join(',')
  )
  
  const csv = [entetes.join(','), ...lignes].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const lien = document.createElement('a')
  lien.href = url
  lien.download = nomFichier
  lien.click()
  URL.revokeObjectURL(url)
}

export function obtenirTheme(): 'clair' | 'sombre' | 'auto' {
  if (typeof window === 'undefined') return 'auto'
  
  const theme = localStorage.getItem('theme-preference')
  if (theme === 'clair' || theme === 'sombre') {
    return theme
  }
  
  return 'auto'
}

export function definirTheme(theme: 'clair' | 'sombre' | 'auto'): void {
  localStorage.setItem('theme-preference', theme)
  appliquerTheme(theme)
}

export function appliquerTheme(theme: 'clair' | 'sombre' | 'auto'): void {
  if (typeof document === 'undefined') return
  
  let estSombre = false
  
  if (theme === 'sombre') {
    estSombre = true
  } else if (theme === 'clair') {
    estSombre = false
  } else {
    // Auto: utiliser la préférence du système
    estSombre = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  
  if (estSombre) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export function ecouterChangementThemeSysteme(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const listener = () => {
    const theme = obtenirTheme()
    if (theme === 'auto') {
      callback()
    }
  }
  
  mediaQuery.addEventListener('change', listener)
  return () => mediaQuery.removeEventListener('change', listener)
}
