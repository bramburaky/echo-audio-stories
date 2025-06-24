
import { useState } from "react";
import { Calendar, Tag, Clock } from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  readTime: string;
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: "The Art of Minimalist Design",
    excerpt: "Exploring how less can be more in digital spaces and the principles that guide clean, effective design. When we strip away the unnecessary, what remains is pure function and beauty.",
    content: "Full article content...",
    tags: ["design", "minimalism", "digital"],
    date: "2024-06-20",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Mindful Technology Use",
    excerpt: "How to maintain a healthy relationship with technology in an increasingly connected world. Finding balance between digital convenience and mental clarity.",
    content: "Full article content...",
    tags: ["technology", "mindfulness", "productivity"],
    date: "2024-06-15",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "The Power of Simplicity",
    excerpt: "Why simplicity is the ultimate sophistication in both design and life philosophy. Examining how reducing complexity can enhance both aesthetics and functionality.",
    content: "Full article content...",
    tags: ["philosophy", "simplicity", "lifestyle"],
    date: "2024-06-10",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Digital Minimalism in Practice",
    excerpt: "Practical strategies for implementing digital minimalism in your daily routine. From app organization to notification management.",
    content: "Full article content...",
    tags: ["digital", "minimalism", "productivity"],
    date: "2024-06-05",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "The Future of Clean Design",
    excerpt: "Trends and predictions for the evolution of minimalist design in the coming years. What to expect as we move toward even cleaner interfaces.",
    content: "Full article content...",
    tags: ["design", "future", "trends"],
    date: "2024-06-01",
    readTime: "4 min read"
  }
];

interface ArticlesSectionProps {
  searchQuery: string;
}

const ArticlesSection = ({ searchQuery }: ArticlesSectionProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const allTags = Array.from(new Set(mockArticles.flatMap(article => article.tags)));
  
  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => article.tags.includes(tag));
    
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
    <div className="max-w-4xl mx-auto px-6 py-12 dark:bg-gray-900 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-light text-gray-900 dark:text-gray-100 mb-4">Articles</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">In-depth thoughts and long-form writing</p>
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
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="space-y-8">
        {filteredArticles.map(article => (
          <article key={article.id} className="border-b border-gray-100 dark:border-gray-800 pb-8 last:border-b-0">
            <div className="mb-4">
              <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-3 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                {article.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No articles found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ArticlesSection;
