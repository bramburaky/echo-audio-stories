
import { useState } from "react";
import { Search, FileText, AudioLines, Camera, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import ArticlesSection from "@/components/ArticlesSection";
import NotesSection from "@/components/NotesSection";
import PhotosSection from "@/components/PhotosSection";
import PodcastsSection from "@/components/PodcastsSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter content based on search query when on different sections
  const filteredContent = (items: any[]) => {
    if (!searchQuery) return items;
    return items.filter(item => 
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "articles":
        return <ArticlesSection searchQuery={searchQuery} />;
      case "notes":
        return <NotesSection searchQuery={searchQuery} />;
      case "photos":
        return <PhotosSection searchQuery={searchQuery} />;
      case "podcasts":
        return <PodcastsSection searchQuery={searchQuery} />;
      default:
        return (
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            
            {/* Hero Section */}
            <section className="max-w-4xl mx-auto px-6 py-20">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-light text-gray-900 dark:text-gray-100 mb-12 leading-tight">
                  Note e articoli
                </h1>
              </div>

              {/* Navigation Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div 
                  className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg group"
                  onClick={() => setActiveSection("articles")}
                >
                  <FileText className="w-8 h-8 text-gray-700 dark:text-gray-300 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Articles</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">In-depth thoughts and long-form writing</p>
                </div>

                <div 
                  className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg group"
                  onClick={() => setActiveSection("notes")}
                >
                  <FileText className="w-8 h-8 text-gray-700 dark:text-gray-300 mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Notes</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Quick thoughts and observations</p>
                </div>

                <div 
                  className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg group"
                  onClick={() => setActiveSection("podcasts")}
                >
                  <AudioLines className="w-8 h-8 text-gray-700 dark:text-gray-300 mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Podcasts</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Audio stories and conversations</p>
                </div>

                <div 
                  className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg group"
                  onClick={() => setActiveSection("photos")}
                >
                  <Camera className="w-8 h-8 text-gray-700 dark:text-gray-300 mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Photos</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Visual stories and captured moments</p>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {activeSection !== "home" && (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setActiveSection("home")}
              className="text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400"
            >
              ← Back to Home
            </Button>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:border-gray-500 dark:focus:border-gray-400"
                />
              </div>
            </div>
          </div>
        </nav>
      )}
      
      {renderContent()}
    </div>
  );
};

export default Index;
