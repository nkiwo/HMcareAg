"use client";

import { useState } from "react";

function buildProjectFromTask(task) {
  const trimmed = task.trim();
  const short =
    trimmed.length > 120 ? trimmed.slice(0, 117).trimEnd() + "..." : trimmed;

  const today = new Date();
  const dateStr = today.toLocaleDateString("de-DE");

  return {
    goal: trimmed || "Projektbeschreibung wurde nicht angegeben.",
    shortGoal: short || "Kein konkretes Ziel angegeben.",
    startDate: dateStr,
    successDefinition:
      "Das Projekt gilt als abgeschlossen, wenn alle geplanten Schritte ausgeführt, dokumentiert und die definierten Erfolgskriterien überprüft sind.",
    phases: [
      {
        title: "Phase 1 · Klärung & Rahmen",
        description: "Der Agent versteht genau, was du willst, und definiert den Rahmen.",
        steps: [
          "Zerlege die Anfrage in Ziel, Zeitrahmen und beteiligte Personen.",
          "Identifiziere Risiken, Abhängigkeiten und notwendige Ressourcen.",
          "Formuliere eine klare, überprüfbare Zieldefinition."
        ]
      },
      {
        title: "Phase 2 · Struktur & Plan",
        description: "Der Agent strukturiert das Projekt in präzise Teilaufgaben.",
        steps: [
          "Erstelle eine To-do-Liste mit sinnvollen Clustern (Analyse, Planung, Umsetzung, Kontrolle).",
          "Ordne Aufgaben in logische Reihenfolge.",
          "Definiere für jeden Block: Ergebnis, Deadline, Verantwortung."
        ]
      },
      {
        title: "Phase 3 · Simulation der Ausführung",
        description:
          "In dieser Version simuliert der Agent, welche Schritte er ausführen würde.",
        steps: [
          "Gehe die To-do-Liste gedanklich durch und markiere Aufgaben als erledigt.",
          "Identifiziere typische Probleme, Blockaden oder Engpässe.",
          "Notiere, welche Informationen, Zugänge oder Tools ein echter Agent ansteuern würde."
        ]
      },
      {
        title: "Phase 4 · Abschluss & Reflexion",
        description: "Der Agent beendet das Projekt bewusst.",
        steps: [
          "Fasse Ergebnisse, Entscheidungen und Learnings zusammen.",
          "Liste offene Punkte auf, die noch menschliche Entscheidung brauchen.",
          "Setze einen klaren Abschluss: „Projekt abgeschlossen“ (Datum, Check gegen Ziel)."
        ]
      }
    ],
    completionCriteria: [
      "Das ursprüngliche Ziel ist beantwortet oder erreicht.",
      "Alle Phasen wurden durchlaufen.",
      "Es existiert eine klare schriftliche Zusammenfassung.",
      "Offene Punkte sind klar markiert.",
      "Der Agent definiert, wer den nächsten Schritt übernimmt."
    ]
  };
}

export default function HomePage() {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("idle");
  const [project, setProject] = useState(null);

  const handleRunAgent = () => {
    if (!task.trim()) return;
    setStatus("running");
    setProject(null);

    const built = buildProjectFromTask(task);

    setTimeout(() => {
      setProject(built);
      setStatus("done");
    }, 900);
  };

  return (
    <div className="hc-root">
      <header className="hc-header">
        <h1>HUMAN:care · Agent Project Cockpit</h1>
        <p>Beschreibe ein Projekt, das ein autonomer KI-Agent vollständig strukturieren soll.</p>
      </header>

      <main className="hc-main">
        <section className="hc-card hc-input-card">
          <label className="hc-label">
            Was soll der Agent übernehmen?
            <textarea
              className="hc-textarea"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Beispiel: ‘Plane ein 7-tägiges Entlassungsmanagement für einen COPD-Patienten inkl. Dokumentation, Arztterminen und Versorgung.’"
            />
          </label>

          <button
            className="hc-button"
            onClick={handleRunAgent}
            disabled={status === "running"}
          >
            {status === "running" ? "Agent denkt..." : "Agent starten"}
          </button>
        </section>

        <section className="hc-card hc-summary-card">
          <h2>Projektübersicht</h2>
          {!project && <p className="hc-placeholder">Noch kein Projekt gestartet.</p>}
          {project && (
            <>
              <h3>Ziel</h3>
              <p>{project.shortGoal}</p>

              <h4>Projektstart</h4>
              <p>{project.startDate}</p>

              <h4>Definition von „fertig“</h4>
              <p>{project.successDefinition}</p>
            </>
          )}
        </section>

        <section className="hc-card hc-phases-card">
          <h2>Agenten-Phasen</h2>
          {!project && <p className="hc-placeholder">Keine Daten vorhanden.</p>}
          {project && (
            <ol className="hc-phase-list">
              {project.phases.map((phase, index) => (
                <li key={index} className="hc-phase-item">
                  <strong>{phase.title}</strong>
                  <p>{phase.description}</p>
                  <ul className="hc-step-list">
                    {phase.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="hc-card hc-criteria-card">
          <h2>Abschlusskriterien des Agenten</h2>
          {!project && <p className="hc-placeholder">Noch keine Kriterien.</p>}
          {project && (
            <ul className="hc-step-list">
              {project.completionCriteria.map((crit, i) => (
                <li key={i}>{crit}</li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="hc-footer">
        HUMAN:care · Agentic Prototype v0.1
      </footer>
    </div>
  );
}
