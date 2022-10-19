import { useState, useEffect } from "react";

const isDarkMode = () =>
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches);

const useColourMode = () => {
  const [isLightMode, setIsLightMode] = useState(!isDarkMode());

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (isDarkMode()) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, []);

  const toggle = () => {
    setIsLightMode((prev) => {
      if (prev) {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
      }
      return !prev;
    });
  };

  return { isLightMode, toggle };
};

export default useColourMode;
