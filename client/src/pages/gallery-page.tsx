import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import WhatsAppButton from "@/components/layout/whatsapp-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhotoAlbum from "react-photo-album";
import ReactPlayer from "react-player/lazy";

type GalleryItemType = "image" | "video";
type GalleryCategory = "food" | "community" | "events" | "volunteer";

interface GalleryItem {
  id: string;
  type: GalleryItemType;
  src: string;
  width: number;
  height: number;
  title: string;
  location: string;
  date: string;
  category: GalleryCategory;
}

// Sample gallery items (these would typically come from an API)
const galleryItems: GalleryItem[] = [
  {
    id: "1",
    type: "image",
    src: "/images/unsplash/food-donation-1.svg",
    width: 800,
    height: 600,
    title: "Food Distribution Drive",
    location: "Lahore",
    date: "March 15, 2023",
    category: "food",
  },
  {
    id: "2",
    type: "image",
    src: "/images/unsplash/community-event-1.svg",
    width: 800,
    height: 600,
    title: "Community Gathering",
    location: "Sahiwal",
    date: "April 2, 2023",
    category: "community",
  },
  {
    id: "3",
    type: "image",
    src: "/images/unsplash/volunteer-group-1.svg",
    width: 800,
    height: 600,
    title: "Volunteer Meeting",
    location: "Lahore",
    date: "May 10, 2023",
    category: "volunteer",
  },
  {
    id: "4",
    type: "image",
    src: "/images/unsplash/food-donation-2.svg",
    width: 800,
    height: 600,
    title: "Ration Distribution",
    location: "Sahiwal",
    date: "June 20, 2023",
    category: "food",
  },
  {
    id: "5",
    type: "image",
    src: "/images/unsplash/community-event-2.svg",
    width: 800,
    height: 600,
    title: "Community Event",
    location: "Lahore",
    date: "July 5, 2023",
    category: "events",
  },
  {
    id: "6",
    type: "image",
    src: "/images/unsplash/volunteer-group-2.svg",
    width: 800,
    height: 600,
    title: "Volunteer Training",
    location: "Lahore",
    date: "August 15, 2023",
    category: "volunteer",
  },
  {
    id: "7",
    type: "video",
    src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Would be replaced with actual videos
    width: 1280,
    height: 720,
    title: "Community Service Day",
    location: "Sahiwal",
    date: "September 1, 2023",
    category: "community",
  },
  {
    id: "8",
    type: "video",
    src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Would be replaced with actual videos
    width: 1280,
    height: 720,
    title: "Food Distribution Event",
    location: "Lahore",
    date: "October 10, 2023",
    category: "food",
  },
];

