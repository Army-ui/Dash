# GUIDE COMPLET D'UTILISATION ET DE DÉVELOPPEMENT
## Détecteur de Doublons - Solution Professionnelle

---

## TABLE DES MATIÈRES

1. [Introduction](#introduction)
2. [Vue d'ensemble du système](#vue-densemble)
3. [Installation et configuration](#installation)
4. [Guide d'utilisation](#guide-utilisateur)
5. [Architecture technique](#architecture)
6. [Guide du développeur](#developpeur)
7. [APIs et fonctions](#apis)
8. [Déploiement et production](#deploiement)
9. [Dépannage et maintenance](#maintenance)
10. [Annexes](#annexes)

---

## 1. INTRODUCTION {#introduction}

### Contexte du projet

Le **Détecteur de Doublons** est une application web professionnelle conçue pour identifier automatiquement les fichiers exactement dupliqués au sein de systèmes de stockage. Elle utilise un algorithme de hachage MD5 déterministe pour garantir une détection 100% précise.

### Objectifs

✅ Identifier les fichiers identiques (hash MD5)
✅ Quantifier l'espace disque gaspillé
✅ Fournir une interface simple et moderne
✅ Permettre l'export de rapports
✅ Soutenir plusieurs langues
✅ S'adapter au thème système de l'utilisateur

### Périmètre

**Inclus**
- Détection des doublons EXACTS uniquement
- Interface multilingue (FR, EN)
- Mode sombre automatique
- Export JSON/CSV
- Dashboard avec KPIs
- Paramètres utilisateur

**Exclu**
- Détection des quasi-doublons (non demandé)
- Suppression automatique de fichiers
- Stockage persistant de données
- APIs backend complexes
- Support de protocoles de stockage distants

---

## 2. VUE D'ENSEMBLE DU SYSTÈME {#vue-densemble}

### Architecture générale

```
┌─────────────────────────────────────────┐
│        INTERFACE UTILISATEUR (UI)       │
│   - Pages React avec Server Components  │
│   - Composants réutilisables            │
│   - Gestion du thème et i18n            │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│       LOGIQUE MÉTIER (Services)         │
│   - Détection MD5                       │
│   - Groupement de doublons              │
│   - Calcul des statistiques             │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│     PERSISTENCE (localStorage)          │
│   - Préférences utilisateur             │
│   - Thème et langue                     │
│   - Historique scans (optionnel)        │
└─────────────────────────────────────────┘
```

### Flux utilisateur principal

```
1. L'utilisateur ouvre l'application
   ↓
2. Sélection de la langue (FR/EN)
   ↓
3. Navigation vers page de scan
   ↓
4. Entrée d'un chemin de dossier
   ↓
5. Lancement du scan
   ↓
6. Affichage des résultats
   ├── Groupes de doublons
   ├── KPIs (fichiers, taille, etc.)
   └── Options d'export
   ↓
7. Consultation des rapports (optionnel)
   ↓
8. Configuration des paramètres (optionnel)
```

### Technologies clés

| Composant | Technologie | Raison |
|-----------|-------------|--------|
| Framework | Next.js 16 | Performance, SSR, déploiement facile |
| UI Library | React 19 | Composants modernes, hooks avancés |
| Typing | TypeScript | Sécurité et documentation |
| Styling | Tailwind CSS v4 | Design système, tokens personnalisés |
| i18n | next-intl | Multilingue native dans Next.js |
| Hachage | crypto-js | MD5 fiable et rapide |
| Graphiques | Recharts | Visualisation légère et accessible |
| Icons | Lucide React | SVG icons modernes et accessibles |
| Persistence | localStorage | Préférences sans backend |

---

## 3. INSTALLATION ET CONFIGURATION {#installation}

### 3.1 Prérequis système

**Matériel minimum**
- RAM: 2 GB
- Stockage: 500 MB
- Processeur: Modern (Intel/AMD)

**Logiciels**
- Node.js 18.0+ ou 20.0+
- pnpm 10.0+
- Git (pour clonage)

### 3.2 Vérifier les versions

```bash
node --version        # v18.0.0 ou supérieur
npm --version         # v9.0.0 ou supérieur
pnpm --version        # v10.0.0 ou supérieur
```

### 3.3 Installation locale (Développement)

**Étape 1 : Accéder au projet**
```bash
cd /vercel/share/v0-project
```

**Étape 2 : Installer les dépendances**
```bash
pnpm install
```

**Étape 3 : Vérifier la structure**
```bash
ls -la app/          # Pages
ls -la components/   # Composants
ls -la lib/          # Services
ls -la i18n/         # Config i18n
```

**Étape 4 : Démarrer le serveur**
```bash
pnpm dev
```

**Étape 5 : Ouvrir dans le navigateur**
- URL: http://localhost:3000
- Locale par défaut: Français

### 3.4 Configuration des variables d'environnement

**Fichier : `.env.development.local`**

```env
# Déjà configuré pour le développement
# Aucune action requise
```

**Pour la production : `.env.production.local`**

```env
NEXT_PUBLIC_APP_URL=https://votre-domaine.com
NODE_ENV=production
```

### 3.5 Troubleshooting installation

| Problème | Cause | Solution |
|----------|-------|----------|
| Port 3000 occupé | Autre service sur le port | `kill $(lsof -t -i :3000)` |
| Dépendances manquantes | Installation incomplète | `pnpm install --force` |
| Build échoue | Erreur TypeScript | `pnpm build` voir le détail |
| Erreur EACCES | Permissions Linux | `sudo chown -R $USER:$USER .` |

---

## 4. GUIDE D'UTILISATION {#guide-utilisateur}

### 4.1 Navigation générale

**En-tête (toujours visible)**
- Logo et titre de l'application
- Bouton de langue (FR/EN)
- Bouton de thème (Clair/Sombre/Auto)

**Menu implicite (via les liens)**
- Accueil (/)
- Scan (/scan)
- Doublons (/doublons)
- Rapports (/rapports)
- Paramètres (/parametres)

### 4.2 Page d'Accueil (/)

**Contenu**
- Titre et description du projet
- 4 cartes de caractéristiques
  - Scan rapide et fiable
  - Détection des doublons exacts
  - Rapports détaillés
  - Interface moderne

**Actions**
- Bouton "Commencer" → Vers /scan
- Bouton "Scanner un dossier" → Vers /rapports

**Sections**
- Statistiques : 100% précision, MD5, Rapide

### 4.3 Page de Scan (/scan)

**Formulaire**
1. Entrer un chemin de dossier
   - Exemple: `/home/utilisateur/Documents`
   - Exemple: `C:\Users\Utilisateur\Downloads`

2. Cliquer "Démarrer le Scan"
   - Le bouton affiche "Scan en cours..."
   - Simulation : ~1.5 secondes

**Résultats affichés**
- ✓ Fichiers analysés : `45`
- ✓ Doublons trouvés : `12`
- ✓ Espace économisable : `250 MB`
- ✓ Temps écoulé : `1.5s`

**KPIs (4 cartes)**
1. Fichiers analysés
2. Fichiers dupliqués
3. Espace récupérable
4. Temps écoulé

**Graphique**
- Barre de progression du taux de doublons

### 4.4 Page des Doublons (/doublons)

**État initial**
- Message : "Aucun doublon détecté"
- Action : Bouton pour refaire un scan

**État avec résultats**

**KPIs (4 cartes)**
1. Nombre de groupes de doublons
2. Nombre de fichiers dupliqués
3. Espace récupérable
4. Taux de doublons (%)

**Options d'affichage**
- Checkbox : "Afficher les hashs MD5"

**Groupes de doublons**
- Chacun est une section pliable
- Header affiche : `Groupe #1 | 3 fichiers | 150 MB`
- Contenu (une fois déplié) :
  - Hash MD5 (optionnel)
  - Checkbox "Sélectionner tous"
  - Liste des fichiers avec :
    - Checkbox pour chaque
    - Chemin du fichier
    - Taille du fichier
    - Date de modification
    - Propriétaire

**Actions**
- Sélectionner des fichiers
- Bouton "Supprimer les doublons" (rouge)
- Confirmation avant suppression

### 4.5 Page des Rapports (/rapports)

**KPIs (4 cartes)**
1. Total de fichiers
2. Total de doublons
3. Taille récupérée
4. Taux de déduplication

**Graphiques**
- **Distribution par type de fichier** (Bar chart)
  - Axe X : Types de fichiers
  - Axe Y : Nombre de fichiers
  
- **Répartition doublons vs normaux** (Pie chart)
  - Section 1 : Fichiers normaux
  - Section 2 : Fichiers dupliqués

**Export**
- Bouton "JSON" : Exporte en format JSON
- Bouton "CSV" : Exporte en format CSV

**Résumé détaillé** (2 colonnes)
- Colonne 1 : Statistiques globales
- Colonne 2 : Optimisation du stockage

### 4.6 Page de Paramètres (/parametres)

**Langue**
- 2 boutons radio : Français, English
- Change automatiquement la langue de l'application

**Thème**
- 3 options :
  - Automatique (détecte le thème du système)
  - Clair (fond blanc)
  - Sombre (fond noir)

**Notifications**
- Checkbox : Activer/Désactiver notifications

**Sécurité**
- Checkbox : Demander confirmation avant suppression

**Affichage avancé**
- Checkbox : Afficher les hashs MD5

**Actions**
- Bouton "Sauvegarder les paramètres" (bleu)
- Bouton "Réinitialiser" (rouge)

### 4.7 Fonctionnalités spéciales

**Changement de langue**
- Cliquer sur le bouton de langue dans l'en-tête
- La page reste active, seule la langue change
- Sauvegardé dans localStorage

**Changement de thème**
- Cliquer sur le bouton de thème dans l'en-tête
- Mode auto : détecte le thème du système
- Peut être changé manuellement
- Appliqué immédiatement

**Export de données**

*JSON*
```json
{
  "dateRapport": "2026-06-25T...",
  "statistiques": {
    "fichiersTotaux": 45,
    "nombreDoublons": 12,
    "tailleRecuperee": "250 MB"
  },
  "groupesDoublons": [...]
}
```

*CSV*
```
hash,chemin,taille,date,propriete
abc123...,.../fichier1.pdf,1024,2026-06-25,utilisateur1
abc123...,.../fichier2.pdf,1024,2026-06-25,utilisateur2
```

---

## 5. ARCHITECTURE TECHNIQUE {#architecture}

### 5.1 Structure du projet

```
project-root/
│
├── app/
│   ├── [locale]/                    # Dynamic locale routing
│   │   ├── layout.tsx              # Root layout avec i18n
│   │   ├── page.tsx                # Accueil
│   │   ├── error.tsx               # Error boundary
│   │   ├── not-found.tsx           # 404 page
│   │   ├── scan/
│   │   │   └── page.tsx
│   │   ├── doublons/
│   │   │   └── page.tsx
│   │   ├── rapports/
│   │   │   └── page.tsx
│   │   └── parametres/
│   │       └── page.tsx
│   ├── globals.css                  # Global styles
│
├── components/                      # Composants réutilisables
│   ├── EnTete.tsx                  # Header component
│   ├── CarteKPI.tsx                # KPI card component
│   ├── GroupeFichiers.tsx          # Duplicate group component
│   └── FormulaireScan.tsx          # Scan form component
│
├── lib/                             # Logique métier
│   ├── servicesDetection.ts        # Détection & hachage
│   └── utilitaires.ts              # Utilities
│
├── i18n/                            # Internationalisation
│   ├── routing.ts                  # Routing config
│   └── request.ts                  # Request config
│
├── messages/                        # Traductions
│   ├── fr.json                     # Traductions FR
│   └── en.json                     # Traductions EN
│
├── styles/
│   └── globals.css                  # Variables CSS
│
├── public/                          # Static assets
│   └── favicon.ico
│
├── proxy.ts                         # i18n middleware
├── next.config.mjs                  # Next.js config
├── i18n.ts                          # i18n config (legacy)
├── tsconfig.json                    # TypeScript config
├── package.json                     # Dependencies
├── pnpm-lock.yaml                   # Lock file
│
├── DOCUMENTATION.md                 # Complete documentation
├── GUIDE_COMPLET.md                 # This file
├── README.md                        # Quick start
│
└── .env.development.local           # Dev env vars
```

### 5.2 Flux de données

```
1. Utilisateur interagit (clique bouton scan)
   ↓
2. Composant page (scan/page.tsx) déclenche effectuerScan()
   ↓
3. Service retourne ResultatScan
   ↓
4. État React mis à jour (setState)
   ↓
5. Composants re-render avec nouvelles données
   ↓
6. Utilisateur voit les résultats
```

### 5.3 Détection de doublons - Algorithme

**Étape 1 : Génération des métadonnées**

```typescript
fichier → {
  cheminFichier: "/dossier/fichier.pdf"
  nomFichier: "fichier.pdf"
  tailleOctets: 1048576
  hashMD5: "abc123..."
  dateModification: "2026-06-25T..."
  extension: "pdf"
}
```

**Étape 2 : Calcul du hash MD5**

```typescript
// Utilise crypto-js
const hash = CryptoJS.MD5(contenuFichier).toString()
// Tous les fichiers identiques → même hash
```

**Étape 3 : Groupement par hash**

```typescript
const mapDoublons = new Map()
fichiers.forEach(f => {
  if (!mapDoublons.has(f.hashMD5)) {
    mapDoublons.set(f.hashMD5, [])
  }
  mapDoublons.get(f.hashMD5).push(f)
})
```

**Étape 4 : Filtrage (2+ fichiers = doublon)**

```typescript
const groupesDoublons = []
mapDoublons.forEach((fichiers, hash) => {
  if (fichiers.length > 1) {  // Au moins 2 fichiers
    groupesDoublons.push({
      hashMD5: hash,
      fichiers: fichiers,
      tailleTotal: sum(fichiers.map(f => f.tailleOctets))
    })
  }
})
```

**Résultat**

```typescript
{
  hashMD5: "abc123...",
  nombreFichiers: 3,
  fichiers: [
    { cheminFichier: "/doc1.pdf", ... },
    { cheminFichier: "/doc2.pdf", ... },
    { cheminFichier: "/doc3.pdf", ... }
  ],
  tailleTotal: 3145728  // 3 × 1 MB
}
```

### 5.4 Gestion du thème

**Cycle de vie**

```
1. Page charge
   ↓
2. useEffect lit localStorage
   const theme = localStorage.getItem('theme-preference')
   ↓
3. Applique le thème
   document.html.classList.add('dark') ou remove
   ↓
4. Utilisateur change le thème
   ↓
5. Sauvegarde dans localStorage
   ↓
6. Applique immédiatement
```

**Valeurs possibles**
- `'auto'` : Détecte `prefers-color-scheme` du système
- `'clair'` : Force le mode clair
- `'sombre'` : Force le mode sombre

**CSS personnalisé**

```css
/* Mode clair (défaut) */
:root {
  --color-arriere-plan: #ffffff;
  --color-texte: #1a1a1a;
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    --color-arriere-plan: #0a0a0a;
    --color-texte: #f0f0f0;
  }
}
```

### 5.5 Multilingue avec next-intl

**Routage**

```
Français: /fr/scan, /fr/doublons, /fr/rapports
Anglais:  /en/scan, /en/doublons, /en/rapports
Défaut:   /scan → /fr/scan (redirect)
```

**Traduction dans composant**

```typescript
import { useTranslations } from 'next-intl'

export function MonComposant() {
  const t = useTranslations()
  
  return (
    <h1>{t('doublons.titre')}</h1>
    // Affiche "Doublons Détectés" (FR)
    // ou "Duplicates Detected" (EN)
  )
}
```

**Fichiers de traduction**

```json
// messages/fr.json
{
  "doublons": {
    "titre": "Doublons Détectés",
    "nonDoublons": "Aucun doublon détecté"
  }
}

// messages/en.json
{
  "doublons": {
    "titre": "Duplicates Detected",
    "nonDoublons": "No duplicates found"
  }
}
```

### 5.6 Persistence des données

**localStorage (Client-side)**

```javascript
// Thème
localStorage.setItem('theme-preference', 'sombre')
const theme = localStorage.getItem('theme-preference')

// Affichage
localStorage.setItem('afficher-hashs', true)

// Sécurité
localStorage.setItem('confirmation-suppression', true)
```

**Limitation**
- ~5-10 MB par domaine
- Pas de serveur, juste client
- Idéal pour préférences
- Non adapté pour gros volumes

---

## 6. GUIDE DU DÉVELOPPEUR {#developpeur}

### 6.1 Ajouter une nouvelle page

**Exemple : Page de statistiques avancées**

1. **Créer le fichier**
   ```
   app/[locale]/statistiques/page.tsx
   ```

2. **Template minimal**
   ```typescript
   'use client'
   
   import { useTranslations } from 'next-intl'
   import { EnTete } from '@/components/EnTete'
   
   export default function PageStatistiques() {
     const t = useTranslations()
     
     return (
       <div className="min-h-screen bg-arriere-plan">
         <EnTete />
         <main className="max-w-7xl mx-auto px-4 py-12">
           <h1 className="titre-principal text-4xl mb-6">
             {t('statistiques.titre')}
           </h1>
           {/* Contenu ici */}
         </main>
       </div>
     )
   }
   ```

3. **Ajouter les traductions**
   ```json
   // messages/fr.json
   {
     "statistiques": {
       "titre": "Statistiques Avancées"
     }
   }
   
   // messages/en.json
   {
     "statistiques": {
       "titre": "Advanced Statistics"
     }
   }
   ```

4. **La page est automatiquement accessible**
   - `/fr/statistiques`
   - `/en/statistiques`

### 6.2 Ajouter un composant

**Exemple : Composant de statistique en temps réel**

1. **Créer le composant**
   ```
   components/CarteStatistiqueRealTime.tsx
   ```

2. **Code minimal**
   ```typescript
   'use client'
   
   import { useEffect, useState } from 'react'
   
   export function CarteStatistiqueRealTime() {
     const [valeur, setValeur] = useState(0)
     
     useEffect(() => {
       // Logique mise à jour
     }, [])
     
     return (
       <div className="carte animation-slide-in">
         <h3 className="sous-titre">En temps réel</h3>
         <p className="text-2xl font-bold">{valeur}</p>
       </div>
     )
   }
   ```

3. **Importer et utiliser**
   ```typescript
   import { CarteStatistiqueRealTime } from '@/components/CarteStatistiqueRealTime'
   
   export default function Page() {
     return (
       <div>
         <CarteStatistiqueRealTime />
       </div>
     )
   }
   ```

### 6.3 Ajouter une fonction utilitaire

**Exemple : Fonction pour formater un hash MD5**

1. **Ajouter dans `lib/utilitaires.ts`**
   ```typescript
   export function formaterHashMD5(hash: string, longueur: number = 8): string {
     return hash.substring(0, longueur).toUpperCase() + '...'
   }
   ```

2. **Utiliser dans un composant**
   ```typescript
   import { formaterHashMD5 } from '@/lib/utilitaires'
   
   export function MaFonction() {
     const hashTronque = formaterHashMD5('abc123def456', 10)
     return <p>{hashTronque}</p>  // "ABC123DEF4..."
   }
   ```

### 6.4 Modifier les styles globaux

**Fichier : `styles/globals.css`**

Utiliser les tokens de design :

```css
@layer components {
  .carte-personnalisee {
    @apply carte bg-accent-principal text-white p-8 rounded-xl;
  }
}
```

Utiliser dans JSX :
```tsx
<div className="carte-personnalisee">
  Contenu stylisé
</div>
```

### 6.5 Gestion des erreurs

**Error boundary**

```typescript
'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error('Erreur attrapée:', error)
  }, [error])
  
  return (
    <div className="carte border-l-4 border-erreur">
      <h2>{error.message}</h2>
      <button onClick={() => reset()}>Réessayer</button>
    </div>
  )
}
```

---

## 7. APIs ET FONCTIONS {#apis}

### 7.1 Service de détection

**Fichier : `lib/servicesDetection.ts`**

```typescript
// Types
interface FichierMetadonnees { /* ... */ }
interface GroupeDoublons { /* ... */ }
interface ResultatScan { /* ... */ }

// Principales fonctions
function genererDonneesMockFichiers(): FichierMetadonnees[]
function detectionDoublonsExacts(fichiers: FichierMetadonnees[]): GroupeDoublons[]
function effectuerScan(): ResultatScan
function formaterTaille(octets: number): string
function formaterPourcentage(valeur: number): string
function formaterDuree(ms: number): string
function obtenirCouleurTaux(taux: number): string
```

### 7.2 Utilitaires

**Fichier : `lib/utilitaires.ts`**

```typescript
// Dates
function formaterDate(dateISO: string): string

// Presse-papiers
function copierVersPressePapiers(texte: string): Promise<void>

// Export
function exporterEnJSON(donnees: any, nomFichier: string): void
function exporterEnCSV(donnees: any[], nomFichier: string): void

// Thème
function obtenirTheme(): 'clair' | 'sombre' | 'auto'
function definirTheme(theme): void
function appliquerTheme(theme): void
function ecouterChangementThemeSysteme(callback): () => void
```

### 7.3 Composants

**EnTete.tsx**
- Props : None
- État : theme, locale
- Actions : Changer langue, changer thème

**CarteKPI.tsx**
- Props : titre, valeur, unite, couleur, tendance
- Affiche : Métrique avec tendance optionnelle

**GroupeFichiers.tsx**
- Props : groupe, index, afficherHashs, onSuppression
- Affiche : Groupe pliable avec fichiers
- Actions : Sélectionner, supprimer

**FormulaireScan.tsx**
- Props : onScanTermine, enChargement
- Affiche : Formulaire avec input
- Actions : Lancer scan

---

## 8. DÉPLOIEMENT ET PRODUCTION {#deploiement}

### 8.1 Préparation au déploiement

**Checklist**

- [ ] `pnpm lint` sans erreurs
- [ ] `pnpm build` réussit
- [ ] Variables d'environnement configurées
- [ ] Tests manuels réalisés
- [ ] Traductions complètes
- [ ] Documentation à jour

**Build local**

```bash
# Build
pnpm build

# Démarrer le serveur de prod
pnpm start

# Tester
curl http://localhost:3000/fr
```

### 8.2 Déploiement sur Vercel

**Option 1 : Interface Vercel**

1. Aller sur https://vercel.com/new
2. Importer le repository GitHub
3. Vercel détecte automatiquement Next.js
4. Cliquer "Deploy"

**Option 2 : CLI Vercel**

```bash
# Installer
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel deploy

# Production
vercel deploy --prod
```

**Variables d'environnement (sur Vercel)**

1. Aller dans Settings > Environment Variables
2. Ajouter si besoin :
   ```
   NEXT_PUBLIC_APP_URL=https://detecteur-doublons.vercel.app
   ```

### 8.3 Déploiement sur autre serveur

**Serveur Linux avec Node.js**

```bash
# 1. SSH dans le serveur
ssh user@server.com

# 2. Cloner le projet
git clone <repo-url> /app/detecteur-doublons
cd /app/detecteur-doublons

# 3. Installer
pnpm install
pnpm build

# 4. Démarrer avec PM2
pm2 start "pnpm start" --name "detecteur-doublons"
pm2 save

# 5. Nginx (reverse proxy)
sudo nano /etc/nginx/sites-available/default
```

**Configuration Nginx**

```nginx
upstream app {
  server 127.0.0.1:3000;
}

server {
  listen 80;
  server_name votre-domaine.com;

  location / {
    proxy_pass http://app;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
  }
}
```

**Docker**

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

```bash
# Build
docker build -t detecteur-doublons:1.0 .

# Run
docker run -p 3000:3000 detecteur-doublons:1.0
```

### 8.4 Monitoring en production

**Logs**

```bash
# Vercel : onglet Deployments > Logs
# Serveur : tail -f /app/detecteur-doublons/.next/build-logs

# PM2
pm2 logs detecteur-doublons
```

**Performance**

```bash
# Analyser le bundle
npm run analyze  # Si configuré

# Vérifier Web Vitals
# Vercel Analytics > Web Vitals
```

---

## 9. DÉPANNAGE ET MAINTENANCE {#maintenance}

### 9.1 Problèmes courants

| Problème | Cause | Solution |
|----------|-------|----------|
| Port 3000 occupé | Autre processus | `lsof -i :3000` puis `kill -9 <PID>` |
| Build échoue | Erreur TypeScript | `tsc --noEmit` pour voir les erreurs |
| Traductions vides | Fichiers JSON invalides | Valider JSON : `cat messages/fr.json \| python3 -m json.tool` |
| Thème ne change pas | localStorage désactivé | Vérifier les paramètres du navigateur |
| Images n'apparaissent pas | CORS ou path incorrect | Vérifier fichier public ou CDN |
| Performance lente | Bundle trop gros | `npm run analyze` si disponible |

### 9.2 Commandes utiles

```bash
# Vérification
tsc --noEmit                        # Vérifier types
pnpm lint                           # Vérifier lint
pnpm build                          # Vérifier build

# Nettoyage
rm -rf .next node_modules           # Reset complet
pnpm install && pnpm build          # Rebuild

# Debug
pnpm dev --verbose                  # Dev avec détails
NODE_DEBUG=* pnpm dev               # Debug complet
```

### 9.3 Mise à jour des dépendances

```bash
# Vérifier les mises à jour
pnpm outdated

# Mettre à jour (avec test)
pnpm update

# Mettre à jour spécifiquement
pnpm update next@latest

# Vérifier la compatibilité
pnpm build
```

---

## 10. ANNEXES {#annexes}

### A. Fichiers importants

| Fichier | Rôle | Maintenance |
|---------|------|-------------|
| `app/[locale]/layout.tsx` | Layout racine | Ajouter scripts globaux |
| `styles/globals.css` | Tokens design | Mettre à jour couleurs/fonts |
| `lib/servicesDetection.ts` | Logique métier | Optimiser algo, ajouter features |
| `messages/fr.json` | Traductions FR | Ajouter textes |
| `messages/en.json` | Traductions EN | Ajouter textes |
| `next.config.mjs` | Config Next.js | Ajouter plugins |
| `proxy.ts` | Middleware i18n | Modifier routage |

### B. Ressources externes

- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [next-intl](https://next-intl.dev)
- [Recharts](https://recharts.org)

### C. Optimisations futures possibles

**Performance**
- [ ] Pagination des groupes de doublons
- [ ] Virtualisation liste des fichiers
- [ ] Caching des résultats
- [ ] Web Workers pour hachage

**Fonctionnalité**
- [ ] Import/Export des résultats
- [ ] Historique des scans
- [ ] Partage de rapport
- [ ] API REST pour intégration externe
- [ ] Support du stockage cloud

**UX**
- [ ] Autocomplétion des chemins
- [ ] Drag & drop pour fichiers
- [ ] Notifications toast
- [ ] Mode offline

### D. Support et aide

**Documentation interne**
- `DOCUMENTATION.md` : Référence complète
- `GUIDE_COMPLET.md` : Ce guide
- `README.md` : Quick start

**Communauté**
- Stack Overflow : Tag `[next.js]` `[react]`
- GitHub Issues : Repo officiel
- Forums : next-intl, Tailwind, Recharts

---

## CONCLUSION

Ce guide couvre tous les aspects du **Détecteur de Doublons** :
- ✅ Installation et configuration
- ✅ Utilisation pour les utilisateurs finaux
- ✅ Architecture et design technique
- ✅ Guide complet pour les développeurs
- ✅ Déploiement et maintenance

L'application est **prête pour la production** et **facilement maintenable** grâce à une architecture claire, du code typé, et une documentation complète.

**Bon développement !** 🚀

---

**Document généré le** : 25 Juin 2026  
**Version** : 1.0  
**Statut** : ✅ Production Ready

