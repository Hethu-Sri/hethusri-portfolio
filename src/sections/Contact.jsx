import { useEffect, useRef, useState } from "react";
import Section from "../components/Section";
import "../styles/Contact.css";

const MENU = [
  { key: "1", label: "Email",      href: "mailto:hethusrin@gmail.com" },
  { key: "2", label: "LinkedIn",   href: "https://www.linkedin.com/in/hethusri-nadipudi/" },
  { key: "3", label: "GitHub",     href: "https://github.com/Hethu-Sri" },
  { key: "4", label: "LeetCode",   href: "https://leetcode.com/u/hethusri_n/" },
  { key: "5", label: "HackerRank", href: "https://www.hackerrank.com/profile/klu_180031430" },
];

const SSH_CMD = "ssh hethu@hethusri.com --connect";

const Contact = () => {
  const wrapperRef = useRef(null);
  // phases: 0=idle, 1=typing, 2=connecting, 3=menu, 4=ready
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState("");
  const [menuVisible, setMenuVisible] = useState(0); // how many menu items shown
  const [hovered, setHovered] = useState(null);

  // Trigger sequence when section enters view
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === 0) {
          setPhase(1);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [phase]);

  // Typing animation
  useEffect(() => {
    if (phase !== 1) return;
    if (typed.length < SSH_CMD.length) {
      const t = setTimeout(
        () => setTyped(SSH_CMD.slice(0, typed.length + 1)),
        typed.length === 0 ? 600 : 48
      );
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase(2), 500);
      return () => clearTimeout(t);
    }
  }, [phase, typed]);

  // After connecting show menu items one by one
  useEffect(() => {
    if (phase !== 2) return;
    const t = setTimeout(() => setPhase(3), 900);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 3) return;
    if (menuVisible < MENU.length) {
      const t = setTimeout(() => setMenuVisible((v) => v + 1), 120);
      return () => clearTimeout(t);
    } else {
      setPhase(4);
    }
  }, [phase, menuVisible]);

  // Keyboard 1-5 navigation
  useEffect(() => {
    if (phase < 4) return;
    const handler = (e) => {
      const idx = parseInt(e.key, 10) - 1;
      if (idx >= 0 && idx < MENU.length) {
        window.open(MENU[idx].href, MENU[idx].href.startsWith("mailto") ? "_self" : "_blank");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase]);

  return (
    <Section id="contact">
      <div className="contact-wrapper reveal" ref={wrapperRef}>
        <span className="section-watermark" aria-hidden="true">05</span>

        {/* Heading */}
        <div className="contact-heading">
          <span className="contact-line" />
          <h1 className="contact-title">Get in Touch</h1>
        </div>

        {/* Terminal block */}
        <div className="contact-terminal">
          {/* SSH command line */}
          <div className="contact-ssh-prompt">
            <span className="ssh-dollar">$</span>
            <span className="ssh-cmd">
              <span className="ssh-user-plain">ssh </span>
              <span className="ssh-user">hethu</span>
              <span className="ssh-user-plain">@hethusri.com --connect</span>
            </span>
            {phase === 1 && <span className="ssh-cursor">▌</span>}
          </div>

          {/* Connection status */}
          {phase >= 2 && (
            <p className="contact-connected ct-fade">
              <span className="connected-check">✓</span>
              {phase === 2
                ? "Establishing connection..."
                : "Connection established · Open to collaborations & opportunities"}
            </p>
          )}

          {/* Numbered menu */}
          {phase >= 3 && (
            <div className="contact-menu">
              <p className="contact-menu-hint ct-fade">
                {phase >= 4
                  ? "// Press [1]–[5] or click a link to connect"
                  : "// Initializing menu..."}
              </p>
              {MENU.slice(0, menuVisible).map((item, i) => (
                <a
                  key={item.key}
                  href={item.href}
                  target={item.href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noreferrer"
                  className={`contact-menu-item ct-slide-in${hovered === i ? " cm-hover" : ""}`}
                  style={{ "--mi": i }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className="cm-key">[{item.key}]</span>
                  <span className="cm-arrow">→</span>
                  <span className="cm-label">{item.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default Contact;
