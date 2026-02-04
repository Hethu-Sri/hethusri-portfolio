import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
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


