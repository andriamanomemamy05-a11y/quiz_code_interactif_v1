import Link from "next/link";

const quizzes = [
  {
    slug: "sql-intro",
    title: "SQL – Introduction",
    tag: "SQL",
    description: "Premiers pas avec SELECT, FROM et WHERE.",
    color: "bg-emerald-500",
  },
  {
    slug: "functions",
    title: "Fonctions",
    tag: "Fonctions",
    description: "Définir et appeler des fonctions.",
    color: "bg-indigo-500",
  },
  {
    slug: "lists",
    title: "Listes",
    tag: "Listes",
    description: "Parcourir et manipuler des listes.",
    color: "bg-pink-500",
  },
  {
    slug: "arrays",
    title: "Tableaux",
    tag: "Tableaux",
    description: "Index, longueur, itérations, mutations.",
    color: "bg-orange-500",
  },
  {
    slug: "loops",
    title: "Boucles",
    tag: "Boucles",
    description: "for, while, conditions d’arrêt.",
    color: "bg-sky-500",
  },
  {
    slug: "conditions",
    title: "Conditions",
    tag: "If / Else",
    description: "Prendre des décisions dans le code.",
    color: "bg-violet-500",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
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
            <button className="hover:text-sky-300 transition-colors">
              Quiz
            </button>
            <button className="hover:text-sky-300 transition-colors">
              À propos
            </button>
            <button className="hover:text-sky-300 transition-colors">
              Résultats
            </button>
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

      {/* CONTENU PRINCIPAL */}
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <header className="mb-10 mt-2">
          <p className="uppercase tracking-[0.25em] text-sm text-sky-300 mb-2">
            Plateforme d&apos;entraînement
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Quiz de code interactifs
          </h1>
          <p className="text-slate-300 max-w-2xl">
            Choisis un thème et commence à t&apos;entraîner. Chaque quiz te
            permet d&apos;écrire du code, de l&apos;exécuter et de voir
            immédiatement le résultat.
          </p>
        </header>

        {/* Liste des quiz */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Quiz disponibles</h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz) => (
              <Link
                key={quiz.slug}
                href={`/quiz`} // plus tard : `/quiz/${quiz.slug}`
                className="group"
              >
                <article className="h-full rounded-2xl bg-slate-800/70 border border-slate-700 shadow-lg p-4 flex flex-col hover:border-sky-400 hover:-translate-y-1 hover:shadow-sky-900/40 transition">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${quiz.color} text-white mb-3`}
                  >
                    {quiz.tag}
                  </span>

                  <h3 className="text-lg font-bold mb-1 group-hover:text-sky-300">
                    {quiz.title}
                  </h3>

                  <p className="text-sm text-slate-300 mb-4 flex-1">
                    {quiz.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>🧩 10 questions</span>
                    <span className="group-hover:text-sky-300">
                      Commencer &rarr;
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
