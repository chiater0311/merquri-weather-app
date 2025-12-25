import { useTheme } from "../../hooks/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="
        flex items-center gap-2
        px-3 py-1.5
        rounded-full border text-xs lg:text-sm
        bg-white/80 dark:bg-slate-800/80
        border-slate-300 dark:border-slate-600
        shadow-sm
        hover:bg-slate-50 dark:hover:bg-slate-700
        transition
        text-black dark:text-white
      "
      aria-label="Toggle theme"
    >
      <span className="text-lg" aria-hidden="true">
        {isDark ? "🌙" : "☀️"}
      </span>
      <span>{isDark ? "Dark mode" : "Light mode"}</span>
    </button>
  );
}

export default ThemeToggle;
