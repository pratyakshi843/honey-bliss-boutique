
import { useState } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Moon, Sun, Monitor, PaintBucket } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("appearance");

  const handleThemeChange = (value: string) => {
    if ((value === "dark" && theme === "light") || (value === "light" && theme === "dark")) {
      toggleTheme();
      toast(`Switched to ${value} mode`, {
        description: `App appearance has been changed to ${value} mode.`,
        position: "top-right",
      });
    }
  };

  return (
    <div className="bg-honey-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-card rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-brown-800 dark:text-honey-300 mb-6">Settings</h1>
            
            <Tabs defaultValue="appearance" onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="appearance" className="gap-2">
                  <PaintBucket className="h-4 w-4" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="appearance">
                <div className="space-y-8">
                  {/* Theme Mode Selection */}
                  <div>
                    <h2 className="text-xl font-semibold text-brown-700 dark:text-honey-200 mb-4">Theme Mode</h2>
                    <RadioGroup 
                      defaultValue={theme} 
                      onValueChange={handleThemeChange}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <div className="flex items-center space-x-2 p-4 border rounded-md dark:border-gray-700 hover:bg-honey-50 dark:hover:bg-gray-800">
                        <RadioGroupItem value="light" id="light" />
                        <Label htmlFor="light" className="flex items-center cursor-pointer gap-2">
                          <Sun className="h-5 w-5 text-amber-500" />
                          Light Mode
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 p-4 border rounded-md dark:border-gray-700 hover:bg-honey-50 dark:hover:bg-gray-800">
                        <RadioGroupItem value="dark" id="dark" />
                        <Label htmlFor="dark" className="flex items-center cursor-pointer gap-2">
                          <Moon className="h-5 w-5 text-blue-600" />
                          Dark Mode
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 p-4 border rounded-md dark:border-gray-700 hover:bg-honey-50 dark:hover:bg-gray-800">
                        <RadioGroupItem value="system" id="system" disabled />
                        <Label htmlFor="system" className="flex items-center cursor-pointer gap-2 text-gray-500">
                          <Monitor className="h-5 w-5" />
                          System (Coming soon)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  {/* Color Themes */}
                  <div>
                    <h2 className="text-xl font-semibold text-brown-700 dark:text-honey-200 mb-4">Color Intensity</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>Honey Intensity (Light Mode)</Label>
                          <span className="text-sm text-gray-500">Adjust warmth of honey colors</span>
                        </div>
                        <Slider
                          defaultValue={[75]}
                          max={100}
                          step={1}
                          className="[&>span]:bg-honey-500"
                        />
                        <div className="mt-1 flex justify-between">
                          <span className="text-xs text-gray-500">Subtle</span>
                          <span className="text-xs text-gray-500">Vibrant</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>Contrast (Dark Mode)</Label>
                          <span className="text-sm text-gray-500">Adjust darkness level</span>
                        </div>
                        <Slider
                          defaultValue={[60]}
                          max={100}
                          step={1}
                          className="[&>span]:bg-honey-600 dark:[&>span]:bg-honey-500"
                        />
                        <div className="mt-1 flex justify-between">
                          <span className="text-xs text-gray-500">Soft</span>
                          <span className="text-xs text-gray-500">High Contrast</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-sm text-gray-500 italic">
                        Note: Color intensity settings are for demonstration purposes only in this version.
                        Full color customization will be available in a future update.
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Font Size */}
                  <div>
                    <h2 className="text-xl font-semibold text-brown-700 dark:text-honey-200 mb-4">Text Size</h2>
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Font Size</Label>
                        <span className="text-sm text-gray-500">Coming soon</span>
                      </div>
                      <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        disabled
                        className="[&>span]:bg-gray-400"
                      />
                      <div className="mt-1 flex justify-between">
                        <span className="text-xs text-gray-500">Small</span>
                        <span className="text-xs text-gray-500">Large</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="bg-honey-600 hover:bg-honey-700 text-white">
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="account">
                <div className="h-40 flex items-center justify-center text-gray-500">
                  Account settings coming soon
                </div>
              </TabsContent>
              
              <TabsContent value="notifications">
                <div className="h-40 flex items-center justify-center text-gray-500">
                  Notification settings coming soon
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
