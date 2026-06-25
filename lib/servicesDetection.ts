'use client'

import CryptoJS from 'crypto-js'

export interface FichierMetadonnees {
  cheminFichier: string
  nomFichier: string
  tailleOctets: number
  hashMD5: string
  dateModification: string
  proprietaire?: string
  extension: string
}

export interface GroupeDoublons {
  hashMD5: string
  fichiers: FichierMetadonnees[]
  tailleTotal: number
  nombreFichiers: number
}

export interface ResultatScan {
  fichiersTotaux: number
  tempsEcoule: number
  fichierAnalyses: FichierMetadonnees[]
  groupesDoublons: GroupeDoublons[]
  nombreDoublons: number
  tailleRecuperee: number
  tauxDoublons: number
}

/**
 * Simule un scan de fichiers avec génération de hashs MD5
 * En production, cela utiliserait une API backend
 */
export function genererDonneesMockFichiers(): FichierMetadonnees[] {
  const extensions = ['pdf', 'doc', 'docx', 'xlsx', 'jpg', 'png', 'mp4', 'zip', 'txt', 'csv']
  const proprietaires = ['utilisateur1', 'utilisateur2', 'utilisateur3', 'admin', 'utilisateur4']
  const dossiers = ['Documents', 'Images', 'Videos', 'Archives', 'Rapports', 'Projets']
  
  const fichiers: FichierMetadonnees[] = []
  const taillesBase = [1024, 5120, 10240, 51200, 102400, 512000, 1024000, 5120000]
  
  // Générer des fichiers avec quelques doublons exacts
  for (let i = 0; i < 45; i++) {
    const extension = extensions[Math.floor(Math.random() * extensions.length)]
    const dossier = dossiers[Math.floor(Math.random() * dossiers.length)]
    const proprietaire = proprietaires[Math.floor(Math.random() * proprietaires.length)]
    const taille = taillesBase[Math.floor(Math.random() * taillesBase.length)]
    
    // Créer un hash pseudo-unique basé sur le nom du fichier
    let hashBase = `fichier_${i}_${Math.random()}`
    
    // 30% de chance d'être un doublon
    if (Math.random() < 0.3 && i > 3) {
      hashBase = `fichier_${Math.floor(i / 3)}_doublon`
    }
    
    const hashMD5 = CryptoJS.MD5(hashBase + taille).toString()
    
    fichiers.push({
      cheminFichier: `/${dossier}/fichier_${i}.${extension}`,
      nomFichier: `fichier_${i}.${extension}`,
      tailleOctets: taille,
      hashMD5: hashMD5,
      dateModification: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      proprietaire: proprietaire,
      extension: extension,
    })
  }
  
  return fichiers
}

/**
 * Filtre les fichiers pour identifier les doublons exacts
 * Doublons = même hash MD5
 */
export function detectionDoublonsExacts(fichiers: FichierMetadonnees[]): GroupeDoublons[] {
  const mapDoublons = new Map<string, FichierMetadonnees[]>()
  
  // Grouper les fichiers par hash MD5
  fichiers.forEach((fichier) => {
    if (!mapDoublons.has(fichier.hashMD5)) {
      mapDoublons.set(fichier.hashMD5, [])
    }
    mapDoublons.get(fichier.hashMD5)!.push(fichier)
  })
  
  // Filtrer pour garder seulement les groupes avec plusieurs fichiers (doublons)
  const groupesDoublons: GroupeDoublons[] = []
  mapDoublons.forEach((fichiersDuGroupe, hash) => {
    if (fichiersDuGroupe.length > 1) {
      const tailleTotal = fichiersDuGroupe.reduce((acc, f) => acc + f.tailleOctets, 0)
      groupesDoublons.push({
        hashMD5: hash,
        fichiers: fichiersDuGroupe,
        tailleTotal: tailleTotal,
        nombreFichiers: fichiersDuGroupe.length,
      })
    }
  })
  
  return groupesDoublons.sort((a, b) => b.tailleTotal - a.tailleTotal)
}

/**
 * Procède au scan complet et retourne les résultats
 */
export function effectuerScan(): ResultatScan {
  const dateDebut = Date.now()
  const fichierAnalyses = genererDonneesMockFichiers()
  const groupesDoublons = detectionDoublonsExacts(fichierAnalyses)
  const dateFinale = Date.now()
  
  const tempsEcoule = dateFinale - dateDebut
  const nombreDoublons = groupesDoublons.reduce((acc, groupe) => acc + groupe.nombreFichiers, 0)
  const tailleRecuperee = groupesDoublons.reduce((acc, groupe) => {
    // On récupère la taille des fichiers en doublon (moins le premier)
    return acc + (groupe.tailleTotal - groupe.fichiers[0].tailleOctets)
  }, 0)
  
  const tauxDoublons = fichierAnalyses.length > 0 
    ? (nombreDoublons / fichierAnalyses.length) * 100 
    : 0
  
  return {
    fichiersTotaux: fichierAnalyses.length,
    tempsEcoule: tempsEcoule,
    fichierAnalyses: fichierAnalyses,
    groupesDoublons: groupesDoublons,
    nombreDoublons: nombreDoublons,
    tailleRecuperee: tailleRecuperee,
    tauxDoublons: tauxDoublons,
  }
}

/**
 * Formate une taille en octets vers un format lisible
 */
export function formaterTaille(octets: number): string {
  if (octets === 0) return '0 B'
  
  const unites = ['B', 'KB', 'MB', 'GB', 'TB']
  const index = Math.floor(Math.log(octets) / Math.log(1024))
  const valeur = octets / Math.pow(1024, index)
  
  return `${valeur.toFixed(2)} ${unites[index]}`
}

/**
 * Formate un pourcentage avec un nombre de décimales
 */
export function formaterPourcentage(valeur: number, decimales: number = 2): string {
  return `${valeur.toFixed(decimales)}%`
}

/**
 * Formate une durée en millisecondes
 */
export function formaterDuree(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
  return `${(ms / 60000).toFixed(1)}m`
}

/**
 * Retourne une couleur basée sur le taux de doublons
 */
export function obtenirCouleurTaux(taux: number): string {
  if (taux < 10) return 'text-succes' // Vert
  if (taux < 25) return 'text-alerte' // Amber
  return 'text-erreur' // Rouge
}
