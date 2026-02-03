import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark"; // 👈 default dark
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
};

export default useTheme;
