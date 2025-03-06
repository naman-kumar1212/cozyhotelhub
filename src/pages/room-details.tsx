
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Wifi, 
  Coffee, 
  Bath, 
  ShowerHead, 
  Tv, 
  Refrigerator, 
  Wind, 
  Maximize2, 
  Users, 
  BedDouble,
  CalendarCheck
} from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

// Mock room data
const roomsData = [
  {
    id: 1,
    name: 'Deluxe Suite',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    price: 299,
    perNight: true,
    rating: 4.8,
    reviews: 124,
    description: 'Luxurious suite with a king-sized bed, private balcony, and stunning city views. Experience the epitome of comfort with premium bedding, a modern bathroom with a deep soaking tub, and a separate sitting area perfect for relaxation or work.',
    amenities: ['Free WiFi', 'King Bed', 'City View', 'Mini Bar', 'Room Service', 'Air Conditioning', 'Daily Housekeeping', 'Flat-screen TV', 'Coffee Machine', 'Private Bathroom', 'Desk', 'In-room Safe'],
    capacity: 2,
    size: 45,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80'
    ]
  },
  {
    id: 2,
    name: 'Ocean View Room',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    price: 249,
    perNight: true,
    rating: 4.6,
    reviews: 98,
    description: 'Enjoy breathtaking ocean views from this comfortable and stylish room. Wake up to the sound of waves and enjoy the sea breeze from your private balcony. The room features a queen-sized bed, a modern bathroom, and all essential amenities.',
    amenities: ['Ocean View', 'Free WiFi', 'Queen Bed', 'Balcony', 'Mini Bar', 'Room Service', 'Air Conditioning', 'Flat-screen TV', 'Coffee Machine', 'Private Bathroom'],
    capacity: 2,
    size: 38,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1570213489059-0aac6626b344?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80'
    ]
  },
  {
    id: 3,
    name: 'Family Suite',
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    price: 349,
    perNight: true,
    rating: 4.7,
    reviews: 86,
    description: 'Spacious suite perfect for families, featuring two bedrooms and a comfortable living area. The master bedroom includes a king-sized bed, while the second bedroom has two twin beds. The suite also features a fully equipped kitchenette and a dining area.',
    amenities: ['2 Bedrooms', 'Living Area', 'Kitchenette', 'Free WiFi', 'King & Twin Beds', 'Pool Access', 'Room Service', 'Air Conditioning', 'Flat-screen TV', 'Dining Area'],
    capacity: 4,
    size: 65,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1560184897-67f4a3f9a7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80'
    ]
  },
  {
    id: 4,
    name: 'Executive Room',
    image: 'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    price: 279,
    perNight: true,
    rating: 4.5,
    reviews: 74,
    description: 'Modern room designed for business travelers with a dedicated workspace and high-speed internet. The room features a comfortable queen-sized bed, a spacious desk, and a range of business-friendly amenities, including a laptop safe and express check-out service.',
    amenities: ['Workspace', 'High-speed WiFi', 'Queen Bed', 'Laptop Safe', 'Express Check-out', 'Coffee Machine', 'Mini Bar', 'Flat-screen TV', 'Room Service', 'Daily Housekeeping'],
    capacity: 2,
    size: 40,
    available: false,
    images: [
      'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80'
    ]
  }
];

const amenityIcons = {
  'Free WiFi': <Wifi className="h-5 w-5" />,
  'Coffee Machine': <Coffee className="h-5 w-5" />,
  'Private Bathroom': <Bath className="h-5 w-5" />,
  'Room Service': <ShowerHead className="h-5 w-5" />,
  'Flat-screen TV': <Tv className="h-5 w-5" />,
  'Mini Bar': <Refrigerator className="h-5 w-5" />,
  'Air Conditioning': <Wind className="h-5 w-5" />
};

const RoomDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    // In a real app, this would be an API call
    const roomId = parseInt(id as string);
    const roomData = roomsData.find(r => r.id === roomId);
    
    if (roomData) {
      setRoom(roomData);
      setSelectedImage(roomData.images[0]);
    }
    
    setLoading(false);
  }, [id]);

  const handleBookNow = () => {
    toast.success(`Booking initiated for ${room.name}`);
    window.location.href = `/booking/${id}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hotel-500 mx-auto"></div>
            <p className="mt-4 text-hotel-800">Loading room details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Room Not Found</h1>
            <p className="text-gray-600 mb-6">The room you're looking for doesn't exist or has been removed.</p>
            <Link to="/rooms">
              <Button>Back to Rooms</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-hotel-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/rooms" className="hover:text-hotel-600">Rooms</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{room.name}</span>
          </div>
          
          {/* Room title and basic info */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-semibold">{room.name}</h1>
              <div className="mt-2 md:mt-0 flex items-center">
                <div className="bg-hotel-100 text-hotel-800 px-3 py-1 rounded-full text-sm">
                  <span className="font-medium">${room.price}</span> per night
                </div>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Maximize2 size={16} className="mr-1 text-hotel-600" />
                <span>{room.size} m²</span>
              </div>
              <div className="flex items-center">
                <Users size={16} className="mr-1 text-hotel-600" />
                <span>Up to {room.capacity} guests</span>
              </div>
              <div className="flex items-center">
                <BedDouble size={16} className="mr-1 text-hotel-600" />
                <span>{room.capacity <= 2 ? 'King bed' : 'King & Twin beds'}</span>
              </div>
            </div>
          </div>
          
          {/* Room images */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
            <div className="lg:col-span-8">
              <div className="rounded-lg overflow-hidden bg-gray-100 aspect-[4/3]">
                <img 
                  src={selectedImage} 
                  alt={room.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-2">
              {room.images.map((image: string, index: number) => (
                <div 
                  key={index}
                  className={`rounded-lg overflow-hidden aspect-[4/3] cursor-pointer border-2 transition-all ${selectedImage === image ? 'border-hotel-500' : 'border-transparent hover:border-hotel-300'}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${room.name} - view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Room details and booking */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-hotel-100 p-6 mb-8 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">About This Room</h2>
                <p className="text-muted-foreground mb-6">{room.description}</p>
                
                <Separator className="my-6" />
                
                <h3 className="text-lg font-medium mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {room.amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-2 text-hotel-600">
                        {amenityIcons[amenity] || <div className="w-5 h-5 rounded-full bg-hotel-100"></div>}
                      </div>
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-hotel-100 p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Policies</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Check-in/Check-out</h3>
                    <p className="text-sm text-muted-foreground">Check-in: 3:00 PM - 12:00 AM</p>
                    <p className="text-sm text-muted-foreground">Check-out: 11:00 AM</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Cancellation</h3>
                    <p className="text-sm text-muted-foreground">Free cancellation up to 24 hours before check-in</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Children and Extra Beds</h3>
                    <p className="text-sm text-muted-foreground">Children of all ages are welcome. Children 12 and above are considered adults.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-hotel-100 p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Book This Room</h2>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-medium">${room.price} / night</span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between items-center font-medium">
                    <span>Total</span>
                    <span className="text-xl">${room.price}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mb-3 flex items-center justify-center gap-2"
                  disabled={!room.available}
                  onClick={handleBookNow}
                >
                  <CalendarCheck size={18} />
                  {room.available ? 'Book Now' : 'Not Available'}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  You won't be charged yet
                </p>
                
                {room.available ? (
                  <div className="mt-4 bg-green-50 text-green-700 text-sm p-3 rounded-md flex items-start">
                    <div className="mr-2 mt-0.5">✓</div>
                    <div>
                      <p className="font-medium">Room Available</p>
                      <p className="text-xs mt-1">Book now to secure your reservation</p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 bg-red-50 text-red-700 text-sm p-3 rounded-md flex items-start">
                    <div className="mr-2 mt-0.5">×</div>
                    <div>
                      <p className="font-medium">Room Unavailable</p>
                      <p className="text-xs mt-1">Please check back later or choose another room</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RoomDetailsPage;
