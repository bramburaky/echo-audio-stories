
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
    excerpt: "Exploring how less can be more in digital spaces and the principles that guide clean, effective design.",
    content: "Full article content...",
    tags: ["design", "minimalism", "digital"],
    date: "2024-06-20",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Mindful Technology Use",
    excerpt: "How to maintain a healthy relationship with technology in an increasingly connected world.",
    content: "Full article content...",
    tags: ["technology", "mindfulness", "productivity"],
    date: "2024-06-15",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "The Power of Simplicity",
    excerpt: "Why simplicity is the ultimate sophistication in both design and life philosophy.",
    content: "Full article content...",
    tags: ["philosophy", "simplicity", "lifestyle"],
    date: "2024-06-10",
    readTime: "6 min read"
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
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-4">Articles</h1>
        <p className="text-lg text-gray-600">In-depth thoughts and long-form writing</p>
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
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
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
          <article key={article.id} className="border-b border-gray-100 pb-8 last:border-b-0">
            <div className="mb-4">
              <h2 className="text-2xl font-medium text-gray-900 mb-3 hover:text-blue-600 cursor-pointer transition-colors">
                {article.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-gray-500">
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
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
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
          <p className="text-gray-500">No articles found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ArticlesSection;
