import { useEffect, useRef, useState } from "react";
import Section from "../components/Section";
import TypedHeading from "../components/TypedHeading";
import "../styles/About.css";

const STATS = [
  { value: 3,  suffix: "+", label: "Years Exp." },
  // { value: 10, suffix: "+", label: "Projects"   },
  { value: 1000, suffix: "+", label: "Commits" },
  { value: 2,  suffix: "",  label: "Countries"  },
];

// Z-depth per AR label — floats progressively further in front
const AR_LABELS = [
  { key: "Location", val: "Cincinnati, OH", z: 20 },
  { key: "Status",   val: "Open to Work",   z: 35 },
  { key: "Focus", val: "Full-Stack Development", z: 50 }
]

const MAX_TILT = 12; // degrees

function useCountUp(target, duration = 1400, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTs = null;
    const step = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

function StatPill({ value, suffix, label, started, idx }) {
  const count = useCountUp(value, 1400, started);
  return (
    <div className="stat-pill" style={{ "--pi": idx }}>
      <span className="stat-pill-num">{count}{suffix}</span>
      <span className="stat-pill-label">{label}</span>
    </div>
  );
}

const About = () => {
  const pageRef      = useRef(null);
  const tiltRef      = useRef(null);   // outer tilt wrapper
  const specularRef  = useRef(null);   // specular highlight div
  const [statsStarted, setStatsStarted] = useState(false);

  // Scroll-enter: trigger stat count-up
  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // 3D tilt on mousemove
  const onTiltMove = (e) => {
    const card     = tiltRef.current;
    const specular = specularRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const nx = (e.clientX - rect.left)  / rect.width  - 0.5;   // -0.5 … +0.5
    const ny = (e.clientY - rect.top)   / rect.height - 0.5;

    const rotX = -ny * MAX_TILT * 2;   // ×2 because range is ±0.5 → max = 12°
    const rotY =  nx * MAX_TILT * 2;

    // Follow cursor in real-time — no transition while moving
    card.style.transition = "none";
    card.style.transform  =
      `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    // Specular: radial light highlight that tracks the cursor
    if (specular) {
      const sx = ((nx + 0.5) * 100).toFixed(1);
      const sy = ((ny + 0.5) * 100).toFixed(1);
      specular.style.background =
        `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.13) 0%, transparent 58%)`;
    }
  };

  // Spring back on mouseleave
  const onTiltLeave = () => {
    const card     = tiltRef.current;
    const specular = specularRef.current;
    if (!card) return;

    card.style.transition =
      "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";

    if (specular) specular.style.background = "none";
  };

  return (
    <Section id="about">
      <div className="about-page section-trigger reveal" ref={pageRef}>
        <span className="section-watermark" aria-hidden="true">01</span>

        <div className="about-heading">
          <span className="about-line" />
          <TypedHeading text="Getting To Know Me" className="about-title" />
        </div>

        <div className="about-split">

          {/* ══ LEFT: 3D photo card ══
              Two-layer structure:
              • photo-tilt-wrap  → owns perspective + preserve-3d, NO overflow:hidden
              • photo-frame      → overflow:hidden clip for image/overlays (flattens its own 3D, that's fine)
              AR labels live outside photo-frame so they can float at true Z depths
          */}
          <div
            className="about-card photo-tilt-wrap"
            style={{ "--card-i": 0 }}
            ref={tiltRef}
            onMouseMove={onTiltMove}
            onMouseLeave={onTiltLeave}
          >
            {/* ── Clipped image layer (Z = 0) ── */}
            <div className="photo-frame">
              <img
                className="photo-img"
                src="/profile.jpg"
                alt="Hethu Sri"
                draggable="false"
              />
              {/* Cyan duotone on hover */}
              <div className="photo-duotone" aria-hidden="true" />
              {/* Scan-line sweep on hover */}
              <div className="photo-scan" aria-hidden="true" />
              {/* Specular light — updated by JS */}
              <div className="photo-specular" ref={specularRef} aria-hidden="true" />
              {/* AR corner brackets stay on photo surface */}
              <div className="ar-corner ar-tl" aria-hidden="true" />
              <div className="ar-corner ar-br" aria-hidden="true" />
            </div>

            {/* ── AR labels at varying Z depths (float above photo) ── */}
            <div className="ar-labels">
              {AR_LABELS.map((l, i) => (
                <div
                  key={l.key}
                  className="ar-label"
                  style={{ "--li": i, "--z": `${l.z}px` }}
                >
                  <span className="ar-dot"  aria-hidden="true" />
                  <span className="ar-key">{l.key}</span>
                  <span className="ar-sep"  aria-hidden="true">›</span>
                  <span className="ar-val">{l.val}</span>
                </div>
              ))}
            </div>

            {/* ── Stat shelf — slight Z so it lifts with the tilt ── */}
            <div className="stat-pills-shelf">
              {STATS.map((s, i) => (
                <StatPill
                  key={s.label}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  started={statsStarted}
                  idx={i}
                />
              ))}
            </div>

          </div>

          {/* ══ RIGHT: Bio card ══ */}
          <div className="about-card about-bio-card" style={{ "--card-i": 1 }}>
            <span className="bio-file-tag">// about.me</span>

            <p className="bio-para">
              I'm a software engineer with almost four years of experience building web,
              cloud, and data-driven systems across frontend, backend, and distributed architectures.
            </p>
            <p className="bio-para">
              I'm currently pursuing a Master's degree in Computer Science at the University of
              Cincinnati, deepening my interests in data visualization, cloud systems, and scalable
              application design.
            </p>
            <p className="bio-para">
              I enjoy problems that require both technical depth and structural clarity — whether
              that's modernizing legacy platforms, designing serverless APIs, or building interactive
              visualizations that make complex data easier to explore.
            </p>
            <p className="bio-para">
              Outside of engineering, I enjoy exploring new places and spending time with creative
              work that helps me reset and think differently.
            </p>

            <div className="bio-terminal">
              <span className="bt-dollar">$</span>
              <span className="bt-cmd"> status</span>
              <span className="bt-colon">:</span>
              <span className="bt-val"> available for opportunities</span>
              <span className="bt-cursor">▌</span>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
};

export default About;
