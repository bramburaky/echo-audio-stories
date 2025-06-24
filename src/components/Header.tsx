
import { useState } from "react";
import { Menu, X, Moon, Sun, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

const Header = ({ searchQuery = "", setSearchQuery }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-2xl font-light text-gray-900 dark:text-gray-100">
          Your Name
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          {setSearchQuery && (
            <div className="relative hidden md:block">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                placeholder="Search all content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:border-gray-500 dark:focus:border-gray-400"
              />
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-6 py-4">
          {/* Mobile Search Bar */}
          {setSearchQuery && (
            <div className="relative mb-4">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                placeholder="Search all content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:border-gray-500 dark:focus:border-gray-400"
              />
            </div>
          )}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">Navigate using the cards below</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
