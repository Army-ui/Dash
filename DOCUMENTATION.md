# DÉTECTEUR DE DOUBLONS - DOCUMENTATION COMPLÈTE

## TABLE DES MATIÈRES
1. [Vue d'ensemble du projet](#vue-densemble)
2. [Architecture et structure](#architecture)
3. [Installation et configuration](#installation)
4. [Utilisation de l'application](#utilisation)
5. [Guide technique](#guide-technique)
6. [Variables et fonctions](#variables-et-fonctions)
7. [Déploiement](#déploiement)
8. [Dépannage](#dépannage)

---

## 1. VUE D'ENSEMBLE DU PROJET {#vue-densemble}

### Objectif
Créer une solution professionnelle et hébergeable pour détecter les fichiers exactement dupliqués au sein de systèmes de stockage hétérogènes, en utilisant un hachage MD5 déterministe.

### Caractéristiques principales
- **Détection des doublons exacts** : Identification garantie des fichiers strictement identiques via hash MD5
- **Interface moderne multilingue** : Support du Français (FR) et de l'Anglais (EN)
- **Mode sombre automatique** : Adaptation automatique au thème du système de l'utilisateur
- **Dashboard intuitif** : Visualisation claire et professionnelle des résultats
- **Rapports exportables** : Export en JSON et CSV
- **Palette de couleurs gris et blanc** : Design épuré sans excès de couleurs

### Stack technologique
```
Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS v4
Multilingue: next-intl
Visualisation: Recharts
Hachage: crypto-js (MD5)
UI Components: Lucide React Icons
État: Client-side (localStorage) + Server Components
Hébergement: Vercel (recommandé)
```

---

## 2. ARCHITECTURE ET STRUCTURE {#architecture}

### Organisation des fichiers
```
/vercel/share/v0-project/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx              # Page d'accueil
│   │   ├── error.tsx             # Gestion des erreurs
│   │   ├── not-found.tsx         # Page 404
│   │   ├── layout.tsx            # Layout racine
│   │   ├── scan/
│   │   │   └── page.tsx          # Page de scan
│   │   ├── doublons/
│   │   │   └── page.tsx          # Page des doublons détectés
│   │   ├── rapports/
│   │   │   └── page.tsx          # Page des rapports
│   │   └── parametres/
│   │       └── page.tsx          # Page des paramètres
│   └── globals.css               # Styles globaux
├── components/
│   ├── EnTete.tsx                # Composant header
│   ├── CarteKPI.tsx              # Cartes de métriques
│   ├── GroupeFichiers.tsx        # Groupe de doublons
│   └── FormulaireScan.tsx        # Formulaire de scan
├── lib/
│   ├── servicesDetection.ts      # Logique de détection
│   └── utilitaires.ts            # Fonctions utilitaires
├── i18n/
│   ├── routing.ts                # Configuration i18n
│   └── request.ts                # Configuration requête i18n
├── messages/
│   ├── fr.json                   # Traductions Français
│   └── en.json                   # Traductions Anglais
├── styles/
│   └── globals.css               # Styles avec tokens de design
├── public/                       # Fichiers statiques
├── proxy.ts                      # Configuration i18n middleware
├── next.config.mjs               # Configuration Next.js
├── middleware.ts                 # Configuration middleware (déprécié → proxy.ts)
├── i18n.ts                       # Configuration i18n
└── tsconfig.json                 # Configuration TypeScript
```

### Architecture en couches

**Couche de présentation (UI)**
- Composants React réutilisables (EnTete, CarteKPI, etc.)
- Gestion du thème (clair/sombre)
- Support multilingue via next-intl

**Couche métier (Services)**
- `servicesDetection.ts` : Logique de détection de doublons
- Hachage MD5, groupement, calcul de statistiques

**Couche de persistence**
- localStorage pour préférences utilisateur
- Données générées en mémoire (mode démo)

**Configuration**
- Multilingue : next-intl
- Styles : Tailwind CSS v4 avec design tokens personnalisés

---

## 3. INSTALLATION ET CONFIGURATION {#installation}

### Prérequis
- Node.js 18+ ou 20+
- pnpm 10.34+

### Installation locale

1. **Cloner/Accéder au projet**
```bash
cd /vercel/share/v0-project
```

2. **Installer les dépendances**
```bash
pnpm install
```

3. **Lancer le serveur de développement**
```bash
pnpm dev
```

4. **Accéder à l'application**
- URL : http://localhost:3000
- Locale par défaut : Français (FR)

### Configuration des variables d'environnement

Fichier : `.env.development.local` (déjà présent)

Aucune variable d'environnement obligatoire pour le mode de développement. Pour la production, ajouter si nécessaire :

```env
NEXT_PUBLIC_APP_URL=https://votre-domaine.com
NODE_ENV=production
```

### Build pour la production

```bash
# Build
pnpm build

# Test du build
pnpm start
```

---

## 4. UTILISATION DE L'APPLICATION {#utilisation}

### Navigation

L'application propose 5 sections principales accessibles via la navigation :

#### **Accueil** (/)
- Présentation générale du projet
- Caractéristiques principales
- Boutons CTA vers scan et rapports

#### **Scan de Fichiers** (/scan)
1. Entrer un chemin de dossier
2. Cliquer sur "Démarrer le Scan"
3. L'application génère des données de démonstration
4. Affichage des résultats : fichiers scannés, doublons trouvés, taille récupérable

#### **Doublons Détectés** (/doublons)
- Affichage des groupes de doublons identifiés
- Chaque groupe contient les fichiers exactement dupliqués
- Sélection multiple de fichiers pour suppression
- Affichage optionnel des hashs MD5

#### **Rapports et Analyses** (/rapports)
- KPIs globales (fichiers totaux, doublons, taille récupérée)
- Graphiques (distribution par type, répartition)
- Export en JSON ou CSV

#### **Paramètres** (/parametres)
- Choix de la langue (FR/EN)
- Thème (Automatique/Clair/Sombre)
- Options de sécurité (confirmation suppression)
- Affichage avancé (hashs MD5)
- Réinitialisation des préférences

### Fonctionnalités clés

**Détection**
- Hachage MD5 de chaque fichier
- Groupement par hash identique
- Calcul automatique des doublons et espace récupérable

**Thème**
- Détection automatique du thème système
- Bascule manuelle possible
- Persistance dans localStorage

**Multilingue**
- Bascule de langue Français/Anglais
- Préservation du contexte (page active)
- Traductions complètes pour tous les écrans

**Export**
- JSON : Structure complète pour traitement externe
- CSV : Format tabulaire pour Excel/Sheets

---

## 5. GUIDE TECHNIQUE {#guide-technique}

### Détection des doublons

**Processus**

1. **Génération de métadonnées**
```typescript
interface FichierMetadonnees {
  cheminFichier: string
  nomFichier: string
  tailleOctets: number
  hashMD5: string              // Clé de groupement
  dateModification: string
  proprietaire?: string
  extension: string
}
```

2. **Groupement par hash**
```typescript
- Tous les fichiers ayant le même hashMD5 → même groupe
- Un groupe = 1+ fichiers identiques
- Groupes avec 2+ fichiers = doublons
```

3. **Calcul des statistiques**
```typescript
- tailleRecuperee = somme des doublons (sauf 1er fichier du groupe)
- tauxDoublons = (nombreDoublons / totalFichiers) × 100
- nombreDoublons = somme des fichiers en doublon
```

### Utilisation des services de détection

**Exemple : Effectuer un scan complet**

```typescript
import { effectuerScan, detectionDoublonsExacts } from '@/lib/servicesDetection'

// Scan complet avec résultats
const resultat = effectuerScan()
console.log(`Fichiers: ${resultat.fichiersTotaux}`)
console.log(`Doublons: ${resultat.nombreDoublons}`)
console.log(`Espace récupérable: ${formaterTaille(resultat.tailleRecuperee)}`)
```

**Exemple : Traiter les résultats**

```typescript
resultat.groupesDoublons.forEach((groupe) => {
  console.log(`Hash: ${groupe.hashMD5}`)
  console.log(`Fichiers dupliqués: ${groupe.nombreFichiers}`)
  console.log(`Taille totale: ${formaterTaille(groupe.tailleTotal)}`)
})
```

### Gestion du thème

**Appliquer un thème**

```typescript
import { definirTheme, appliquerTheme } from '@/lib/utilitaires'

// Définir et appliquer
definirTheme('sombre')  // 'clair' | 'sombre' | 'auto'

// Appliquer sans sauvegarder
appliquerTheme('clair')

// Récupérer le thème actuel
const themeActuel = obtenirTheme()
```

**Écouter les changements de thème système**

```typescript
const unsubscribe = ecouterChangementThemeSysteme(() => {
  // Appelé quand le thème du système change
  console.log('Thème du système changé')
})

// Arrêter l'écoute
unsubscribe()
```

### Multilingue (next-intl)

**Utiliser les traductions dans un composant**

```typescript
import { useTranslations } from 'next-intl'

export function MonComposant() {
  const t = useTranslations()
  
  return <h1>{t('commun.titre')}</h1>
  // Affiche: "Détecteur de Doublons" (FR) ou "Duplicate Detector" (EN)
}
```

**Ajouter une nouvelle traduction**

1. Éditer `messages/fr.json` et `messages/en.json`
2. Ajouter la clé en format imbriqué : `"section.cle": "valeur"`
3. Utiliser avec `t('section.cle')`

Exemple :
```json
{
  "nouvelleSuite": {
    "titre": "Mon Titre"
  }
}
```

Utilisation : `t('nouvelleSuite.titre')`

---

## 6. VARIABLES ET FONCTIONS {#variables-et-fonctions}

### Variables principales en français

**ServicesDetection.ts**

```typescript
// Interfaces
interface FichierMetadonnees         // Métadonnées d'un fichier
interface GroupeDoublons             // Groupe de doublons
interface ResultatScan               // Résultat complet du scan

// Constantes calculées
const fichiersTotaux: number         // Nombre total de fichiers
const nombreDoublons: number         // Nombre total de fichiers dupliqués
const tailleRecuperee: number        // Taille en octets économisable
const tauxDoublons: number           // Pourcentage (0-100)
const tempsEcoule: number            // En millisecondes
```

**Utilitaires.ts**

```typescript
const theme: 'clair' | 'sombre' | 'auto'    // Thème actuel
const hashPref: boolean                     // Afficher hashs?
const confirmPref: boolean                  // Confirmation suppression?
const notifPref: boolean                    // Notifications actives?
```

### Fonctions principales

**Detection**

```typescript
// Générer des fichiers de test
genererDonneesMockFichiers(): FichierMetadonnees[]

// Détecter les doublons exacts
detectionDoublonsExacts(fichiers): GroupeDoublons[]

// Effectuer un scan complet
effectuerScan(): ResultatScan

// Formater une taille en octets
formaterTaille(octets: number): string
// Ex: 1048576 → "1.00 MB"

// Formater un pourcentage
formaterPourcentage(valeur: number, decimales?: number): string
// Ex: 25.5 → "25.50%"

// Formater une durée
formaterDuree(ms: number): string
// Ex: 1500 → "1.5s"

// Obtenir la couleur basée sur le taux
obtenirCouleurTaux(taux: number): string
// Ex: 15 → "text-alerte"
```

**Utilitaires**

```typescript
// Formater une date ISO
formaterDate(dateISO: string): string

// Copier vers le presse-papiers
copierVersPressePapiers(texte: string): Promise<void>

// Exporter en JSON
exporterEnJSON(donnees: any, nomFichier: string): void

// Exporter en CSV
exporterEnCSV(donnees: any[], nomFichier: string): void

// Gérer le thème
obtenirTheme(): 'clair' | 'sombre' | 'auto'
definirTheme(theme): void
appliquerTheme(theme): void

// Écouter les changements de thème
ecouterChangementThemeSysteme(callback: () => void): () => void
```

### Tokens de design (Tailwind CSS v4)

**Couleurs**

```css
--color-arriere-plan: #ffffff (clair) / #0a0a0a (sombre)
--color-arriere-plan-secondaire: #f5f5f5 (clair) / #1a1a1a (sombre)
--color-texte: #1a1a1a (clair) / #f0f0f0 (sombre)
--color-texte-secondaire: #666666 (clair) / #999999 (sombre)
--color-bordure: #e0e0e0 (clair) / #333333 (sombre)
--color-accent-principal: #2d2d2d (clair/sombre)
--color-accent-secondaire: #4d4d4d (clair/sombre)
--color-succes: #10b981
--color-alerte: #f59e0b
--color-erreur: #ef4444
--color-info: #3b82f6
```

**Classes utilitaires**

```css
.carte              /* Carte avec style de base */
.btn-principal      /* Bouton principal */
.btn-secondaire     /* Bouton secondaire */
.input-texte        /* Champ de texte */
.titre-principal    /* Titre principal */
.sous-titre         /* Sous-titre */
.badge              /* Badge */
.badge-succes       /* Badge succès */
.badge-erreur       /* Badge erreur */
.badge-alerte       /* Badge alerte */
```

**Animations**

```css
.animation-pulse        /* Pulsation infinie */
.animation-slide-in     /* Slide entrant */
.animation-fade-in      /* Fade entrant */
```

---

## 7. DÉPLOIEMENT {#déploiement}

### Déploiement sur Vercel (Recommandé)

**Avantages**
- Zero-config pour Next.js
- CI/CD automatique
- Preview deployments
- Analytics intégrés
- Edge Functions optionnelles

**Processus**

1. **Connecter le repository GitHub**
   - https://vercel.com/new
   - Sélectionner le repo
   - Importer

2. **Configurer l'environnement (optionnel)**
   - Variables d'environnement dans Settings
   - Domains personnalisés

3. **Déployer**
   ```bash
   # Depuis la CLI
   vercel deploy
   ```

### Déploiement sur autre serveur

**Build production**

```bash
pnpm build
```

**Démarrer le serveur**

```bash
pnpm start
```

**Avec Docker** (optionnel)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

```bash
docker build -t detecteur-doublons .
docker run -p 3000:3000 detecteur-doublons
```

---

## 8. DÉPANNAGE {#dépannage}

### Problèmes courants

**Le serveur ne démarre pas**

```bash
# Solution 1 : Vérifier les dépendances
pnpm install

# Solution 2 : Nettoyer le cache
rm -rf .next node_modules
pnpm install

# Solution 3 : Vérifier la configuration
pnpm dev --verbose
```

**Erreur : "Couldn't find next-intl config"**

→ Vérifier que `i18n/request.ts` existe et que `next.config.mjs` le référence

**Le thème ne persiste pas**

→ Vérifier que localStorage est activé dans le navigateur

**Les traductions ne s'affichent pas**

→ Vérifier que les fichiers JSON sont valides : `pnpm lint`

**Erreurs de build TypeScript**

```bash
# Vérifier les erreurs
tsc --noEmit

# Ignorer temporairement
pnpm build # (ignoreBuildErrors: true est activé)
```

### Outils de debug

**Console du navigateur**

```javascript
// Afficher le thème actuel
console.log(localStorage.getItem('theme-preference'))

// Afficher les préférences
console.log({
  affichageHashs: localStorage.getItem('afficher-hashs'),
  confirmationSuppression: localStorage.getItem('confirmation-suppression'),
  notificationsActives: localStorage.getItem('notifications-actives'),
})
```

**Logs côté serveur**

```bash
# Voir les logs détaillés
pnpm dev --verbose

# Depuis les pages
console.log("[v0] Message de debug")
```

---

## ANNEXES

### Ressources utiles

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Recharts Documentation](https://recharts.org)
- [Lucide React Icons](https://lucide.dev)

### Support et contenu

Pour toute question ou problème :
1. Vérifier la section [Dépannage](#dépannage)
2. Consulter la documentation officielle
3. Vérifier les logs du navigateur et du serveur

---

**Document généré le**: 25 Juin 2026
**Version**: 1.0
**Statut**: Production Ready
