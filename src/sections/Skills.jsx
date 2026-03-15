import { useState, useRef } from "react";
import Section from "../components/Section";
import TypedHeading from "../components/TypedHeading";
import "../styles/Skills.css";

const CATEGORIES = [
  {
    id: "languages",   file: "languages.js",    varName: "languages",
    prop: "core",
    tags: ["JavaScript", "TypeScript", "Python", "Java", "C++", "C"],
  },
  {
    id: "frontend",    file: "frontend.js",      varName: "frontend",
    prop: "ui",
    tags: ["React", "D3.js", "Leaflet", "HTML5", "CSS3"],
  },
  {
    id: "backend",     file: "backend.js",        varName: "backend",
    prop: "services",
    tags: ["Node.js", "Express.js", "REST APIs", "Microservices", "Serverless", "Event-Driven"],
  },
  {
    id: "cloud",       file: "cloud-devops.js",   varName: "cloud",
    prop: "infra",
    tags: ["AWS Lambda", "EventBridge", "Aurora PostgreSQL", "Docker", "GitLab CI/CD"],
  },
  {
    id: "databases",   file: "databases.js",      varName: "databases",
    prop: "stores",
    tags: ["PostgreSQL", "MySQL", "MongoDB", "Drizzle ORM"],
  },
  {
    id: "tools",       file: "tools.js",          varName: "tools",
    prop: "practices",
    tags: ["Git", "SonarQube", "GitLab CI/CD", "Agile / Scrum"],
  },
];

// Build code lines for the active category
const buildLines = (cat) => [
  { li: 0, content: <><span className="tk-kw">const </span><span className="tk-fn">{cat.varName}</span><span className="tk-op"> = </span><span className="tk-brace">{"{"}</span></> },
  { li: 1, content: <><span className="tk-ws">{"  "}</span><span className="tk-key">{cat.prop}</span><span className="tk-op">: </span><span className="tk-brace">{"["}</span></> },
  ...cat.tags.map((tag, i) => ({
    li: 2 + i,
    content: <><span className="tk-ws">{"    "}</span><span className="tk-str">{`"${tag}"`}</span><span className="tk-op">,</span></>,
  })),
  { li: 2 + cat.tags.length,     content: <><span className="tk-ws">{"  "}</span><span className="tk-brace">{"],"}</span></> },
  { li: 3 + cat.tags.length,     content: <><span className="tk-brace">{"}"}</span><span className="tk-op">;</span></> },
  { li: 4 + cat.tags.length,     content: null },   // blank
  { li: 5 + cat.tags.length,     content: <><span className="tk-kw">export default </span><span className="tk-fn">{cat.varName}</span><span className="tk-op">;</span></> },
];

const MAX_TILT = 5;

const Skills = () => {
  const [activeId, setActiveId] = useState("languages");
  const [panelKey, setPanelKey] = useState(0);
  const windowRef = useRef(null);

  const active = CATEGORIES.find((c) => c.id === activeId);

  const switchTo = (id) => {
    if (id === activeId) return;
    setActiveId(id);
    setPanelKey((k) => k + 1);
  };

  const onMouseMove = (e) => {
    const el = windowRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = "box-shadow 0.1s ease, border-color 0.1s ease";
    el.style.transform = `perspective(1400px) rotateX(${-ny * MAX_TILT * 2}deg) rotateY(${nx * MAX_TILT * 2}deg)`;
  };

  const onMouseLeave = () => {
    const el = windowRef.current;
    if (!el) return;
    el.style.transition = "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease, border-color 0.4s ease";
    el.style.transform = "";
  };

  const lines = buildLines(active);

  return (
    <Section id="skills">
      <div className="skills-wrapper reveal">
        <span className="section-watermark" aria-hidden="true">03</span>

        <div className="skills-heading">
          <span className="skills-line" />
          <TypedHeading text="What I Work With" className="skills-title" />
        </div>

        <div
          className="ce-window"
          ref={windowRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >

          {/* ── Titlebar ── */}
          <div className="ce-titlebar">
            <div className="ce-dots">
              <span className="ce-dot ce-dot--r" aria-hidden="true" />
              <span className="ce-dot ce-dot--y" aria-hidden="true" />
              <span className="ce-dot ce-dot--g" aria-hidden="true" />
            </div>
            <div className="ce-tabs">
              <div className="ce-tab">
                <span className="ce-tab-badge">JS</span>
                <span className="ce-tab-filename">{active.file}</span>
                <select
                  className="ce-tab-select"
                  value={activeId}
                  onChange={(e) => switchTo(e.target.value)}
                  aria-label="Select skill category"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.file}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ── Editor body ── */}
          <div className="ce-editor">

            {/* Left: file tree */}
            <aside className="ce-filetree">
              <div className="ce-ft-root">
                <span className="ce-ft-chevron">▾</span>
                <span className="ce-ft-folder">skills</span>
              </div>
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat.id}
                  className={`ce-ft-item${activeId === cat.id ? " ce-ft-item--active" : ""}`}
                  onClick={() => switchTo(cat.id)}
                  style={{ "--fi": i }}
                >
                  <span className="ce-ft-badge">JS</span>
                  <span className="ce-ft-name">{cat.file}</span>
                </button>
              ))}
            </aside>

            {/* Right: code panel */}
            <div key={panelKey} className="ce-code">
              {lines.map(({ li, content }) => (
                <div key={li} className="ce-line" style={{ "--li": li }}>
                  <span className="ce-ln">{li + 1}</span>
                  <span className="ce-cnt">{content}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </Section>
  );
};

export default Skills;
