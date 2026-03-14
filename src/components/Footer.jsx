import { useEffect, useRef, useState } from "react";
import "../styles/Footer.css";

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a"
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

const Footer = () => {
  const uptime = useSessionUptime();
  const [easterEgg, setEasterEgg] = useState(false);
  const seqRef = useRef([]);

  useEffect(() => {
    const handler = (e) => {
      seqRef.current = [...seqRef.current, e.key].slice(-KONAMI.length);
      if (seqRef.current.join(",") === KONAMI.join(",")) {
        setEasterEgg(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
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
        <div className="konami-overlay" onClick={() => setEasterEgg(false)}>
          <div className="konami-modal" onClick={(e) => e.stopPropagation()}>
            <button className="konami-close" onClick={() => setEasterEgg(false)}>✕</button>
            <pre className="konami-art">{`
  ██╗  ██╗███████╗████████╗██╗  ██╗██╗   ██╗
  ██║  ██║██╔════╝╚══██╔══╝██║  ██║██║   ██║
  ███████║█████╗     ██║   ███████║██║   ██║
  ██╔══██║██╔══╝     ██║   ██╔══██║██║   ██║
  ██║  ██║███████╗   ██║   ██║  ██║╚██████╔╝
  ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ `}</pre>
            <p className="konami-msg">
              You found the secret! <span className="konami-accent">↑↑↓↓←→←→BA</span>
              <br />
              <span className="konami-sub">Thanks for exploring every corner of this portfolio.</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
