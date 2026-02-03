import "../styles/Navbar.css";
import { useEffect, useState } from "react";
import useTheme from "../hooks/UseTheme";

import {
    Terminal,
    User,
    Code2,
    Server,
    Activity,
    Notebook,
    Briefcase,
    FolderGit2,
    Mail,
    Sun,
    Moon,
    Wrench,
} from "lucide-react";

const sections = ["home", "about", "experience", "skills", "projects", "contact"];

const iconMap = {
    home: <span className="hs-icon">HS</span>,
    about: <User size={18} />,
    experience: <Code2 size={18} />,
    skills: <Notebook size={18} />,
    projects: <FolderGit2 size={18} />,
    contact: <Mail size={18} />,
};


const Navbar = () => {
    const [active, setActive] = useState("home");
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            },
            { threshold: 0.6 }
        );

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="floating-sidebar">
            <ul className="nav-icons">
                {sections.map((id) => (
                    <li key={id}>
                        <a href={`#${id}`} className={active === id ? "active" : ""}>
                            <span className="icon">{iconMap[id]}</span>
                            <span className="label">
                                {id === "home"
                                    ? "Hethu Sri"
                                    : id.charAt(0).toUpperCase() + id.slice(1)}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>

            <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle theme"
            >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
        </nav>
    );
};

export default Navbar;
