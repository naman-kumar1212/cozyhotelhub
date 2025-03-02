
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Filter, Search, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

// Room data
const rooms = [
  {
    id: 1,
    name: 'Deluxe Suite',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    price: 299,
    perNight: true,
    rating: 4.8,
    reviews: 124,
    description: 'Luxurious suite with a king-sized bed, private balcony, and stunning city views.',
    amenities: ['King Bed', 'City View', 'Free Wifi', 'Mini Bar', 'Room Service'],
    capacity: 2,
    size: '45m²',
    available: true
  },
  {
    id: 2,
    name: 'Ocean View Room',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    price: 249,
    perNight: true,
    rating: 4.6,
    reviews: 98,
    description: 'Comfortable room with breathtaking ocean views and modern amenities.',
    amenities: ['Queen Bed', 'Ocean View', 'Free Wifi', 'Coffee Machine', 'Balcony'],
    capacity: 2,
    size: '38m²',
    available: true
  },
  {
    id: 3,
    name: 'Family Suite',
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    price: 349,
    perNight: true,
    rating: 4.7,
    reviews: 86,
    description: 'Spacious suite perfect for families, featuring two bedrooms and a living area.',
    amenities: ['2 Bedrooms', 'Living Area', 'Free Wifi', 'Kitchen', 'Pool Access'],
    capacity: 4,
    size: '65m²',
    available: true
  },
  {
    id: 4,
    name: 'Executive Room',
    image: 'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    price: 279,
    perNight: true,
    rating: 4.5,
    reviews: 74,
    description: 'Modern room designed for business travelers with a dedicated workspace.',
    amenities: ['Queen Bed', 'Workspace', 'Free Wifi', 'Laptop Safe', 'Express Check-out'],
    capacity: 2,
    size: '40m²',
    available: false
  },
];

const RoomsPage = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([150, 400]);
  const [guests, setGuests] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredRooms = rooms.filter(room => {
    // Price filter
    if (room.price < priceRange[0] || room.price > priceRange[1]) return false;
    
    // Capacity filter
    if (room.capacity < guests) return false;
    
    // Search query filter
    if (searchQuery && !room.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });
  
  const handleBookNow = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      toast.success(`Booking initiated for ${room.name}`);
      // In a real app, this would navigate to a booking form
      // with the room pre-selected
      // navigate(`/booking/${roomId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-xl border border-hotel-100 p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-medium mb-4">Filters</h2>
              
              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Room type..." 
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <Separator />
                
                {/* Price Range */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Price Range</label>
                    <span className="text-sm text-muted-foreground">
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={priceRange}
                    min={100}
                    max={500}
                    step={10}
                    onValueChange={setPriceRange}
                    className="my-4"
                  />
                </div>
                
                <Separator />
                
                {/* Guests */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Guests</label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="h-8 w-8"
                    >
                      -
                    </Button>
                    <span className="mx-3 min-w-8 text-center">{guests}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(Math.min(6, guests + 1))}
                      className="h-8 w-8"
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                {/* Check-in/Check-out dates would go here */}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Check-in/out dates</span>
                </div>
                
                <Button className="w-full mt-4" onClick={() => toast.info("Filters applied")}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Room listings */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold">Our Rooms</h1>
              <div className="text-sm text-muted-foreground">
                Showing {filteredRooms.length} of {rooms.length} rooms
              </div>
            </div>
            
            <Tabs defaultValue="grid" className="mb-6">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
                <div className="text-sm text-muted-foreground">
                  <Filter className="inline mr-1 h-4 w-4" />
                  Sort by: <span className="font-medium">Price (Low to High)</span>
                </div>
              </div>
              
              <TabsContent value="grid" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRooms.map((room) => (
                    <div key={room.id} className="bg-white rounded-xl border border-hotel-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative h-48">
                        <img 
                          src={room.image} 
                          alt={room.name} 
                          className="w-full h-full object-cover"
                        />
                        {!room.available && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-medium px-3 py-1 bg-red-500 rounded-md">
                              Not Available
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{room.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                            <span className="text-sm font-medium">{room.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-1">{room.size} • Up to {room.capacity} guests</p>
                        
                        <div className="mt-2 flex flex-wrap gap-1">
                          {room.amenities.slice(0, 3).map((amenity, i) => (
                            <span key={i} className="inline-block px-2 py-1 text-xs bg-hotel-50 rounded-md">
                              {amenity}
                            </span>
                          ))}
                          {room.amenities.length > 3 && (
                            <span className="inline-block px-2 py-1 text-xs bg-hotel-50 rounded-md">
                              +{room.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div>
                            <span className="text-lg font-semibold">${room.price}</span>
                            <span className="text-sm text-muted-foreground">/ night</span>
                          </div>
                          <Button 
                            disabled={!room.available}
                            onClick={() => handleBookNow(room.id)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="list" className="mt-6 space-y-4">
                {filteredRooms.map((room) => (
                  <div key={room.id} className="flex flex-col md:flex-row bg-white rounded-xl border border-hotel-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative md:w-64 h-48 md:h-auto flex-shrink-0">
                      <img 
                        src={room.image} 
                        alt={room.name} 
                        className="w-full h-full object-cover"
                      />
                      {!room.available && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-medium px-3 py-1 bg-red-500 rounded-md">
                            Not Available
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{room.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                          <span className="text-sm font-medium">{room.rating}</span>
                          <span className="text-xs text-muted-foreground ml-1">({room.reviews} reviews)</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-1">{room.size} • Up to {room.capacity} guests</p>
                      
                      <p className="text-sm mt-2">{room.description}</p>
                      
                      <div className="mt-3 flex flex-wrap gap-1">
                        {room.amenities.map((amenity, i) => (
                          <span key={i} className="inline-block px-2 py-1 text-xs bg-hotel-50 rounded-md">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <div>
                          <span className="text-lg font-semibold">${room.price}</span>
                          <span className="text-sm text-muted-foreground">/ night</span>
                        </div>
                        <Button 
                          disabled={!room.available}
                          onClick={() => handleBookNow(room.id)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RoomsPage;
