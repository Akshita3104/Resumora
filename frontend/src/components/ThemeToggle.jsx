import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Apply theme and handle transitions
  useEffect(() => {
    const root = document.documentElement;
    setIsTransitioning(true);
    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      if (isDarkMode) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      // Ensure transition completes before resetting
      setTimeout(() => setIsTransitioning(false), 300);
    });
  }, [isDarkMode]);

  // Toggle theme
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="relative p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 transition-colors duration-300 ease-in-out flex items-center justify-center w-12 h-12 overflow-hidden"
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <span
        className={`absolute left-2 transition-transform duration-300 ease-in-out ${
          isDarkMode ? "translate-x-6 opacity-100" : "translate-x-0 opacity-100"
        } ${isTransitioning ? "transition-opacity duration-300" : ""}`}
      >
        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </span>
      <span
        className={`absolute w-4 h-4 bg-gray-400 dark:bg-gray-500 rounded-full transition-transform duration-300 ease-in-out ${
          isDarkMode ? "translate-x-6" : "translate-x-0"
        } ${isTransitioning ? "transition-opacity duration-300" : ""}`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

export default ThemeToggle;