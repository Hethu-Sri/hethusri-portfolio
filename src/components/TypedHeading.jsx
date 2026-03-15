import { useState, useEffect, useRef } from "react";
import "../styles/TypedHeading.css";

const TypedHeading = ({ text, tag: Tag = "h1", className }) => {
  const [chars, setChars] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion — show full text immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setChars(text.length);
      return;
    }

    let intervalId;
    let timeoutId;

    const startTyping = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      // Delay so reveal fade-in is underway before text appears
      timeoutId = setTimeout(() => {
        let i = 0;
        intervalId = setInterval(() => {
          i++;
          setChars(i);
          if (i >= text.length) clearInterval(intervalId);
        }, 52);
      }, 650);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          startTyping();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text]);

  const done = chars >= text.length;

  return (
    <Tag ref={ref} className={className}>
      {text.slice(0, chars)}
      {!done && <span className="th-cursor" aria-hidden="true">▌</span>}
    </Tag>
  );
};

export default TypedHeading;
