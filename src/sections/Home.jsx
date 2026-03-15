import { useEffect, useRef, useState } from "react";
import Section from "../components/Section";
import "../styles/Home.css";

const lines = [
    "$ whoami",
    "Hethu Sri Nadipudi",
    "",
    '$ echo "Full-stack developer turning coffee into code and problems into scalable web applications, one commit at a time."',
];

/* ── Particle field hook ── */
function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const COUNT = 55;
    const CONNECT = 110;
    const REPEL_RADIUS = 120;
    const REPEL_FORCE = 2.8;
    let W, H, particles, rafId;
    let mouseX = -9999, mouseY = -9999;

    const resize = () => {
      const parent = canvas.parentElement;
      W = canvas.width  = parent.offsetWidth;
      H = canvas.height = parent.offsetHeight;
    };

    const rand = (min, max) => Math.random() * (max - min) + min;

    const init = () => {
      resize();
      particles = Array.from({ length: COUNT }, () => ({
        x: rand(0, W), y: rand(0, H),
        vx: rand(-0.25, 0.25), vy: rand(-0.25, 0.25),
        r: rand(1.2, 2.2),
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const isDark = document.body.getAttribute("data-theme") !== "light";
      const color  = isDark ? "91,200,245" : "11,18,32";
      const dotA   = isDark ? 0.55 : 0.5;
      const lineA  = isDark ? 0.18 : 0.18;

      particles.forEach((p) => {
        // Mouse repel
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < REPEL_RADIUS && d > 0) {
          const f = ((REPEL_RADIUS - d) / REPEL_RADIUS) * REPEL_FORCE;
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        }

        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${dotA})`;
        ctx.fill();
      });

      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${color},${(1 - dist / CONNECT) * lineA})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouseX = -9999; mouseY = -9999; };

    init();
    draw();

    const parent = canvas.parentElement;
    parent.addEventListener("mousemove", onMouseMove);
    parent.addEventListener("mouseleave", onMouseLeave);
    const ro = new ResizeObserver(init);
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      parent.removeEventListener("mousemove", onMouseMove);
      parent.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [canvasRef]);
}

const Home = () => {
    const [displayedLines, setDisplayedLines] = useState([]);
    const [currentLine, setCurrentLine] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const canvasRef = useRef(null);

    useParticles(canvasRef);

    useEffect(() => {
        if (lineIndex >= lines.length) return;

        if (charIndex < lines[lineIndex].length) {
            const timeout = setTimeout(() => {
                setCurrentLine((prev) => prev + lines[lineIndex][charIndex]);
                setCharIndex(charIndex + 1);
            }, 45);

            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setDisplayedLines((prev) => [...prev, currentLine]);
                setCurrentLine("");
                setCharIndex(0);
                setLineIndex(lineIndex + 1);
            }, 400);

            return () => clearTimeout(timeout);
        }
    }, [charIndex, lineIndex]);

    const renderLine = (line, idx) => {
        if (line === "Hethu Sri Nadipudi") {
            return (
                <h1 key={idx} className="terminal-h1 glitch-name" data-text={line}>
                    {line}
                </h1>
            );
        }

        if (line.startsWith('$ echo')) {
            const text = line.replace('$ echo "', "").replace('"', "");
            return (
                <h2 key={idx} className="terminal-h2">
                    {text}
                </h2>
            );
        }

        if (line === "$ whoami") {
            return (
                <div key={idx} className="terminal-line">
                    <span className="terminal-prompt">$</span>{" "}
                    <span className="terminal-command">whoami</span>
                </div>
            );
        }

    };

    return (
        <Section id="home">
            <div className="home-page">
                <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
                <div className="terminal-window reveal" style={{ "--delay": "250ms" }}>
                    {/* macOS-style title bar */}
                    <div className="terminal-titlebar">
                        <div className="terminal-dots">
                            <span className="dot dot-red" />
                            <span className="dot dot-yellow" />
                            <span className="dot dot-green" />
                        </div>
                        <span className="terminal-titlebar-text">hethu@portfolio: ~</span>
                    </div>

                    {/* Terminal content */}
                    <div className="terminal-block">
                        {displayedLines.map(renderLine)}

                        {lineIndex < lines.length && (
                            <div className="terminal-line">
                                {currentLine}
                                <span className="terminal-cursor">▌</span>
                            </div>
                        )}
                    </div>

                    {/* CRT scanline overlay */}
                    <div className="terminal-scanlines" aria-hidden="true" />
                </div>
            </div>
            {/* Scroll cue */}
            <div className="scroll-cue">
                <span>SCROLL</span>
                <div className="scroll-line"></div>
            </div>
        </Section>
    );
};

export default Home;
