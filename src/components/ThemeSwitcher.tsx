
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  
  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    toggleTheme();
    
    toast(`Switched to ${newTheme} mode`, {
      description: `App appearance has been changed to ${newTheme} mode.`,
      position: "top-right",
    });
  };
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleTheme}
      className="rounded-full transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-brown-700 hover:text-brown-900" />
      ) : (
        <Sun className="h-5 w-5 text-honey-400 hover:text-honey-300" />
      )}
      <span className="sr-only">{theme === "light" ? "Dark" : "Light"} mode</span>
    </Button>
  );
};

export default ThemeSwitcher;
