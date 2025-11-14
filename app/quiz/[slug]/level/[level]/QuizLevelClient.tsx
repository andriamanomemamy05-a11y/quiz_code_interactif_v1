"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type QuizLevelClientProps = {
  slug: string;
  level: string;
};

const QUIZ_META: Record<
  string,
  { title: string; language: string; intro: string }
> = {
  "sql-intro": {
    title: "SQL – Introduction",
    language: "SQL",
    intro:
      "Écris une requête SQL pour sélectionner toutes les colonnes de la table querydex.",
  },
  functions: {
    title: "Fonctions",
    language: "Python",
    intro:
      "Écris une fonction greet(name) qui retourne \"Bonjour, <name>!\".",
  },
  lists: {
    title: "Listes",
    language: "Python",
    intro:
      "À partir d'une liste de nombres, retourne seulement les nombres pairs.",
  },
  arrays: {
    title: "Tableaux",
    language: "JavaScript",
    intro:
      "Travaille sur un tableau de nombres et calcule la somme de toutes les valeurs.",
  },
  loops: {
    title: "Boucles",
    language: "Python",
    intro:
      "Utilise une boucle pour afficher les nombres de 1 à 10.",
  },
  conditions: {
    title: "Conditions",
    language: "JavaScript",
    intro:
      "Écris une condition qui affiche \"Majeur\" si age >= 18 sinon \"Mineur\".",
  },
};

// 10 questions par niveau / quiz (exemple simple pour l’instant)
function getQuestions(slug: string, level: string) {
  const base = `Question de ${slug} – niveau ${level}`;
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Question ${i + 1}`,
    statement: `${base} (#${i + 1}). Adapte l'énoncé selon ton besoin pédagogique.`,
  }));
}

