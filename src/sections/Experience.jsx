import { useEffect, useRef, useState } from "react";
import Section from "../components/Section";
import "../styles/Experience.css";

const ROLES = [
  {
    key: "abs",
    company: "Agile Business Solutions",
    role: "Full Stack Developer Intern",
    date: "Dec 2025 – Present",
    location: "Massachusetts, United States",
    bullets: [
      "Designed event-driven, serverless microservices using Node.js and TypeScript",
      "Built REST APIs with AWS Lambda, API Gateway, and EventBridge",
      "Implemented multi-tenant authentication and RBAC using AWS Cognito",
      "Developed custom Lambda authorizers and audit logging mechanisms",
      "Integrated React micro-frontend applications with shared component libraries",
      "Automated builds and deployments using CI/CD pipelines",
    ],
    tech: ["Node.js", "TypeScript", "AWS Lambda", "API Gateway", "EventBridge", "AWS Cognito", "React", "CI/CD"],
  },
  {
    key: "as-sde",
    company: "Agile Solutions",
    role: "Software Development Engineer",
    date: "May 2022 – Aug 2024",
    location: "Bangalore, India",
    bullets: [
      "Developed secure, scalable features for a Tax Intelligence & Management Platform",
      "Built enterprise-grade functionality serving global clients",
      "Migrated platform from SAP XS Classic to XS Advanced architecture",
      "Re-architected synchronous workflows into asynchronous services",
      "Improved system throughput and responsiveness by approximately 35%",
      "Automated CI/CD reporting using Python-based analytics",
      "Enforced code quality and security using SonarQube and Node.js scanners",
    ],
    tech: ["JavaScript", "Python", "Node.js", "SAP XS Advanced", "SAP HANA", "SQL", "SonarQube", "CI/CD", "REST", "JSON"],
  },
  {
    key: "as-intern",
    company: "Agile Solutions",
    role: "Intern Developer",
    date: "May 2021 – Apr 2022",
    location: "Bangalore, India",
    bullets: [
      "Fixed critical production bugs and performance bottlenecks",
      "Implemented feature enhancements to improve platform turnaround time",
      "Developed backend services using SAP XSJS and SAP HANA",
      "Validated APIs and integrations using SOAP UI",
      "Contributed frontend components using HTML, CSS, and JavaScript",
    ],
    tech: ["JavaScript", "SQL", "SAP XSJS", "SAP HANA", "SOAP UI", "HTML", "CSS"],
  },
  {
    key: "epam",
    company: "EPAM Systems",
    role: "Software Engineering Trainee",
    date: "Sep 2020 – May 2021",
    location: "Hyderabad, India",
    bullets: [
      "Completed intensive training in Java and object-oriented programming",
      "Practiced data structures and algorithmic problem solving",
      "Built small-scale applications using clean code principles",
      "Applied Agile workflows and Git-based version control",
      "Collaborated in team-based engineering exercises",
    ],
    tech: ["Java", "OOP", "Data Structures", "Algorithms", "Git", "Agile"],
  },
  {
    key: "ta",
    company: "Teaching Assistant",
    role: "University of KL",
    date: "Dec 2019 – Mar 2021",
    location: "Vijayawada, India",
    bullets: [
      "Assisted undergraduate courses in Cyber Security and Computer Networks",
      "Designed lab tutorials, assignments, and instructional materials",
      "Conducted tutorial sessions and concept walkthroughs",
      "Mentored students through hands-on problem solving",
    ],
    tech: ["Cyber Security", "Computer Networks", "Teaching", "Curriculum Design", "Mentoring"],
  },
];

const Experience = () => {
  const [active, setActive] = useState("abs");
  const [panelKey, setPanelKey] = useState(0);
  const wrapperRef = useRef(null);
  const [lineH, setLineH] = useState(0);

  const switchTo = (key) => {
    if (key === active) return;
    setActive(key);
    setPanelKey((k) => k + 1);
  };

  // Draw timeline line on reveal
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setLineH(100); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeData = ROLES.find((r) => r.key === active);

  return (
    <Section id="experience">
      <div className="experience-wrapper reveal" ref={wrapperRef}>
        <span className="section-watermark" aria-hidden="true">02</span>

        <div className="experience-heading">
          <span className="experience-line" />
          <h1 className="experience-title">Where I've Worked</h1>
        </div>

        <div className="exp-split">

          {/* ── LEFT: vertical timeline ── */}
          <div className="exp-tl">
            <div className="tl-track" aria-hidden="true">
              <div className="tl-track-fill" style={{ height: `${lineH}%` }} />
            </div>

            {ROLES.map((r) => (
              <button
                key={r.key}
                className={`tl-node${active === r.key ? " tl-node--active" : ""}`}
                onClick={() => switchTo(r.key)}
                aria-pressed={active === r.key}
              >
                <div className="tl-node-dot" aria-hidden="true" />
                <div className="tl-node-info">
                  <span className="tl-company">{r.company}</span>
                  <span className="tl-role">{r.role}</span>
                  <span className="tl-date">{r.date}</span>
                </div>
              </button>
            ))}
          </div>

          {/* ── RIGHT: glassmorphism detail panel ── */}
          <div key={panelKey} className="exp-panel">
            <div className="exp-panel-scan" aria-hidden="true" />

            <div className="ep-header">
              <div>
                <h2 className="ep-company">{activeData.company}</h2>
                <p className="ep-role">{activeData.role}</p>
              </div>
              <span className="ep-date">{activeData.date}</span>
            </div>
            <p className="ep-location">{activeData.location}</p>

            <ul className="ep-bullets">
              {activeData.bullets.map((b, i) => (
                <li key={i} style={{ "--bi": i }}>{b}</li>
              ))}
            </ul>

            <div className="ep-tech">
              {activeData.tech.map((t, i) => (
                <span key={t} style={{ "--ti": i }}>{t}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
};

export default Experience;
