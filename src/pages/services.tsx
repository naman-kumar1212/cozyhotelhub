
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Spa, Utensils, Glass, Dumbbell, SwimmingPool, WifiIcon, Car, Tv } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const services = {
  dining: [
    {
      id: 1,
      name: "The Grand Restaurant",
      description: "Fine dining experience with international cuisine prepared by Michelin-starred chefs.",
      icon: Utensils,
      hours: "7:00 AM - 11:00 PM",
      location: "Main Building, Ground Floor",
      image: "https://images.unsplash.com/photo-1514516345957-556ca7c90a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Oceanview Bar",
      description: "Stylish bar offering handcrafted cocktails and panoramic views of the ocean.",
      icon: Glass,
      hours: "12:00 PM - 1:00 AM",
      location: "Main Building, Top Floor",
      image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Café Terrace",
      description: "Casual café serving freshly brewed coffee, pastries, and light snacks.",
      icon: Coffee,
      hours: "6:00 AM - 8:00 PM",
      location: "Garden Area",
      image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ],
  wellness: [
    {
      id: 1,
      name: "Tranquil Spa",
      description: "Rejuvenate with our range of therapeutic treatments and massages.",
      icon: Spa,
      hours: "9:00 AM - 8:00 PM",
      location: "Wellness Wing, 2nd Floor",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Fitness Center",
      description: "State-of-the-art gym equipped with the latest cardio and strength training equipment.",
      icon: Dumbbell,
      hours: "6:00 AM - 10:00 PM",
      location: "Wellness Wing, Ground Floor",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Indoor & Outdoor Pools",
      description: "Swim and relax in our temperature-controlled pools with dedicated kids' areas.",
      icon: SwimmingPool,
      hours: "7:00 AM - 9:00 PM",
      location: "Garden Area & Indoor Wellness Wing",
      image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ],
  amenities: [
    {
      id: 1,
      name: "High-Speed WiFi",
      description: "Complimentary high-speed internet access throughout the hotel.",
      icon: WifiIcon,
      availability: "24/7",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Valet Parking",
      description: "Convenient valet parking service for all hotel guests.",
      icon: Car,
      availability: "24/7",
      location: "Main Entrance",
      image: "https://images.unsplash.com/photo-1621288923084-55c7cb0a0ecb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Entertainment Systems",
      description: "Smart TVs with streaming services and premium channels in all rooms.",
      icon: Tv,
      availability: "In-room",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ]
};

// Coffee icon component
const Coffee = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" x2="6" y1="2" y2="4" />
    <line x1="10" x2="10" y1="2" y2="4" />
    <line x1="14" x2="14" y1="2" y2="4" />
  </svg>
);

// SwimmingPool icon component
const SwimmingPool = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12h20" />
    <path d="M2 20h20" />
    <path d="M6 8v4" />
    <path d="M10 4v8" />
    <path d="M14 4v8" />
    <path d="M18 8v4" />
    <path d="M4 16c0 1 .8 2 2 2s2-1 2-2-.8-2-2-2-2 1-2 2z" />
    <path d="M14 16c0 1 .8 2 2 2s2-1 2-2-.8-2-2-2-2 1-2 2z" />
    <path d="M8 14h8" />
  </svg>
);

const ServicesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-10 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">Hotel Services & Amenities</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the wide range of services and amenities designed to make your stay comfortable,
              relaxing, and memorable at CozyHotelHub.
            </p>
          </div>
          
          <Tabs defaultValue="dining" className="mb-10">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dining">Dining</TabsTrigger>
              <TabsTrigger value="wellness">Wellness</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
            </TabsList>
            
            {Object.entries(services).map(([category, items]) => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <Card key={item.id} className="overflow-hidden border-hotel-100">
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-md bg-hotel-100 flex items-center justify-center text-hotel-800">
                            <item.icon size={18} />
                          </div>
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-3">{item.description}</CardDescription>
                        <div className="text-sm">
                          {item.hours && (
                            <div className="flex justify-between mb-1">
                              <span className="text-muted-foreground">Hours:</span>
                              <span>{item.hours}</span>
                            </div>
                          )}
                          {item.availability && (
                            <div className="flex justify-between mb-1">
                              <span className="text-muted-foreground">Availability:</span>
                              <span>{item.availability}</span>
                            </div>
                          )}
                          {item.location && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Location:</span>
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
