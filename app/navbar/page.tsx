import Link from "next/link";

export default function NavbarPage() {
  return (
    <main>
      {/* NAVBAR */}
      <nav className="border-b border-slate-700/70 bg-slate-900/60 backdrop-blur sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo / icône à gauche */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-sky-500 flex items-center justify-center text-lg font-extrabold shadow-md">
              Q
            </div>
            <span className="font-semibold tracking-wide">
              QuizCode<span className="text-sky-300">Learn</span>
            </span>
          </div>

          {/* Liens à droite */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="hover:text-sky-300 transition-colors text-sm"
            >
              Quiz
            </Link>
            <button className="hover:text-sky-300 transition-colors">
              À propos
            </button>
            <Link
              href="/results"
              className="hover:text-sky-300 transition-colors text-sm"
            >
              Résultats
            </Link>
            <button className="hover:text-sky-300 transition-colors">
              Profil
            </button>

            {/* Icône de déconnexion */}
            <button
              className="ml-2 h-8 w-8 rounded-full border border-slate-600 flex items-center justify-center hover:border-red-400 hover:text-red-400 transition"
              aria-label="Déconnexion"
            >
              ⏻
            </button>
          </div>
        </div>
      </nav>
    </main>
  );
}
