import { Sun, Moon } from "lucide-react";
import useTheme from "../hooks/UseTheme";
import "../styles/MobileThemeToggle.css";

const MobileThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
  className="mobile-theme-toggle"
  onClick={toggleTheme}
  aria-label="Toggle theme"
>
  {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
</button>



  );
};

export default MobileThemeToggle;
