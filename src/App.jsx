import { useEffect, useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar";
import Home from "./sections/Home"
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import MobileCommandNav from "./components/MobileCommandNav";
import MobileThemeToggle from "./components/MobileThemeToggle";
import CustomCursor from "./components/CustomCursor";

function App() {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('.reveal, .section-trigger').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? (scrollTop / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <CustomCursor />
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollPct / 100})` }}
        aria-hidden="true"
      />
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>
      <div className="top-accent-bar" aria-hidden="true" />

      <div className="mobile-hs-logo">HS</div>
      <Navbar />
      <MobileCommandNav />
      <MobileThemeToggle />
      <Home />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default App


