
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Utensils, Wine } from "lucide-react";

const DiningPage = () => {
  const diningOptions = [
    {
      id: 1,
      name: "The Grand Restaurant",
      description: "Fine dining experience with international cuisine prepared by Michelin-starred chefs.",
      icon: Utensils,
      hours: "7:00 AM - 11:00 PM",
      location: "Main Building, Ground Floor",
      specialties: ["Mediterranean Cuisine", "Farm-to-Table", "Fine Dining"],
      image: "https://images.unsplash.com/photo-1514516345957-556ca7c90a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Oceanview Bar",
      description: "Stylish bar offering handcrafted cocktails and panoramic views of the ocean.",
      icon: Wine,
      hours: "12:00 PM - 1:00 AM",
      location: "Main Building, Top Floor",
      specialties: ["Craft Cocktails", "Fine Wines", "Tapas"],
      image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Café Terrace",
      description: "Casual café serving freshly brewed coffee, pastries, and light snacks.",
      hours: "6:00 AM - 8:00 PM",
      location: "Garden Area",
      specialties: ["Organic Coffee", "Pastries", "Light Meals"],
      image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="relative h-[40vh] md:h-[50vh] bg-gradient-to-r from-hotel-800 to-hotel-950 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Fine dining" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Dining Experiences</h1>
            <p className="text-white/90 text-lg md:text-xl">
              Indulge in exceptional culinary journeys crafted by our world-class chefs
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Restaurants & Bars</h2>
            <p className="text-muted-foreground">
              From fine dining to casual cafés, discover the perfect setting for every occasion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diningOptions.map((option) => (
              <Card key={option.id} className="overflow-hidden border-hotel-100 h-full">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={option.image} 
                    alt={option.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {option.icon && (
                      <div className="w-8 h-8 rounded-md bg-hotel-100 flex items-center justify-center text-hotel-800">
                        <option.icon size={18} />
                      </div>
                    )}
                    <CardTitle className="text-xl">{option.name}</CardTitle>
                  </div>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Hours</h4>
                      <p className="text-sm text-muted-foreground">{option.hours}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Location</h4>
                      <p className="text-sm text-muted-foreground">{option.location}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {option.specialties.map((specialty, index) => (
                          <span 
                            key={index} 
                            className="inline-block bg-hotel-50 text-hotel-800 text-xs px-2 py-1 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DiningPage;
