
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
  colorIntensity: number;
  setColorIntensity: (intensity: number) => void;
}

const defaultContext: ThemeContextType = {
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
  colorIntensity: 75,
  setColorIntensity: () => {}
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Check user preference or system preference
  const getInitialTheme = (): ThemeType => {
    // Try to load from localStorage first
    const savedTheme = localStorage.getItem("theme") as ThemeType | null;
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      return savedTheme;
    }
    
    // If no saved preference, check system preference
    if (typeof window !== "undefined" && window.matchMedia) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    
    // Default to light
    return "light";
  };

  const [theme, setTheme] = useState<ThemeType>(getInitialTheme);
  const [colorIntensity, setColorIntensity] = useState<number>(
    parseInt(localStorage.getItem("colorIntensity") || "75")
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme class, if any
    root.classList.remove("light", "dark");
    
    // Add new theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("colorIntensity", colorIntensity.toString());
    
    // Here you could add custom CSS variables based on color intensity
    // For example:
    // document.documentElement.style.setProperty('--honey-saturation', `${colorIntensity}%`);
  }, [colorIntensity]);

  // Subscribe to system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem("theme")) {
        setTheme(mediaQuery.matches ? "dark" : "light");
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        toggleTheme, 
        setTheme, 
        colorIntensity, 
        setColorIntensity 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
