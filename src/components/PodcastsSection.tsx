
import { useState, useRef } from "react";
import { Play, Pause, Calendar, Tag, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface Podcast {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  audioUrl: string;
  duration: string;
  category: string;
  tags: string[];
  date: string;
}

const mockPodcasts: Podcast[] = [
  {
    id: 1,
    title: "The Future of Minimalist Design",
    description: "A deep dive into how minimalism is shaping the future of digital experiences with renowned designer Sarah Chen.",
    coverImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop",
    audioUrl: "#", // In a real app, this would be an actual audio URL
    duration: "32:15",
    category: "Design",
    tags: ["design", "minimalism", "future"],
    date: "2024-06-20"
  },
  {
    id: 2,
    title: "Conversations on Creativity",
    description: "Exploring the creative process with local artists and how they find inspiration in everyday moments.",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop",
    audioUrl: "#",
    duration: "28:43",
    category: "Art",
    tags: ["creativity", "art", "inspiration"],
    date: "2024-06-15"
  },
  {
    id: 3,
    title: "Mindful Technology",
    description: "How to maintain balance in our digital lives and use technology more intentionally.",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop",
    audioUrl: "#",
    duration: "41:22",
    category: "Technology",
    tags: ["technology", "mindfulness", "balance"],
    date: "2024-06-10"
  },
  {
    id: 4,
    title: "The Philosophy of Simple Living",
    description: "Exploring what it means to live simply in a complex world with philosopher Dr. Marcus Webb.",
    coverImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=300&fit=crop",
    audioUrl: "#",
    duration: "45:18",
    category: "Philosophy",
    tags: ["philosophy", "simplicity", "lifestyle"],
    date: "2024-06-05"
  }
];

interface PodcastsSectionProps {
  searchQuery: string;
}

const PodcastsSection = ({ searchQuery }: PodcastsSectionProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const allTags = Array.from(new Set(mockPodcasts.flatMap(podcast => podcast.tags)));
  const allCategories = Array.from(new Set(mockPodcasts.map(podcast => podcast.category)));
  
  const filteredPodcasts = mockPodcasts.filter(podcast => {
    const matchesSearch = searchQuery === "" || 
      podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      podcast.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      podcast.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      podcast.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => podcast.tags.includes(tag));
      
    const matchesCategories = selectedCategories.length === 0 ||
      selectedCategories.includes(podcast.category);
    
    return matchesSearch && matchesTags && matchesCategories;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const togglePlayPause = (podcastId: number) => {
    if (currentlyPlaying === podcastId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentlyPlaying(podcastId);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-4">Podcasts</h1>
        <p className="text-lg text-gray-600">Audio stories and conversations</p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategories.includes(category)
                    ? 'bg-purple-100 text-purple-800 border border-purple-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-purple-100 text-purple-800 border border-purple-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Podcasts List */}
      <div className="space-y-6">
        {filteredPodcasts.map(podcast => (
          <div key={podcast.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              {/* Cover Image */}
              <div className="flex-shrink-0">
                <img
                  src={podcast.coverImage}
                  alt={podcast.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded mb-2">
                      {podcast.category}
                    </span>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">{podcast.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {podcast.description}
                    </p>
                  </div>
                </div>

                {/* Audio Player */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-4 mb-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePlayPause(podcast.id)}
                      className="flex-shrink-0"
                    >
                      {currentlyPlaying === podcast.id && isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                    
                    <div className="flex-1">
                      <Slider
                        value={[currentlyPlaying === podcast.id ? currentTime : 0]}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    
                    <span className="text-sm text-gray-500 flex-shrink-0">
                      {currentlyPlaying === podcast.id ? formatTime(currentTime) : "0:00"} / {podcast.duration}
                    </span>
                  </div>
                </div>

                {/* Meta Information */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(podcast.date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {podcast.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredPodcasts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No podcasts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default PodcastsSection;
