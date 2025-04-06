
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ThemeSwitcher = ({ variant = "outline", showText = false }) => {
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
      variant={variant as "outline" | "default" | "destructive" | "secondary" | "ghost" | "link"}
      size={showText ? "default" : "icon"}
      className="transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <>
          <Moon className="h-[1.2rem] w-[1.2rem]" />
          {showText && <span className="ml-2">Dark mode</span>}
        </>
      ) : (
        <>
          <Sun className="h-[1.2rem] w-[1.2rem]" />
          {showText && <span className="ml-2">Light mode</span>}
        </>
      )}
    </Button>
  );
};

export default ThemeSwitcher;
