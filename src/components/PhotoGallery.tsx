
import { useState } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Photo {
  id: number;
  title: string;
  url: string;
  date: string;
}

interface PhotoGalleryProps {
  galleryId: number;
  onBack: () => void;
}

const photoGalleries = {
  1: {
    title: "Morning Light Collection",
    description: "A series capturing the beauty of golden hour light",
    photos: [
      {
        id: 1,
        title: "First Light",
        url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
        date: "2024-06-22"
      },
      {
        id: 2,
        title: "Window Glow",
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        date: "2024-06-22"
      },
      {
        id: 3,
        title: "Morning Shadows",
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
        date: "2024-06-22"
      }
    ]
  },
  2: {
    title: "Urban Architecture",
    description: "Clean lines and geometric beauty in the city",
    photos: [
      {
        id: 4,
        title: "Glass and Steel",
        url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
        date: "2024-06-20"
      },
      {
        id: 5,
        title: "Modern Lines",
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
        date: "2024-06-20"
      },
      {
        id: 6,
        title: "Concrete Poetry",
        url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
        date: "2024-06-20"
      }
    ]
  }
};

const PhotoGallery = ({ galleryId, onBack }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const gallery = photoGalleries[galleryId as keyof typeof photoGalleries];

  if (!gallery) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 dark:bg-gray-900 min-h-screen">
        <Button onClick={onBack} variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Photos
        </Button>
        <p className="text-gray-500 dark:text-gray-400">Gallery not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 dark:bg-gray-900 min-h-screen">
      <Button onClick={onBack} variant="ghost" className="mb-6 text-gray-900 dark:text-gray-100">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Photos
      </Button>

      <div className="mb-8">
        <h1 className="text-4xl font-light text-gray-900 dark:text-gray-100 mb-4">{gallery.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">{gallery.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.photos.map(photo => (
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
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">{photo.title}</h3>
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{new Date(photo.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

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
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">{selectedPhoto.title}</h3>
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{new Date(selectedPhoto.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
