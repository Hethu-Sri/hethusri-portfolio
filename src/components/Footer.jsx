import { useEffect, useRef, useState } from "react";
import "../styles/Footer.css";

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "KeyB","KeyA"
];

function useSessionUptime() {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(elapsed / 3600)).padStart(2, "0");
  const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
  const s = String(elapsed % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function MatrixRain({ onDone }) {
  const canvasRef = useRef(null);
  const fadeRef = useRef(false);
  const alphaRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const fontSize = 14;
    let cols = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -canvas.height / fontSize));

    let rafId;
    let lastFrame = 0;
    const interval = 45;

    const draw = (ts) => {
      if (ts - lastFrame < interval) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      lastFrame = ts;

      const opacity = alphaRef.current;

      ctx.fillStyle = `rgba(13, 17, 23, 0.18)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "Courier Prime", monospace`;

      cols = Math.floor(canvas.width / fontSize);
      while (drops.length < cols) drops.push(0);

      for (let i = 0; i < cols; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // leading char — bright white
        ctx.fillStyle = `rgba(200, 240, 255, ${opacity})`;
        ctx.fillText(char, x, y);

        // trail chars — cyan accent
        const trailChar = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillStyle = `rgba(91, 200, 245, ${opacity * 0.75})`;
        ctx.fillText(trailChar, x, y - fontSize);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // fade out
      if (fadeRef.current) {
        alphaRef.current = Math.max(0, alphaRef.current - 0.03);
        if (alphaRef.current <= 0) {
          cancelAnimationFrame(rafId);
          onDone();
          return;
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    // start fade after 3s
    const fadeTimer = setTimeout(() => { fadeRef.current = true; }, 3000);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(fadeTimer);
    };
  }, [onDone]);

  return (
    <div className="matrix-overlay" onClick={onDone}>
      <canvas ref={canvasRef} className="matrix-canvas" />
      <div className="matrix-msg">
        <span className="matrix-code">↑↑↓↓←→←→BA</span>
        <p>You found the secret.</p>
        <span className="matrix-hint">click to exit</span>
      </div>
    </div>
  );
}

const Footer = () => {
  const uptime = useSessionUptime();
  const [easterEgg, setEasterEgg] = useState(false);
  const seqRef = useRef([]);

  useEffect(() => {
    const handler = (e) => {
      seqRef.current = [...seqRef.current, e.code].slice(-KONAMI.length);
      if (seqRef.current.join(",") === KONAMI.join(",")) {
        setEasterEgg(true);
        seqRef.current = [];
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <footer className="site-footer">
        <div className="footer-inner">
          <span className="footer-content">© {new Date().getFullYear()} Hethu Sri</span>
          <span className="footer-uptime" title="Session uptime">
            <span className="uptime-dot" />
            {uptime}
          </span>
        </div>
      </footer>

      {easterEgg && (
        <MatrixRain onDone={() => setEasterEgg(false)} />
      )}
    </>
  );
};

export default Footer;
