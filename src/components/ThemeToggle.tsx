import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />; // Placeholder to prevent layout shift

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all active:scale-95 hover-target"
      aria-label="Toggle Day/Night Mode"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400 animate-in zoom-in duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700 animate-in zoom-in duration-300" />
      )}
    </button>
  );
}
