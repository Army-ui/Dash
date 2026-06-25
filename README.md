# 🔍 Détecteur de Doublons - Solution Professionnelle

**Détection des fichiers dupliqués avec hachage MD5 | Professional Duplicate File Detection**

## ✨ Caractéristiques

- ✅ **Détection 100% précise** des doublons exacts via hachage MD5
- 🌍 **Multilingue** : Français (FR) et Anglais (EN)
- 🌓 **Mode sombre automatique** adapté au système de l'utilisateur
- 📊 **Dashboard intuitif** avec KPIs et visualisations
- 📥 **Export facile** en JSON et CSV
- 🎨 **Design épuré** : Palette gris et blanc, animations fluides
- 🚀 **Hébergeable** sur Vercel ou tout serveur Node.js
- ♿ **Accessible** avec support des lecteurs d'écran

## 🚀 Démarrage rapide

### Installation locale

```bash
# Cloner le projet
cd /vercel/share/v0-project

# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev

# Ouvrir http://localhost:3000
```

### Langues et thème

- **Langue par défaut** : Français
- **Changer de langue** : Cliquer sur le bouton de langue (FR/EN) dans l'en-tête
- **Thème** : Le mode sombre s'active automatiquement selon les préférences du système

## 📖 Utilisation

### Pages principales

| Page | URL | Description |
|------|-----|-------------|
| **Accueil** | `/` | Présentation et caractéristiques |
| **Scan** | `/scan` | Lancer un scan de détection |
| **Doublons** | `/doublons` | Voir les résultats des doublons |
| **Rapports** | `/rapports` | Statistiques et graphiques |
| **Paramètres** | `/parametres` | Langue, thème, sécurité |

### Flux principal

1. **Accueil** → Cliquer sur "Commencer"
2. **Scan** → Entrer un chemin et lancer le scan
3. **Doublons** → Voir les groupes de fichiers dupliqués
4. **Rapports** → Exporter les données

## 🛠️ Stack technologique

```
Next.js 16          Frontend framework
React 19            UI library
TypeScript          Type safety
Tailwind CSS v4     Styling
next-intl           Internationalization
Recharts            Data visualization
crypto-js           MD5 hashing
Lucide React        Icons
Vercel              Hosting (recommended)
```

## 📁 Structure du projet

```
app/[locale]/              # Pages par locale (FR/EN)
├── page.tsx              # Accueil
├── scan/page.tsx         # Scan
├── doublons/page.tsx     # Doublons
├── rapports/page.tsx     # Rapports
└── parametres/page.tsx   # Paramètres

components/              # Composants réutilisables
├── EnTete.tsx
├── CarteKPI.tsx
├── GroupeFichiers.tsx
└── FormulaireScan.tsx

lib/                     # Logique métier
├── servicesDetection.ts # Détection des doublons
└── utilitaires.ts       # Fonctions utilitaires

i18n/                    # Internationalisation
├── routing.ts
└── request.ts

messages/               # Traductions
├── fr.json
└── en.json
```

## 🎨 Design et couleurs

**Palette de couleurs** (gris et blanc)
- Background: `#ffffff` (clair) / `#0a0a0a` (sombre)
- Texte: `#1a1a1a` (clair) / `#f0f0f0` (sombre)
- Accent: `#2d2d2d` et `#4d4d4d`
- États: Succès (vert), Alerte (ambre), Erreur (rouge)

**Animations**
- Slide-in pour les entrées
- Fade-in pour l'apparition
- Pulse pour les éléments actifs
- Transitions fluides (300ms)

## 🌐 Multilingue (next-intl)

### Ajouter une traduction

1. Éditer `messages/fr.json` ou `messages/en.json`
2. Ajouter la clé : `"section.cle": "valeur"`
3. Utiliser dans le code :

```typescript
import { useTranslations } from 'next-intl'

export function MonComposant() {
  const t = useTranslations()
  return <h1>{t('section.cle')}</h1>
}
```

## 🔧 Commandes utiles

```bash
# Développement
pnpm dev

# Build production
pnpm build

# Serveur de production
pnpm start

# Linting
pnpm lint

# Type checking
tsc --noEmit
```

## 📦 Variables d'environnement

Aucune variable obligatoire pour le développement.

Pour la production (optionnel) :
```env
NEXT_PUBLIC_APP_URL=https://votre-domaine.com
NODE_ENV=production
```

## 🚀 Déploiement

### Sur Vercel (recommandé)

```bash
# Installer la CLI Vercel
npm i -g vercel

# Déployer
vercel deploy
```

Ou connecter via GitHub :
- Aller sur https://vercel.com/new
- Sélectionner le repository
- Vercel détecte automatiquement Next.js

### Sur autre serveur

```bash
# Build
pnpm build

# Démarrer
pnpm start

# Ou avec PM2
pm2 start "pnpm start" --name "detecteur-doublons"
```

## 🐛 Dépannage

### Le serveur ne démarre pas
```bash
pnpm install
rm -rf .next
pnpm dev --verbose
```

### Erreur de traductions
Vérifier que les fichiers JSON dans `messages/` sont valides

### Thème ne persiste pas
Vérifier que localStorage est activé dans le navigateur

## 📚 Documentation complète

Voir [DOCUMENTATION.md](./DOCUMENTATION.md) pour :
- Guide technique détaillé
- Référence des APIs
- Exemples de code
- Guide de dépannage avancé

## 📄 Licence

Projet éducatif et professionnel

## 🤝 Support

Pour toute question :
1. Consulter [DOCUMENTATION.md](./DOCUMENTATION.md)
2. Vérifier la console du navigateur (F12)
3. Lire les commentaires du code source

---

**Made with ❤️ using Next.js 16, React 19, and Tailwind CSS**

*Solution ready for production deployment*
