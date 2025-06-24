
import { useState } from "react";
import { Calendar, Tag } from "lucide-react";

interface Note {
  id: number;
  content: string;
  tags: string[];
  date: string;
}

const mockNotes: Note[] = [
  {
    id: 1,
    content: "Sometimes the best ideas come when you're not actively trying to think of them. Walking, showering, or just sitting quietly can unlock creativity.",
    tags: ["creativity", "thoughts"],
    date: "2024-06-22"
  },
  {
    id: 2,
    content: "The difference between minimalism and emptiness is intention. Every element should serve a purpose.",
    tags: ["design", "minimalism"],
    date: "2024-06-21"
  },
  {
    id: 3,
    content: "Reading physical books feels different from digital ones. There's something about the tactile experience that enhances focus and retention.",
    tags: ["reading", "technology"],
    date: "2024-06-19"
  },
  {
    id: 4,
    content: "Good design is invisible. You notice it only when it's absent.",
    tags: ["design", "philosophy"],
    date: "2024-06-18"
  }
];

interface NotesSectionProps {
  searchQuery: string;
}

const NotesSection = ({ searchQuery }: NotesSectionProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const allTags = Array.from(new Set(mockNotes.flatMap(note => note.tags)));
  
  const filteredNotes = mockNotes.filter(note => {
    const matchesSearch = searchQuery === "" || 
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => note.tags.includes(tag));
    
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
        <h1 className="text-4xl font-light text-gray-900 mb-4">Notes</h1>
        <p className="text-lg text-gray-600">Quick thoughts and observations</p>
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
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredNotes.map(note => (
          <div key={note.id} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
            <p className="text-gray-900 leading-relaxed mb-4">
              {note.content}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{new Date(note.date).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                {note.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-white text-gray-600 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No notes found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default NotesSection;
