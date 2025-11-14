import Link from "next/link";
import NavbarPage from "./navbar/page";

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
      <NavbarPage></NavbarPage>
      

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
                href={`/quiz/${quiz.slug}`}
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
                    <span>🧩 30 questions</span>
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
