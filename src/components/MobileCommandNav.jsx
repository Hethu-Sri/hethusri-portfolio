import { useState } from "react";
import "../styles/MobileCommandNav.css";

const sections = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];

const MobileCommandNav = () => {
  const [open, setOpen] = useState(false);

  const handleNavigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <div className="mobile-command-nav">
      <button
        className="command-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Open navigation"
      >
        ⌘
      </button>

      {open && (
        <div className="command-menu">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => handleNavigate(s.id)}
              className="command-item"
            >
              &gt; {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileCommandNav;