export default function QuizLevelClient({ slug, level }: QuizLevelClientProps) {
  const meta = QUIZ_META[slug] ?? {
    title: "Quiz",
    language: "Code",
    intro: "Écris une solution pour ce quiz.",
  };

  const questions = getQuestions(slug, level);
  const totalQuestions = questions.length;
  const router = useRouter();

  // Boutton Terminier et rédirection vers la page résultat
  const handleFinish = () => {
    const answered = outputs.filter((o) => o !== null).length;

    router.push(
      `/results?slug=${encodeURIComponent(
        slug
      )}&level=${level}&answered=${answered}&total=${totalQuestions}`
    );
  };

  const initialSnippet =
    meta.language === "SQL"
      ? "SELECT * FROM querydex;"
      : meta.language === "Python"
      ? "# Écris ton code ici"
      : "// Écris ton code ici";

  // Index de la question en cours (0 → première)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Un code par question
  const [codes, setCodes] = useState<string[]>(
    () => questions.map(() => initialSnippet)
  );

  // Un output par question
  const [outputs, setOutputs] = useState<(string | null)[]>(
    () => questions.map(() => null)
  );

  const [loading, setLoading] = useState(false);

  const currentQuestion = questions[currentIndex];
  const code = codes[currentIndex];
  const output = outputs[currentIndex];

  const updateCode = (value: string) => {
    setCodes((prev) => {
      const copy = [...prev];
      copy[currentIndex] = value;
      return copy;
    });
  };

  const setOutputForCurrent = (value: string | null) => {
    setOutputs((prev) => {
      const copy = [...prev];
      copy[currentIndex] = value;
      return copy;
    });
  };

  const runCode = async () => {
    setLoading(true);

    try {
      const trimmed = code.trim().toLowerCase();

      if (slug === "sql-intro") {
        if (trimmed.includes("select") && trimmed.includes("from querydex")) {
          setOutputForCurrent(
            "✅ Tests réussis :\n- Requête valide\n- Table querydex trouvée\n\n(Mode démo : 151 lignes simulées)"
          );
        } else {
          setOutputForCurrent(
            "❌ Test échoué :\nOn attend une requête du type :\nSELECT * FROM querydex;"
          );
        }
      } else if (slug === "functions") {
        if (trimmed.includes("def greet") || trimmed.includes("function")) {
          setOutputForCurrent(
            "✅ La fonction semble définie.\n\nExemple attendu : greet(\"Marie\") → \"Bonjour, Marie!\""
          );
        } else {
          setOutputForCurrent(
            "❌ On attend la définition d'une fonction greet(name).\nIndice : def greet(name): ..."
          );
        }
      } else if (slug === "loops") {
        if (trimmed.includes("for") || trimmed.includes("while")) {
          setOutputForCurrent(
            "✅ Une boucle a été détectée.\n\nVérifie que tu affiches bien les nombres de 1 à 10."
          );
        } else {
          setOutputForCurrent(
            "❌ Aucune boucle détectée.\nPense à utiliser for ou while."
          );
        }
      } else {
        setOutputForCurrent(
          "✅ Code reçu.\n(Ici tu pourras brancher le vrai serveur d'exécution et les tests automatiques.)"
        );
      }
    } catch (e) {
      setOutputForCurrent("⚠️ Erreur interne lors de l'exécution simulée.");
    }

    setLoading(false);
  };

  const goToQuestion = (index: number) => {
    if (index < 0 || index >= totalQuestions) return;
    setCurrentIndex(index);
  };

  const goNext = () => goToQuestion(currentIndex + 1);
  const goPrev = () => goToQuestion(currentIndex - 1);

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="flex h-screen">
        {/* Colonne gauche : énoncé + éditeur */}
        <section className="w-1/2 p-6 bg-slate-900 flex flex-col border-r border-slate-800">
          <div>
            <p className="text-xs text-sky-300 uppercase tracking-[0.25em] mb-2">
              {meta.language} · Niveau {level}
            </p>
            
            {/* Titre + navigation sur la même ligne */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
              {/* Titre à gauche */}
              <h1 className="text-2xl md:text-3xl font-extrabold">
                {meta.title}
              </h1>

              {/* Navigation questions style "Question 1 sur 10" à droite */}
              <div className="flex justify-start md:justify-end">
                <div className="inline-flex items-stretch rounded-xl overflow-hidden shadow border border-slate-700 bg-slate-800">
                  {/* flèche gauche */}
                  <button
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    className="px-3 py-2 text-sm disabled:opacity-40 hover:bg-slate-700 transition flex items-center justify-center"
                  >
                    ←
                  </button>

                  {/* centre : texte "Question X sur 10" */}
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-semibold bg-slate-900 flex items-center gap-2"
                  >
                    Question {currentIndex + 1} sur {totalQuestions}
                    <span className="text-xs opacity-70">▾</span>
                  </button>

                  {/* flèche droite */}
                  <button
                    onClick={goNext}
                    disabled={currentIndex === totalQuestions - 1}
                    className="px-3 py-2 text-sm disabled:opacity-40 hover:bg-slate-700 transition flex items-center justify-center"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            <p className="text-slate-300 mb-3">{meta.intro}</p>

            <p className="text-sm font-semibold mb-1">
              {currentQuestion.title}
            </p>
            <p className="text-sm text-slate-300 mb-4">
              {currentQuestion.statement}
            </p>

            {/* Navigation questions */}
            {/* <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <button
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  className="px-3 py-1 text-xs rounded-lg border border-slate-600 disabled:opacity-40 hover:border-sky-400 transition"
                >
                  ← Précédente
                </button>
                <button
                  onClick={goNext}
                  disabled={currentIndex === totalQuestions - 1}
                  className="px-3 py-1 text-xs rounded-lg border border-slate-600 disabled:opacity-40 hover:border-sky-400 transition"
                >
                  Suivante →
                </button>
              </div>

              <div className="flex gap-1">
                {questions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(idx)}
                    className={`h-6 w-6 rounded-full text-xs flex items-center justify-center border ${
                      idx === currentIndex
                        ? "bg-sky-500 border-sky-400"
                        : "bg-slate-800 border-slate-600 hover:border-sky-400"
                    }`}
                  >
                    {q.id}
                  </button>
                ))}
              </div>
            </div> */}
          </div>

          {/* Éditeur */}
          <div className="mt-auto">
            <label className="block mb-2 text-sm font-semibold text-slate-200">
              Ton code ({meta.language}) :
            </label>
            <textarea
              className="w-full h-40 p-3 font-mono text-sm bg-slate-950 border border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={code}
              onChange={(e) => updateCode(e.target.value)}
            />

            {/* Bouttont terminer et Exécution des codes */}
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-between">
              <button
                onClick={runCode}
                disabled={loading}
                className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 transition"
              >
                {loading ? "Exécution..." : "▶ Exécuter le code"}
              </button>

              <button
                onClick={handleFinish}
                className="px-5 py-2 rounded-lg border border-emerald-500 text-emerald-300 text-sm hover:bg-emerald-500/10 transition"
              >
                ✅ Terminer le quiz
              </button>
            </div>

          </div>
        </section>

        {/* Colonne droite : résultat */}
        <section className="w-1/2 p-6 bg-slate-950">
          <h2 className="text-lg font-semibold mb-3">
            Résultat de l&apos;exécution – Question {currentIndex + 1}
          </h2>
          <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-lg h-[85vh] overflow-y-auto whitespace-pre-wrap border border-slate-800">
            {output ??
              "Aucun résultat pour le moment.\nTape ton code à gauche puis clique sur \"▶ Exécuter le code\"."}
          </div>
        </section>
      </div>
    </main>
  );
}
