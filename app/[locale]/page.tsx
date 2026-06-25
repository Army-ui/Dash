import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { ArrowRight, Zap, BarChart3, Lock } from 'lucide-react'
import { EnTete } from '@/components/EnTete'

export default function Accueil() {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-arriere-plan">
      <EnTete />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Héros */}
        <section className="animation-fade-in space-y-8 py-12">
          <div className="text-center space-y-4">
            <h1 className="titre-principal text-5xl md:text-6xl mb-4">
              {t('accueil.presentation')}
            </h1>
            <p className="text-xl text-texte-secondaire max-w-2xl mx-auto leading-relaxed">
              {t('accueil.description')}
            </p>
          </div>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/scan"
              className="btn-principal bg-accent-principal hover:bg-accent-secondaire flex items-center gap-2 px-6 py-3 text-lg"
            >
              {t('accueil.demarrage')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/rapports"
              className="btn-secondaire flex items-center gap-2 px-6 py-3 text-lg"
            >
              {t('accueil.scannerDossier')}
            </Link>
          </div>
        </section>

        {/* Caractéristiques */}
        <section className="py-16 space-y-8">
          <h2 className="sous-titre text-3xl text-center mb-12">
            {t('accueil.caracteristiques.titre')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Scan Rapide */}
            <div className="carte animation-slide-in hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-accent-principal bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent-principal" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t('accueil.caracteristiques.scan')}</h3>
              <p className="text-texte-secondaire text-sm">{t('accueil.caracteristiques.scanDesc')}</p>
            </div>

            {/* Doublons Exacts */}
            <div className="carte animation-slide-in hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-accent-principal bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-accent-principal" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t('accueil.caracteristiques.exacts')}</h3>
              <p className="text-texte-secondaire text-sm">{t('accueil.caracteristiques.exactsDesc')}</p>
            </div>

            {/* Rapports */}
            <div className="carte animation-slide-in hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-accent-principal bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-accent-principal" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t('accueil.caracteristiques.rapports')}</h3>
              <p className="text-texte-secondaire text-sm">{t('accueil.caracteristiques.rapportsDesc')}</p>
            </div>

            {/* Interface Moderne */}
            <div className="carte animation-slide-in hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 bg-accent-principal bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent-principal" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t('accueil.caracteristiques.interface')}</h3>
              <p className="text-texte-secondaire text-sm">{t('accueil.caracteristiques.interfaceDesc')}</p>
            </div>
          </div>
        </section>

        {/* Section Stats */}
        <section className="py-16 bg-arriere-plan-secondaire rounded-lg px-8 animation-fade-in">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-accent-principal mb-2">100%</p>
              <p className="text-texte-secondaire">Précision de Détection</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-accent-principal mb-2">MD5</p>
              <p className="text-texte-secondaire">Hachage Cryptographique</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-accent-principal mb-2">Rapide</p>
              <p className="text-texte-secondaire">Traitement Optimisé</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
