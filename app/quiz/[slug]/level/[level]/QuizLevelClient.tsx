"use client";

import { useState } from "react";

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

export default function QuizLevelClient({ slug, level }: QuizLevelClientProps) {
  const meta = QUIZ_META[slug] ?? {
    title: "Quiz",
    language: "Code",
    intro: "Écris une solution pour ce quiz.",
  };

  const [code, setCode] = useState(
    meta.language === "SQL"
      ? "SELECT * FROM querydex;"
      : meta.language === "Python"
      ? "# Écris ton code ici"
      : "// Écris ton code ici"
  );

  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);

    try {
      const trimmed = code.trim().toLowerCase();

      if (slug === "sql-intro") {
        if (trimmed.includes("select") && trimmed.includes("from querydex")) {
          setOutput(
            "✅ Tests réussis :\n- Requête valide\n- Table querydex trouvée\n\n(Mode démo : 151 lignes simulées)"
          );
        } else {
          setOutput(
            "❌ Test échoué :\nOn attend une requête du type :\nSELECT * FROM querydex;"
          );
        }
      } else if (slug === "functions") {
        if (trimmed.includes("def greet") || trimmed.includes("function")) {
          setOutput(
            "✅ La fonction semble définie.\n\nExemple attendu : greet(\"Marie\") → \"Bonjour, Marie!\""
          );
        } else {
          setOutput(
            "❌ On attend la définition d'une fonction greet(name).\nIndice : def greet(name): ..."
          );
        }
      } else if (slug === "loops") {
        if (trimmed.includes("for") || trimmed.includes("while")) {
          setOutput(
            "✅ Une boucle a été détectée.\n\nVérifie que tu affiches bien les nombres de 1 à 10."
          );
        } else {
          setOutput(
            "❌ Aucune boucle détectée.\nPense à utiliser for ou while."
          );
        }
      } else {
        setOutput(
          "✅ Code reçu.\n(Ici tu pourras brancher le vrai serveur d'exécution et les tests automatiques.)"
        );
      }
    } catch (e) {
      setOutput("⚠️ Erreur interne lors de l'exécution simulée.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="flex h-screen">
        {/* Colonne gauche : énoncé + éditeur */}
        <section className="w-1/2 p-6 bg-slate-900 flex flex-col border-r border-slate-800">
          <div>
            <p className="text-xs text-sky-300 uppercase tracking-[0.25em] mb-2">
              {meta.language} · Niveau {level}
            </p>
            <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
              {meta.title}
            </h1>
            <p className="text-slate-300 mb-4">{meta.intro}</p>

            <p className="text-xs text-slate-400 mb-1">
              Questions : 1 / 10 (placeholder)
            </p>
            <p className="text-xs text-slate-500 mb-4">
              Plus tard : navigation entre les 10 questions de ce niveau.
            </p>
          </div>

          <div className="mt-auto">
            <label className="block mb-2 text-sm font-semibold text-slate-200">
              Ton code ({meta.language}) :
            </label>
            <textarea
              className="w-full h-40 p-3 font-mono text-sm bg-slate-950 border border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <button
              onClick={runCode}
              disabled={loading}
              className="mt-3 px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 transition"
            >
              {loading ? "Exécution..." : "▶ Exécuter le code"}
            </button>
          </div>
        </section>

        {/* Colonne droite : résultat */}
        <section className="w-1/2 p-6 bg-slate-950">
          <h2 className="text-lg font-semibold mb-3">Résultat de l&apos;exécution</h2>
          <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-lg h-[85vh] overflow-y-auto whitespace-pre-wrap border border-slate-800">
            {output ??
              "Aucun résultat pour le moment.\nTape ton code à gauche puis clique sur \"▶ Exécuter le code\"."}
          </div>
        </section>
      </div>
    </main>
  );
}
