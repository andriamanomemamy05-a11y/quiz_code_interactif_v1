type LevelPageProps = {
  params: {
    slug: string;
    level: string;
  };
};

export default function LevelPage({ params }: LevelPageProps) {
  const { slug, level } = params;

  return (
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="max-w-xl mx-auto text-center px-4">
        <h1 className="text-3xl font-bold mb-4">
          Quiz : <span className="text-sky-300">{slug}</span>
        </h1>
        <h2 className="text-xl mb-2">
          Niveau <span className="text-emerald-400 font-semibold">{level}</span>
        </h2>
        <p className="text-slate-300 mb-6">
          Ici tu afficheras plus tard les <b>10 questions</b> de ce niveau,
          avec l&apos;éditeur de code à gauche et les résultats à droite.
        </p>
        <p className="text-slate-400 text-sm">
          Pour le moment, c&apos;est juste un aperçu de navigation. 😊
        </p>
      </div>
    </main>
  );
}
