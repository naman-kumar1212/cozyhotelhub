
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Calendar, Users, MapPin } from "lucide-react";

const EventsPage = () => {
  const events = [
    {
      id: 1,
      name: "Luxury Wedding Venues",
      description: "Create memories that last a lifetime with our elegant wedding venues and exceptional service.",
      capacity: "50-500 guests",
      features: ["Ballroom", "Garden", "Beachfront"],
      services: ["Catering", "Decoration", "Photography"],
      image: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Corporate Conferences",
      description: "State-of-the-art facilities for meetings and conferences with all the technology you need.",
      capacity: "10-300 attendees",
      features: ["Conference Rooms", "Auditorium", "Breakout Spaces"],
      services: ["AV Equipment", "Catering", "Business Center"],
      image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Social Gatherings",
      description: "Perfect spaces for celebrations, reunions, and special occasions of all sizes.",
      capacity: "20-200 guests",
      features: ["Private Dining", "Lounge", "Terrace"],
      services: ["Custom Menus", "Entertainment", "Event Planning"],
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: "Jazz Night",
      date: "June 15, 2023",
      time: "8:00 PM - 11:00 PM",
      location: "Oceanview Bar",
      description: "Enjoy an evening of smooth jazz with our resident band and special guests.",
      image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Wine Tasting",
      date: "June 22, 2023",
      time: "6:30 PM - 9:00 PM",
      location: "The Grand Restaurant",
      description: "Sample a selection of fine wines paired with gourmet appetizers.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Cooking Class",
      date: "June 29, 2023",
      time: "4:00 PM - 6:00 PM",
      location: "Culinary Studio",
      description: "Learn to prepare signature dishes from our executive chef.",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="relative h-[40vh] md:h-[50vh] bg-gradient-to-r from-hotel-800 to-hotel-950 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Event venue" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Events & Functions</h1>
            <p className="text-white/90 text-lg md:text-xl">
              Perfect venues for every occasion, from intimate gatherings to grand celebrations
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Event Spaces</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our versatile event spaces can be tailored to your specific needs, whether you're planning a wedding, corporate event, or social gathering.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden border-hotel-100 h-full">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{event.name}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Users className="h-4 w-4 mt-1 text-muted-foreground" />
                      <div>
                        <h4 className="text-sm font-medium">Capacity</h4>
                        <p className="text-sm text-muted-foreground">{event.capacity}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {event.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="bg-hotel-50 text-hotel-800 border-hotel-100">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {event.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="bg-white text-foreground border-hotel-100">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-2">Request Information</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-center">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden border-hotel-100">
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{event.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{event.date}, {event.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <Button size="sm" className="w-full mt-2">Reserve a Spot</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EventsPage;
