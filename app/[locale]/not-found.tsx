import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-arriere-plan flex items-center justify-center px-4">
      <div className="carte text-center max-w-md mx-auto animation-slide-in">
        <h1 className="text-6xl font-bold text-accent-principal mb-4">404</h1>
        <h2 className="title-principal text-2xl mb-2">Page non trouvée</h2>
        <p className="text-texte-secondaire mb-6">La page que vous recherchez n'existe pas.</p>
        <Link
          href="/fr"
          className="btn-principal bg-accent-principal hover:bg-accent-secondaire inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Retourner à l'accueil
        </Link>
      </div>
    </div>
  )
}
