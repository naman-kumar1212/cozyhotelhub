
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonTransition } from './ui/button-transition';
import RoomCard from './room-card';

const rooms = [
  {
    id: 1,
    name: "Deluxe Suite",
    description: "A spacious suite with elegant furnishings, offering panoramic city views and premium amenities for a luxurious stay.",
    price: 299,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    amenities: ["King bed", "City view", "Free WiFi", "Minibar"],
    capacity: 2,
    size: 550,
    type: "Suite"
  },
  {
    id: 2,
    name: "Ocean View Room",
    description: "Wake up to stunning ocean views in this bright and airy room featuring contemporary décor and comfortable furnishings.",
    price: 249,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    amenities: ["Queen bed", "Ocean view", "Free WiFi", "Work desk"],
    capacity: 2,
    size: 450,
    type: "Standard"
  },
  {
    id: 3,
    name: "Executive Suite",
    description: "Perfect for business travelers, this sophisticated suite includes a separate living area and workspace with executive amenities.",
    price: 399,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    amenities: ["King bed", "Living area", "Free WiFi", "Work station"],
    capacity: 2,
    size: 650,
    type: "Suite"
  },
  {
    id: 4,
    name: "Family Room",
    description: "Designed for family comfort, this spacious room offers multiple beds and family-friendly amenities for a pleasant stay.",
    price: 349,
    image: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    amenities: ["Multiple beds", "Garden view", "Free WiFi", "Kid's amenities"],
    capacity: 4,
    size: 600,
    type: "Family"
  }
];

const FeaturedRooms = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const navigate = useNavigate();
  
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setVisibleCount(1);
    } else if (window.innerWidth < 1024) {
      setVisibleCount(2);
    } else {
      setVisibleCount(3);
    }
  };
  
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = () => {
    setActiveIndex((prevIndex) => 
      prevIndex + visibleCount >= rooms.length 
        ? 0 
        : prevIndex + 1
    );
  };

  const prev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex <= 0 
        ? Math.max(0, rooms.length - visibleCount) 
        : prevIndex - 1
    );
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-light mb-2">Featured Rooms</h2>
            <p className="text-muted-foreground">Experience luxury in our finest accommodations</p>
          </div>
          
          <div className="hidden sm:flex space-x-3">
            <button 
              onClick={prev} 
              className="p-2 border border-hotel-200 rounded-full text-hotel-700 hover:bg-hotel-50 transition-colors"
              aria-label="Previous rooms"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={next} 
              className="p-2 border border-hotel-200 rounded-full text-hotel-700 hover:bg-hotel-50 transition-colors"
              aria-label="Next rooms"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-all duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${activeIndex * (100 / visibleCount)}%)`,
              width: `${(rooms.length / visibleCount) * 100}%` 
            }}
          >
            {rooms.map((room) => (
              <div 
                key={room.id} 
                className="px-3"
                style={{ width: `${100 / rooms.length * visibleCount}%` }}
              >
                <RoomCard {...room} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="sm:hidden flex justify-center space-x-3 mt-6">
          <button 
            onClick={prev} 
            className="p-2 border border-hotel-200 rounded-full text-hotel-700 hover:bg-hotel-50 transition-colors"
            aria-label="Previous rooms"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next} 
            className="p-2 border border-hotel-200 rounded-full text-hotel-700 hover:bg-hotel-50 transition-colors"
            aria-label="Next rooms"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="text-center mt-10">
          <ButtonTransition 
            onClick={() => navigate('/rooms')}
            className="bg-hotel-100 text-hotel-800 hover:bg-hotel-200"
          >
            View All Rooms
          </ButtonTransition>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
