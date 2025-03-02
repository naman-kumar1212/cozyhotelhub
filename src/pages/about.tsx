
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Users, Building, Map, Award, Clock, Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[40vh] md:h-[50vh] bg-gradient-to-r from-hotel-800 to-hotel-950 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Hotel exterior" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="container mx-auto px-4 h-full flex items-center relative z-20">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Our Story</h1>
              <p className="text-white/90 text-lg md:text-xl">
                Delivering exceptional hospitality experiences since 1995
              </p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-hotel-100 flex items-center justify-center text-hotel-800 mb-4">
                  <Building size={24} />
                </div>
                <h3 className="text-xl font-medium mb-2">15+ Properties</h3>
                <p className="text-muted-foreground">
                  Across prime locations in major cities and exotic destinations
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-hotel-100 flex items-center justify-center text-hotel-800 mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-medium mb-2">500+ Staff</h3>
                <p className="text-muted-foreground">
                  Dedicated hospitality professionals committed to exceptional service
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-hotel-100 flex items-center justify-center text-hotel-800 mb-4">
                  <Map size={24} />
                </div>
                <h3 className="text-xl font-medium mb-2">10+ Countries</h3>
                <p className="text-muted-foreground">
                  Global presence with a consistent standard of luxury and comfort
                </p>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">Our Journey</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="mb-4">
                    Founded in 1995, CozyHotelHub began as a single boutique hotel in San Francisco with a simple mission: to create memorable experiences through personalized hospitality.
                  </p>
                  <p className="mb-4">
                    What started as a family-owned business has now evolved into a global hospitality brand known for luxury accommodations, impeccable service, and attention to detail.
                  </p>
                  <p>
                    Throughout our journey, we've remained committed to our core values of excellence, authenticity, and creating spaces where guests can truly feel at home while experiencing the pinnacle of comfort and service.
                  </p>
                </div>
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Historic hotel"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <Separator className="my-16" />
            
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                <div className="bg-white rounded-xl p-6 border border-hotel-100 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-hotel-100 flex items-center justify-center text-hotel-800 mb-4">
                    <Award size={20} />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Excellence</h3>
                  <p className="text-muted-foreground">
                    We strive for excellence in every detail, from the quality of our accommodations to the service we provide.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-hotel-100 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-hotel-100 flex items-center justify-center text-hotel-800 mb-4">
                    <Heart size={20} />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Hospitality</h3>
                  <p className="text-muted-foreground">
                    Genuine care and personalized attention are at the heart of everything we do.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-hotel-100 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-hotel-100 flex items-center justify-center text-hotel-800 mb-4">
                    <Clock size={20} />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    We continuously evolve and innovate to enhance the guest experience and stay ahead in the industry.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-hotel-50 rounded-xl p-8 border border-hotel-100">
              <h2 className="text-2xl font-semibold mb-4 text-center">Leadership Team</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                {[
                  {
                    name: "Alexandra Chen",
                    position: "Chief Executive Officer",
                    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  },
                  {
                    name: "Marcus Johnson",
                    position: "Chief Operations Officer",
                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  },
                  {
                    name: "Sophia Williams",
                    position: "Head of Hospitality",
                    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  }
                ].map((person, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <img 
                        src={person.image} 
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium">{person.name}</h3>
                    <p className="text-sm text-muted-foreground">{person.position}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
