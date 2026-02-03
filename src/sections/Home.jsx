import { useEffect, useState } from "react";
import Section from "../components/Section";
import "../styles/Home.css";

const lines = [
    "$ whoami",
    "Hethu Sri Nadipudi",
    "",
    '$ echo "Full-stack developer turning coffee into code and problems into scalable web applications, one commit at a time."',
];

const Home = () => {
    const [displayedLines, setDisplayedLines] = useState([]);
    const [currentLine, setCurrentLine] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

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
                <h1 key={idx} className="terminal-h1">
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
                <div className="terminal-block">
                    {displayedLines.map(renderLine)}

                    {lineIndex < lines.length && (
                        <div className="terminal-line">
                            {currentLine}
                            <span className="terminal-cursor">▌</span>
                        </div>
                    )}
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
