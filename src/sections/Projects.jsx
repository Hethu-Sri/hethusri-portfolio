import { useEffect, useRef, useState } from "react";
import "../styles/Projects.css";
import { Github, ExternalLink } from "lucide-react";
import TypedHeading from "../components/TypedHeading";

const GIT_LOG = [
  { hash: "a3f9b2c", msg: "feat: add F1 telemetry pipeline" },
  { hash: "7e1c4d8", msg: "fix: resolve canvas memory leak" },
  { hash: "2b5f1a9", msg: "feat: championship prediction model" },
  { hash: "9d4e3c7", msg: "refactor: extract chart components" },
  { hash: "4f8a2e1", msg: "feat: choropleth coordinated views" },
  { hash: "1c7b5d3", msg: "fix: handle API rate limits" },
  { hash: "8e2f4a6", msg: "chore: migrate Ergast → Jolpica" },
  { hash: "3b9d1e5", msg: "feat: Wikipedia photo pipeline" },
  { hash: "f6c3a7d", msg: "fix: Azure pipeline auth tokens" },
  { hash: "d5e8b1f", msg: "feat: seismic risk globe render" },
];

const GitLogEgg = () => {
  const [offset, setOffset] = useState(0);
  const rafRef = useRef(null);
  const lastTs = useRef(null);
  const ROW_H = 22;

  useEffect(() => {
    const tick = (ts) => {
      if (!lastTs.current) lastTs.current = ts;
      const delta = ts - lastTs.current;
      lastTs.current = ts;
      setOffset((o) => (o + delta * 0.018) % (GIT_LOG.length * ROW_H));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <a
      href="https://github.com/Hethu-Sri"
      target="_blank"
      rel="noreferrer"
      className="git-log-egg"
      aria-label="View GitHub profile"
    >
      <div className="git-log-header">
        <span className="git-log-dot" />
        <span className="git-log-dot" />
        <span className="git-log-dot" />
        <span className="git-log-title">git log --oneline</span>
      </div>
      <div className="git-log-viewport">
        <div className="git-log-track" style={{ transform: `translateY(-${offset}px)` }}>
          {[...GIT_LOG, ...GIT_LOG].map((entry, i) => (
            <div key={i} className="git-log-row">
              <span className="git-hash">{entry.hash}</span>
              <span className="git-msg">{entry.msg}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="git-log-cta">↗ view on github</p>
    </a>
  );
};

const projects = [
  {
    num: "01",
    title: "Interactive Socioeconomic & Health Data Visualization",
    github: "https://github.com/Hethu-Sri/Interactive-Socioeconomic-Health-Visualization-V2",
    live: "https://visual-interfaces-updated-project-1.vercel.app/",
    intro: "To analyze the relationship between education levels and healthcare access across U.S. counties I built an interactive data visualization dashboard.",
    bullets: [
      "Integrated coordinated views including a choropleth map, histogram, and scatterplot with brushing, filtering, and linked interactions.",
      "Improved usability through enhanced tooltips, data cleaning, accessibility-aware color choices, and refined UI controls.",
    ],
    back: "An interactive dashboard analyzing education levels vs. healthcare access across U.S. counties. Built with D3.js coordinated views — choropleth maps, histograms, scatterplots — all linked with real-time brushing and filtering.",
    tags: ["JavaScript", "D3.js", "Data Visualization"],
  },
  {
    num: "02",
    title: "F1 Analytics Dashboard",
    github: "https://github.com/Hethu-Sri/f1-analytics-dashboard",
    live: "https://f1-analytics-dashboard.vercel.app/",
    intro: "Built a full-stack Formula 1 data platform covering 1950–2026, integrating OpenF1 and Jolpica APIs for live telemetry, lap timing, tire strategy, and historical standings.",
    bullets: [
      "Engineered a global API request queue serializing concurrent calls at 420ms intervals, eliminating rate limit errors across multiple chart components.",
      "Built a championship prediction model using exponential decay on points gaps with a configurable races-remaining slider.",
      
    ],
    back: "Full-stack F1 data platform covering 1950–2026 with live telemetry, lap timing, tire strategy, and historical standings. Features a championship prediction model with exponential decay, a global API request queue, and a Wikipedia photo pipeline with in-memory caching.",
    tags: ["React", "TypeScript", "Recharts", "Framer Motion", "OpenF1 API"],
  },
  
  {
    num: "03",
    title: "Retail Analytics & Customer Insights Dashboard",
    github: "https://github.com/Hethu-Sri/RetailsAnalyticsPlatform",
    live: "https://finalprojectgroup19-gbhfbbeafjfdbnf5.centralus01.azurewebsites.net/",
    intro: "Built a cloud-based retail analytics platform on Microsoft Azure to explore customer behavior, transactions, and product patterns using interactive dashboards.",
    bullets: [
      "Implemented end-to-end data pipelines with Azure SQL, Storage Accounts, and Data Factory.",
      "Applied ML models including Gradient Boosting and Random Forest for CLV, basket analysis, and churn prediction.",
    ],
    back: "Cloud-based retail analytics on Azure with full data pipelines (SQL, Storage, Data Factory). Machine learning models — Gradient Boosting & Random Forest — drive CLV prediction, basket analysis, and churn forecasting.",
    tags: ["React", "JavaScript", "Azure", "Data Analytics", "Azure SQL"],
  },
  {
    num: "04",
    title: "Earthquake Data Visualization",
    github: "https://github.com/Hethu-Sri/EarthQuakeDataVisualization",
    live: "https://visual-interfaces-project-2.vercel.app/",
    intro: "Developed an interactive data visualization dashboard for exploring global earthquake activity using coordinated visual views.",
    bullets: [
      "Combined maps, timelines, and charts to analyze seismic patterns across time, magnitude, and geography.",
      "Implemented linked interactions and a predictive mini globe to highlight high-risk seismic zones.",
    ],
    back: "Interactive dashboard for global earthquake activity — coordinated maps, timelines, and charts with cross-view brushing. Features a predictive risk globe to identify high-risk seismic zones worldwide.",
    tags: ["JavaScript", "D3.js", "Leaflet", "Data Visualization"],
  },
  {
    num: "05",
    title: "Phineas & Ferb Series Visualization",
    github: "https://github.com/Hethu-Sri/PhineasAndFerb-Series-Visualization",
    live: "https://phineas-ferb-vis.netlify.app/",
    intro: "An interactive visualization dashboard to analyze dialogue, character presence, and narrative patterns across 200+ episodes.",
    bullets: [
      "Visualized character timelines, interaction matrices, episode explorers, and animated bar-race charts.",
      "Applied text analysis to uncover dialogue trends, iconic phrases, and character dynamics.",
    ],
    back: "Visualization dashboard analyzing 200+ episodes of Phineas & Ferb. Character timelines, interaction matrices, animated bar-race charts, and NLP-powered dialogue analysis reveal series-wide narrative patterns.",
    tags: ["JavaScript", "Python", "D3.js", "Data Visualization"],
  },
];

const Projects = () => {
  const [flippedCard, setFlippedCard] = useState(null);

  useEffect(() => {
    const handlers = [];

    // 3D tilt + gradient tracking on each card wrapper
    document.querySelectorAll(".card-tilt-wrapper").forEach((wrapper) => {
      const card = wrapper.querySelector(".project-card");

      const onMove = (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        wrapper.style.setProperty("--mouse-x", `${x}px`);
        wrapper.style.setProperty("--mouse-y", `${y}px`);

        if (!card.classList.contains("is-flipped")) {
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const rotX = ((y - cy) / cy) * -10;
          const rotY = ((x - cx) / cx) * 10;
          wrapper.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.025, 1.025, 1.025)`;
        }
      };

      const onLeave = () => {
        wrapper.style.removeProperty("--mouse-x");
        wrapper.style.removeProperty("--mouse-y");
        wrapper.style.transform = "";
      };

      wrapper.addEventListener("mousemove", onMove);
      wrapper.addEventListener("mouseleave", onLeave);
      handlers.push({ el: wrapper, onMove, onLeave });
    });

    // Gradient tracking on skills / experience cards (unchanged)
    document.querySelectorAll(".skills-card, .tech-bubbles").forEach((card) => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      };
      const onLeave = () => {
        card.style.removeProperty("--mouse-x");
        card.style.removeProperty("--mouse-y");
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      handlers.push({ el: card, onMove, onLeave });
    });

    return () => {
      handlers.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  const toggleFlip = (idx) => {
    // reset tilt before flip so animation is clean
    const wrappers = document.querySelectorAll(".card-tilt-wrapper");
    if (wrappers[idx]) wrappers[idx].style.transform = "";
    setFlippedCard((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="projects">
      <div className="project-wrapper section-trigger">
        <span className="section-watermark" aria-hidden="true">04</span>

        <div className="project-heading reveal">
          <span className="project-line" />
          <TypedHeading text="Things I've Built" className="project-title" />
        </div>

        <p className="project-subtitle reveal" style={{ "--delay": "120ms" }}>
          Selected projects in data analytics, visualization, and full-stack development.{" "}
          <span className="project-flip-hint">↗ Click any card to flip</span>
        </p>

        <GitLogEgg />

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div
              className="card-tilt-wrapper reveal"
              style={{ "--delay": `${260 + idx * 140}ms` }}
              key={idx}
            >
              <div
                className={`project-card ${flippedCard === idx ? "is-flipped" : ""}`}
                onClick={() => toggleFlip(idx)}
              >
                <div className="card-inner">

                  {/* ── FRONT FACE ── */}
                  <div className="card-front">
                    <span className="card-num" aria-hidden="true">{project.num}</span>

                    <div>
                      <div className="project-header">
                        <h3>{project.title}</h3>
                      </div>

                      <ul className="project-points">
                        {project.intro}
                        {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    </div>

                    <p className="flip-hint">↻ click to flip</p>
                  </div>

                  {/* ── BACK FACE ── */}
                  <div className="card-back">
                    <span className="card-back-num" aria-hidden="true">{project.num}</span>

                    <div className="card-back-content">
                      <h3 className="card-back-title">{project.title}</h3>
                      <p className="card-back-desc">{project.back}</p>

                      <div className="card-back-tags">
                        {project.tags.map((t) => <span key={t}>{t}</span>)}
                      </div>

                      <div className="card-back-links" onClick={(e) => e.stopPropagation()}>
                        <a href={project.github} target="_blank" rel="noreferrer" className="back-link">
                          <Github size={14} /> GitHub
                        </a>
                        <a href={project.live} target="_blank" rel="noreferrer" className="back-link back-link-primary">
                          <ExternalLink size={14} /> Live Demo
                        </a>
                      </div>
                    </div>

                    <p className="flip-hint flip-hint-back">↙ click to close</p>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
