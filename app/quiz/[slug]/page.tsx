import Link from "next/link";

const QUIZ_LABELS: Record<string, string> = {
  "sql-intro": "SQL – Introduction",
  functions: "Fonctions",
  lists: "Listes",
  arrays: "Tableaux",
  loops: "Boucles",
  conditions: "Conditions",
};

const levels = [
  {
    level: 1,
    title: "Niveau 1 – Débutant",
    description: "Idéal pour découvrir le thème, questions simples.",
    color: "bg-emerald-500",
  },
  {
    level: 2,
    title: "Niveau 2 – Intermédiaire",
    description: "On augmente un peu la difficulté et les pièges.",
    color: "bg-amber-500",
  },
  {
    level: 3,
    title: "Niveau 3 – Avancé",
    description: "Cas réels, combinaisons et réflexion poussée.",
    color: "bg-rose-500",
  },
];

export default async function QuizLevelsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // params est un Promise → on attend
  const { slug } = await params;

  const quizTitle = QUIZ_LABELS[slug] ?? "Quiz";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Retour */}
        <div className="mb-4">
          <Link
            href="/"
            className="text-sm text-slate-300 hover:text-sky-300 flex items-center gap-1"
          >
            ← Retour aux quiz
          </Link>
        </div>

        {/* Titre */}
        <header className="mb-8">
          <p className="text-sky-300 text-xs uppercase tracking-[0.25em] mb-2">
            Sélection du niveau
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            {quizTitle}
          </h1>
          <p className="text-slate-300 max-w-2xl">
            Choisis un niveau pour ce quiz. Chaque niveau contient{" "}
            <b>10 questions</b> adaptées à ta progression.
          </p>
        </header>

        {/* Niveaux */}
        <section className="grid gap-6 md:grid-cols-3">
          {levels.map((lvl) => (
            <Link
              key={lvl.level}
              href={`/quiz/${slug}/level/${lvl.level}`}
              className="group"
            >
              <article className="h-full rounded-2xl bg-slate-800/80 border border-slate-700 shadow-lg p-4 flex flex-col hover:-translate-y-1 hover:border-sky-400 hover:shadow-sky-900/40 transition">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${lvl.color} text-white mb-3`}
                >
                  Niveau {lvl.level}
                </span>

                <h2 className="text-lg font-bold mb-1 group-hover:text-sky-300">
                  {lvl.title}
                </h2>

                <p className="text-sm text-slate-300 flex-1 mb-4">
                  {lvl.description}
                </p>

                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>🧩 10 questions</span>
                  <span className="group-hover:text-sky-300">
                    Commencer &rarr;
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
