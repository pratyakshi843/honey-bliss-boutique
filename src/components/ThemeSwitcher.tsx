
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  
  const handleToggleTheme = () => {
    toggleTheme();
    toast(`Switched to ${theme === "light" ? "dark" : "light"} mode`, {
      description: `App appearance has been changed to ${theme === "light" ? "dark" : "light"} mode.`,
      position: "top-right",
    });
  };
  
  return (
    <Button
      onClick={handleToggleTheme}
      variant="outline"
      className="flex items-center gap-2 rounded-md transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <>
          <Moon className="h-5 w-5" />
          <span className="hidden sm:inline">Dark mode</span>
        </>
      ) : (
        <>
          <Sun className="h-5 w-5" />
          <span className="hidden sm:inline">Light mode</span>
        </>
      )}
    </Button>
  );
};

export default ThemeSwitcher;