export default function GalleryPage() {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Filter items based on selected tab
  const filteredItems = selectedTab === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedTab || (selectedTab === "videos" && item.type === "video"));

  // Get only image items for PhotoAlbum
  const photoItems = filteredItems
    .filter(item => item.type === "image")
    .map(item => ({
      src: item.src,
      width: item.width,
      height: item.height,
      key: item.id,
      alt: item.title,
    }));

  // Get only video items
  const videoItems = filteredItems.filter(item => item.type === "video");

  // Modal for enlarged view of gallery items
  const GalleryModal = () => {
    if (!selectedItem) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedItem(null)}
      >
        <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
          <div className="bg-white rounded-lg overflow-hidden">
            {selectedItem.type === "image" ? (
              <img 
                src={selectedItem.src} 
                alt={selectedItem.title} 
                className="w-full h-auto"
              />
            ) : (
              <div className="aspect-video">
                <ReactPlayer
                  url={selectedItem.src}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold">{selectedItem.title}</h3>
              <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                <span>{selectedItem.location}</span>
                <span>•</span>
                <span>{selectedItem.date}</span>
              </div>
            </div>
          </div>
          <button 
            className="mt-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 absolute top-4 right-4"
            onClick={() => setSelectedItem(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-48 text-white"
        style={{
          background: 'linear-gradient(to bottom, rgba(43,42,169,0.95), rgba(42, 42, 169, 0.6))'
        }}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl text-center mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
              <p className="text-lg md:text-xl opacity-90">
                Explore photos and videos from our food distribution drives and community events in Lahore and Sahiwal.
              </p>
            </motion.div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
              <path fill="#f9fafb" fillOpacity="1" d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,186.7C672,181,768,139,864,128C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>
        
        {/* Gallery Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs 
              defaultValue="all" 
              className="w-full max-w-4xl mx-auto mb-8"
              onValueChange={setSelectedTab}
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="food">Food Drives</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="volunteer">Volunteers</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
              </TabsList>
              
              <div className="mt-8">
                <TabsContent value="all" className="mt-0">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6">Photos</h2>
                    {photoItems.length > 0 ? (
                      <PhotoAlbum
                        photos={photoItems}
                        layout="masonry"
                        columns={(containerWidth) => {
                          if (containerWidth < 640) return 1;
                          if (containerWidth < 768) return 2;
                          return 3;
                        }}
                        spacing={16}
                        onClick={({ photo }) => {
                          const item = galleryItems.find(item => item.id === photo.key);
                          if (item) setSelectedItem(item);
                        }}
                      />
                    ) : (
                      <p className="text-center py-8 text-gray-500">No photos found in this category.</p>
                    )}
                  </div>
                  
                  {videoItems.length > 0 && (
                    <div className="mt-12">
                      <h2 className="text-2xl font-bold mb-6">Videos</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {videoItems.map(video => (
                          <motion.div
                            key={video.id}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                            onClick={() => setSelectedItem(video)}
                          >
                            <div className="aspect-video bg-gray-100 relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
                                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold">{video.title}</h3>
                              <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                                <span>{video.location}</span>
                                <span>•</span>
                                <span>{video.date}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="food" className="mt-0">
                  <PhotoAlbum
                    photos={photoItems}
                    layout="masonry"
                    columns={(containerWidth) => {
                      if (containerWidth < 640) return 1;
                      if (containerWidth < 768) return 2;
                      return 3;
                    }}
                    spacing={16}
                    onClick={({ photo }) => {
                      const item = galleryItems.find(item => item.id === photo.key);
                      if (item) setSelectedItem(item);
                    }}
                  />
                </TabsContent>
                
                <TabsContent value="community" className="mt-0">
                  <PhotoAlbum
                    photos={photoItems}
                    layout="masonry"
                    columns={(containerWidth) => {
                      if (containerWidth < 640) return 1;
                      if (containerWidth < 768) return 2;
                      return 3;
                    }}
                    spacing={16}
                    onClick={({ photo }) => {
                      const item = galleryItems.find(item => item.id === photo.key);
                      if (item) setSelectedItem(item);
                    }}
                  />
                </TabsContent>
                
                <TabsContent value="events" className="mt-0">
                  <PhotoAlbum
                    photos={photoItems}
                    layout="masonry"
                    columns={(containerWidth) => {
                      if (containerWidth < 640) return 1;
                      if (containerWidth < 768) return 2;
                      return 3;
                    }}
                    spacing={16}
                    onClick={({ photo }) => {
                      const item = galleryItems.find(item => item.id === photo.key);
                      if (item) setSelectedItem(item);
                    }}
                  />
                </TabsContent>
                
                <TabsContent value="volunteer" className="mt-0">
                  <PhotoAlbum
                    photos={photoItems}
                    layout="masonry"
                    columns={(containerWidth) => {
                      if (containerWidth < 640) return 1;
                      if (containerWidth < 768) return 2;
                      return 3;
                    }}
                    spacing={16}
                    onClick={({ photo }) => {
                      const item = galleryItems.find(item => item.id === photo.key);
                      if (item) setSelectedItem(item);
                    }}
                  />
                </TabsContent>
                
                <TabsContent value="videos" className="mt-0">
                  {videoItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {videoItems.map(video => (
                        <motion.div
                          key={video.id}
                          whileHover={{ y: -5 }}
                          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                          onClick={() => setSelectedItem(video)}
                        >
                          <div className="aspect-video bg-gray-100 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold">{video.title}</h3>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                              <span>{video.location}</span>
                              <span>•</span>
                              <span>{video.date}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-500">No videos found in this category.</p>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
      
      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedItem && <GalleryModal />}
      </AnimatePresence>
    </div>
  );
}