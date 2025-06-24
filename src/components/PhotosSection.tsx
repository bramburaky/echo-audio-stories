
import { useState } from "react";
import { Calendar, Tag, Download } from "lucide-react";

interface Photo {
  id: number;
  title: string;
  description: string;
  url: string;
  tags: string[];
  date: string;
}

const mockPhotos: Photo[] = [
  {
    id: 1,
    title: "Morning Light",
    description: "Golden hour through the window",
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
    tags: ["nature", "light", "morning"],
    date: "2024-06-22"
  },
  {
    id: 2,
    title: "Urban Geometry",
    description: "Clean lines in modern architecture",
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
    tags: ["architecture", "geometry", "urban"],
    date: "2024-06-20"
  },
  {
    id: 3,
    title: "Workspace",
    description: "A minimal setup for focused work",
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    tags: ["workspace", "minimal", "productivity"],
    date: "2024-06-18"
  },
  {
    id: 4,
    title: "Tech Essentials",
    description: "Tools for digital creativity",
    url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
    tags: ["technology", "tools", "digital"],
    date: "2024-06-15"
  },
  {
    id: 5,
    title: "Creative Process",
    description: "Capturing the moment of creation",
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    tags: ["creativity", "process", "work"],
    date: "2024-06-12"
  },
  {
    id: 6,
    title: "Living Space",
    description: "Simple comfort and clean design",
    url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
    tags: ["interior", "minimal", "home"],
    date: "2024-06-10"
  }
];

interface PhotosSectionProps {
  searchQuery: string;
}

const PhotosSection = ({ searchQuery }: PhotosSectionProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  const allTags = Array.from(new Set(mockPhotos.flatMap(photo => photo.tags)));
  
  const filteredPhotos = mockPhotos.filter(photo => {
    const matchesSearch = searchQuery === "" || 
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => photo.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-4">Photos</h1>
        <p className="text-lg text-gray-600">Visual stories and captured moments</p>
      </div>

      {/* Tag Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-orange-100 text-orange-800 border border-orange-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map(photo => (
          <div key={photo.id} className="group cursor-pointer" onClick={() => setSelectedPhoto(photo)}>
            <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3]">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-1">{photo.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{photo.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(photo.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {photo.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                  {photo.tags.length > 2 && (
                    <span className="text-gray-400 text-xs">+{photo.tags.length - 2}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredPhotos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No photos found matching your criteria.</p>
        </div>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-6" onClick={() => setSelectedPhoto(null)}>
          <div className="max-w-4xl max-h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex-1 flex items-center justify-center mb-4">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium text-gray-900">{selectedPhoto.title}</h3>
                <button className="text-gray-500 hover:text-gray-700">
                  <Download className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 mb-4">{selectedPhoto.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(selectedPhoto.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedPhoto.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotosSection;
