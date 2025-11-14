import Link from "next/link";
import NavbarPage from "../navbar/page";

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  const slug = (sp.slug as string) ?? "inconnu";
  const level = (sp.level as string) ?? "?";
  const answered = Number(sp.answered ?? 0);
  const total = Number(sp.total ?? 0);

  const scorePercent =
    total > 0 ? Math.round((answered / total) * 100) : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* NAVBAR */}
      <NavbarPage/>

      <div className="max-w-3xl mx-auto px-6 py-10">
    
        <header className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300 mb-2">
            Résultats
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            Résumé du quiz
          </h1>
          <p className="text-slate-300">
            Quiz : <span className="font-semibold text-sky-300">{slug}</span>{" "}
            · Niveau <span className="font-semibold">{level}</span>
          </p>
        </header>

        <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 shadow-lg mb-6">
          <p className="text-lg mb-2">
            Questions répondues :{" "}
            <span className="font-semibold text-emerald-400">
              {answered} / {total}
            </span>
          </p>
          <p className="text-sm text-slate-300 mb-4">
            (Pour l&apos;instant, on compte une question comme &quot;répondue&quot;
            dès que tu exécutes du code sur cette question.)
          </p>

          <div className="mt-4">
            <p className="text-sm text-slate-300 mb-2">Progression</p>
            <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all"
                style={{ width: `${scorePercent}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {scorePercent}% complété
            </p>
          </div>
        </section>

        <section className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-sm hover:border-sky-400 hover:text-sky-300 transition"
          >
            ⏮ Retour à la liste des quiz
          </Link>
          <Link
            href={`/quiz/${slug}/level/${level}`}
            className="px-4 py-2 rounded-lg bg-sky-600 text-sm text-white hover:bg-sky-700 transition"
          >
            🔁 Refaire ce niveau
          </Link>
        </section>
      </div>
    </main>
  );
}
