
import { useState } from "react";
import { Calendar, Tag, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    content: `# The Art of Minimalist Design

In our increasingly complex digital world, the principles of minimalist design have never been more relevant. At its core, minimalism isn't about having less—it's about making room for more of what matters.

## The Philosophy Behind Less

Minimalist design emerged from the belief that every element should serve a purpose. This principle, famously articulated by architect Ludwig Mies van der Rohe as "less is more," has found profound application in digital interfaces and web design.

When we remove the unnecessary, we create space for clarity. Users can focus on what's important without being overwhelmed by decorative elements that serve no functional purpose. This approach requires designers to make difficult decisions about what to include and, more importantly, what to leave out.

## Practical Applications

In practice, minimalist design manifests through:

- **Generous white space** that allows content to breathe
- **Limited color palettes** that create visual harmony
- **Typography hierarchies** that guide the reader's eye
- **Intentional imagery** that supports rather than decorates

The challenge lies not in creating something simple, but in creating something that appears simple while solving complex problems. This requires a deep understanding of user needs and the confidence to trust in restraint.

## The Future of Clean Design

As our digital experiences become more sophisticated, the principles of minimalism will continue to evolve. The goal remains the same: creating interfaces that feel effortless to use while being powerful enough to handle complex tasks.

True minimalism in design isn't about following trends—it's about creating timeless experiences that respect both the content and the user's attention.`,
    tags: ["design", "minimalism", "digital"],
    date: "2024-06-20",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Mindful Technology Use",
    excerpt: "How to maintain a healthy relationship with technology in an increasingly connected world. Finding balance between digital convenience and mental clarity.",
    content: `# Mindful Technology Use

Technology has become so integrated into our daily lives that we rarely pause to consider our relationship with it. Like any relationship, it requires intentional cultivation to remain healthy and beneficial.

## The Attention Economy

Our devices are designed to capture and hold our attention. Every notification, every red badge, every infinite scroll is engineered to keep us engaged. Understanding this helps us approach technology with greater awareness.

The first step toward mindful technology use is recognizing that our attention is finite and valuable. Just as we might budget our money, we need to budget our mental resources.

## Practical Strategies

### Digital Boundaries
- Set specific times for checking emails and social media
- Create phone-free zones in your home
- Use "Do Not Disturb" modes strategically
- Practice the "one tab rule" when browsing

### Intentional Consumption
- Curate your feeds to include only content that adds value
- Unsubscribe from notifications that don't serve you
- Choose quality over quantity in your digital content

### Regular Digital Detoxes
- Take breaks from social media
- Go for walks without your phone
- Rediscover analog activities like reading physical books

## The Goal of Balance

The goal isn't to reject technology entirely, but to use it as a tool rather than letting it use us. When we approach our devices with intention, we can harness their power while maintaining our mental clarity and focus.

Technology should enhance our lives, not overwhelm them. By practicing mindful engagement, we can enjoy the benefits of our connected world while preserving our capacity for deep thought and genuine human connection.`,
    tags: ["technology", "mindfulness", "productivity"],
    date: "2024-06-15",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "The Power of Simplicity",
    excerpt: "Why simplicity is the ultimate sophistication in both design and life philosophy. Examining how reducing complexity can enhance both aesthetics and functionality.",
    content: `# The Power of Simplicity

Leonardo da Vinci once said, "Simplicity is the ultimate sophistication." This profound statement captures a truth that resonates across disciplines—from design and technology to philosophy and daily living.

## Simplicity vs. Simplistic

There's an important distinction between simplicity and being simplistic. Simplicity requires deep understanding and careful consideration. It's the result of thoughtful reduction, not careless omission.

A simple solution often represents the most elegant path through complexity. It requires us to understand the core of a problem so thoroughly that we can address it without unnecessary complications.

## The Cognitive Benefits

Our minds are naturally drawn to simplicity because it reduces cognitive load. When information is presented clearly and without clutter, we can process it more efficiently and make better decisions.

### In Design
- Clear navigation helps users find what they need
- Consistent patterns reduce learning curves
- Focused content prevents decision paralysis

### In Life
- Simplified routines reduce decision fatigue
- Clear priorities help us allocate time effectively
- Uncluttered spaces promote mental clarity

## The Challenge of Achieving Simplicity

Creating something truly simple is often more difficult than creating something complex. It requires:

1. **Deep understanding** of the problem you're solving
2. **Ruthless editing** to remove non-essential elements
3. **User empathy** to understand what truly matters
4. **Iterative refinement** to perfect the core experience

## Embracing Constraints

Paradoxically, constraints often lead to more creative and elegant solutions. When we limit our options, we're forced to focus on what's truly essential.

The Japanese concept of "wabi-sabi" teaches us to find beauty in imperfection and simplicity. This philosophy suggests that the most profound experiences often come from the most understated presentations.

## A Way Forward

In our complex world, simplicity becomes not just an aesthetic choice, but a necessary tool for maintaining clarity and focus. By embracing simplicity, we create space for what matters most—whether that's better user experiences, clearer communication, or more meaningful lives.

The art lies in knowing what to leave out.`,
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
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  const allTags = Array.from(new Set(mockArticles.flatMap(article => article.tags)));
  
  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 bg-white dark:bg-gray-900 min-h-screen">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedArticle(null)}
          className="mb-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Button>
        
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl font-light text-gray-900 dark:text-gray-100 mb-4">
              {selectedArticle.title}
            </h1>
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(selectedArticle.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{selectedArticle.readTime}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-8">
              {selectedArticle.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </header>
          
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {selectedArticle.content}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white dark:bg-gray-900 min-h-screen">
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
              <h2 
                className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-3 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                onClick={() => setSelectedArticle(article)}
              >
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
