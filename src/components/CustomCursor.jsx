import { useEffect, useRef } from "react";
import "../styles/CustomCursor.css";

const CustomCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Skip on touch/pen devices
    if (window.matchMedia("(hover: none)").matches) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let rafId;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      // Dot follows instantly
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    };

    const tick = () => {
      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      rafId = requestAnimationFrame(tick);
    };

    const expand  = () => ring.classList.add("ring-hover");
    const collapse = () => ring.classList.remove("ring-hover");
    const press   = () => { dot.classList.add("dot-click");  ring.classList.add("ring-click"); };
    const release = () => { dot.classList.remove("dot-click"); ring.classList.remove("ring-click"); };

    const bindHoverables = () => {
      document.querySelectorAll(
        "a, button, [role='button'], .card-tilt-wrapper, label, input, select, .tl-dot"
      ).forEach((el) => {
        el.addEventListener("mouseenter", expand);
        el.addEventListener("mouseleave", collapse);
      });
    };

    // Bind now + after late-rendered elements settle
    bindHoverables();
    const lateBindTimer = setTimeout(bindHoverables, 1200);

    // Fade in cursor on first mouse movement
    dot.style.opacity  = "0";
    ring.style.opacity = "0";
    const firstMove = () => {
      dot.style.opacity  = "1";
      ring.style.opacity = "1";
      document.removeEventListener("mousemove", firstMove);
    };
    document.addEventListener("mousemove", firstMove, { once: true });

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", press);
    document.addEventListener("mouseup",   release);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", press);
      document.removeEventListener("mouseup",   release);
      clearTimeout(lateBindTimer);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="c-dot"  ref={dotRef}  aria-hidden="true" />
      <div className="c-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
