
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth-context';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { CalendarIcon, CreditCard, Users } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, addDays } from 'date-fns';

// Mock room data - same as in room-details.tsx
const roomsData = [
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
    size: 45,
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
    size: 38,
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
    size: 65,
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
    size: 40,
    available: false
  }
];

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [guests, setGuests] = useState(1);
  const [processing, setProcessing] = useState(false);
  
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real app, this would be an API call
    const roomId = parseInt(id as string);
    const roomData = roomsData.find(r => r.id === roomId);
    
    if (roomData) {
      setRoom(roomData);
      setGuests(1);
    }
    
    setLoading(false);
  }, [id]);
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please log in to book a room");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 1;
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const nights = calculateNights();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    
    setProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Booking confirmed for ${room.name}`);
      setProcessing(false);
      navigate("/dashboard");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hotel-500 mx-auto"></div>
            <p className="mt-4 text-hotel-800">Loading booking form...</p>
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
            <p className="text-gray-600 mb-6">The room you're trying to book doesn't exist or is not available.</p>
            <Link to="/rooms">
              <Button>View Available Rooms</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!room.available) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Room Unavailable</h1>
            <p className="text-gray-600 mb-6">This room is currently not available for booking.</p>
            <Link to="/rooms">
              <Button>View Available Rooms</Button>
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
          <h1 className="text-3xl font-semibold mb-8">Complete Your Booking</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Guest Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          placeholder="First Name" 
                          defaultValue={user?.name?.split(' ')[0] || ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Last Name" 
                          defaultValue={user?.name?.split(' ')[1] || ''}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Email Address" 
                        defaultValue={user?.email || ''}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Phone Number" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                      <textarea 
                        id="specialRequests" 
                        className="w-full border rounded-md p-2 min-h-[100px]"
                        placeholder="Any special requests or requirements?"
                      ></textarea>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Stay Details</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Check-in Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={checkInDate}
                              onSelect={setCheckInDate}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Check-out Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={checkOutDate}
                              onSelect={setCheckOutDate}
                              initialFocus
                              disabled={(date) => checkInDate ? date <= checkInDate : date <= new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="guests">Number of Guests</Label>
                        <span className="text-sm text-muted-foreground">Max: {room.capacity}</span>
                      </div>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          disabled={guests <= 1}
                        >
                          -
                        </Button>
                        <div className="h-8 px-4 flex items-center justify-center border-y border-input">
                          {guests}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => setGuests(Math.min(room.capacity, guests + 1))}
                          disabled={guests >= room.capacity}
                        >
                          +
                        </Button>
                        <div className="ml-4 flex items-center text-muted-foreground text-sm">
                          <Users size={16} className="mr-1" />
                          <span>{guests} {guests === 1 ? 'guest' : 'guests'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="Name on Card" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={room.image} 
                        alt={room.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{room.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {room.capacity} {room.capacity === 1 ? 'guest' : 'guests'} max • {room.size} m²
                      </p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Check-in</span>
                      <span className="font-medium">
                        {checkInDate ? format(checkInDate, "EEE, MMM d, yyyy") : "Select date"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-out</span>
                      <span className="font-medium">
                        {checkOutDate ? format(checkOutDate, "EEE, MMM d, yyyy") : "Select date"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration</span>
                      <span className="font-medium">{nights} {nights === 1 ? 'night' : 'nights'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guests</span>
                      <span className="font-medium">{guests}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Room ({nights} {nights === 1 ? 'night' : 'nights'})</span>
                      <span className="font-medium">${room.price * nights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes and fees</span>
                      <span className="font-medium">${Math.floor(room.price * nights * 0.12)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${room.price * nights + Math.floor(room.price * nights * 0.12)}</span>
                  </div>
                  
                  <Button 
                    className="w-full mt-6"
                    onClick={handleSubmit}
                    disabled={processing}
                  >
                    {processing ? "Processing..." : "Confirm Booking"}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    By confirming, you agree to our terms and conditions and privacy policy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingPage;
