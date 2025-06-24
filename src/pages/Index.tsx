
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
          <div className="min-h-screen bg-white">
            <Header />
            
            {/* Hero Section */}
            <section className="max-w-4xl mx-auto px-6 py-20">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-light text-gray-900 mb-6 leading-tight">
                  Welcome to My Digital Space
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  A minimalist collection of thoughts, stories, sounds, and moments.
                  Explore articles, notes, podcasts, and photography in a clean, distraction-free environment.
                </p>
              </div>

              {/* Navigation Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div 
                  className="bg-gray-50 hover:bg-gray-100 p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg group"
                  onClick={() => setActiveSection("articles")}
                >
                  <FileText className="w-8 h-8 text-gray-700 mb-4 group-hover:text-blue-600 transition-colors" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Articles</h3>
                  <p className="text-gray-600 text-sm">In-depth thoughts and long-form writing</p>
                </div>

                <div 
                  className="bg-gray-50 hover:bg-gray-100 p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg group"
                  onClick={() => setActiveSection("notes")}
                >
                  <FileText className="w-8 h-8 text-gray-700 mb-4 group-hover:text-green-600 transition-colors" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Notes</h3>
                  <p className="text-gray-600 text-sm">Quick thoughts and observations</p>
                </div>

                <div 
                  className="bg-gray-50 hover:bg-gray-100 p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg group"
                  onClick={() => setActiveSection("podcasts")}
                >
                  <AudioLines className="w-8 h-8 text-gray-700 mb-4 group-hover:text-purple-600 transition-colors" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Podcasts</h3>
                  <p className="text-gray-600 text-sm">Audio stories and conversations</p>
                </div>

                <div 
                  className="bg-gray-50 hover:bg-gray-100 p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg group"
                  onClick={() => setActiveSection("photos")}
                >
                  <Camera className="w-8 h-8 text-gray-700 mb-4 group-hover:text-orange-600 transition-colors" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Photos</h3>
                  <p className="text-gray-600 text-sm">Visual stories and captured moments</p>
                </div>
              </div>

              {/* Recent Content Preview */}
              <div className="text-center">
                <h2 className="text-2xl font-light text-gray-900 mb-8">Recent Updates</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-left p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                    <span className="text-sm text-blue-600 font-medium">Article</span>
                    <h3 className="text-lg font-medium text-gray-900 mt-2 mb-3">The Art of Minimalist Design</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Exploring how less can be more in digital spaces...</p>
                  </div>
                  <div className="text-left p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                    <span className="text-sm text-purple-600 font-medium">Podcast</span>
                    <h3 className="text-lg font-medium text-gray-900 mt-2 mb-3">Conversations on Creativity</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">A deep dive into the creative process with local artists...</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {activeSection !== "home" && (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setActiveSection("home")}
              className="text-gray-900 hover:text-gray-600"
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
                  className="pl-10 w-64 border-gray-300 focus:border-gray-500"
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
