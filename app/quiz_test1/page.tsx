"use client";

import { useState } from "react";

export default function QuizPage() {
  // texte que l'étudiant tape
  const [code, setCode] = useState("SELECT * FROM querydex;");
  // résultat affiché à droite
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fonction simulant l'exécution du code
  const runCode = async () => {
    setLoading(true);

    try {
      // 👉 plus tard : ici tu appelleras ton VRAI serveur
      // const res = await fetch("/api/run", { method: "POST", body: JSON.stringify({ code }) });
      // const data = await res.json();
      // setOutput(data.result);

      // Pour l'instant : petite simulation
      if (code.toLowerCase().includes("select") && code.toLowerCase().includes("from querydex")) {
        setOutput("Résultat simulé : 151 lignes renvoyées ✅");
      } else {
        setOutput("Erreur : ta requête ne ressemble pas à `SELECT * FROM querydex;` ❌");
      }
    } catch (e) {
      setOutput("Erreur serveur ⚠️");
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* COLONNE GAUCHE : énoncé + zone de code */}
      <div className="w-1/2 p-6 overflow-auto bg-white shadow-md flex flex-col">
        {/* En-tête / question */}
        <div>
          <h1 className="text-2xl font-bold text-blue-600 mb-3">
            QueryMon – Niveau 1
          </h1>
          <p className="text-gray-700 mb-2">
            Bienvenue dans le QueryDex ! Tu dois afficher toutes les lignes de la table{" "}
            <b>querydex</b>.
          </p>
          <p className="text-gray-700 mb-2">
            Écris une requête SQL pour récupérer toutes les colonnes de cette table.
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Indice : <code>SELECT * FROM querydex;</code>
          </p>
        </div>

        {/* Zone de code en bas (on pousse avec mt-auto) */}
        <div className="mt-auto">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Ta requête SQL :
          </label>
          <textarea
            className="w-full h-32 p-3 font-mono text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            onClick={runCode}
            disabled={loading}
            className="mt-3 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Exécution..." : "▶ Exécuter"}
          </button>
        </div>
      </div>

      {/* COLONNE DROITE : résultat */}
      <div className="w-1/2 p-6 bg-gray-50 border-l overflow-auto">
        <h2 className="text-lg font-semibold mb-3">Résultat :</h2>
        <div className="bg-black text-green-400 font-mono p-3 rounded-lg h-[80vh] overflow-y-auto whitespace-pre-wrap">
          {output ?? "Aucun résultat pour le moment. Tape du code à gauche et clique sur Exécuter."}
        </div>
      </div>
    </div>
  );
}
