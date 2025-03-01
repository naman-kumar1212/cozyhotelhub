
import { Utensils, Calendar, Martini, Waves, Car, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    id: 1,
    title: "Fine Dining",
    description: "Experience culinary excellence with our award-winning chefs",
    icon: Utensils,
    link: "/dining"
  },
  {
    id: 2,
    title: "Event Spaces",
    description: "Perfect venues for weddings, conferences and special occasions",
    icon: Calendar,
    link: "/events"
  },
  {
    id: 3,
    title: "Bar & Lounge",
    description: "Unwind with signature cocktails in our elegant setting",
    icon: Martini,
    link: "/dining/bar"
  },
  {
    id: 4,
    title: "Spa & Wellness",
    description: "Rejuvenate with our premium spa treatments and facilities",
    icon: Waves,
    link: "/services/spa"
  },
  {
    id: 5,
    title: "Chauffeur Service",
    description: "Luxury transportation for seamless travel experiences",
    icon: Car,
    link: "/services/transport"
  },
  {
    id: 6,
    title: "Concierge",
    description: "Personalized assistance to enhance your stay with us",
    icon: Award,
    link: "/services/concierge"
  }
];

const ServiceCard = ({ title, description, icon: Icon, index }) => (
  <div 
    className={cn(
      "bg-white border border-hotel-100 rounded-lg p-6 transition-all duration-300 hover:shadow-md group",
      "animate-fade-in",
      {
        "animation-delay-200": index % 3 === 1,
        "animation-delay-400": index % 3 === 2,
      }
    )}
  >
    <div className="mb-4 p-3 bg-hotel-50 w-12 h-12 flex items-center justify-center rounded-lg text-hotel-800 group-hover:bg-hotel-100 transition-colors">
      <Icon size={24} />
    </div>
    
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

const ServicesSection = () => {
  return (
    <section className="py-20 bg-hotel-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-2">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience premium amenities and exceptional services designed to make your stay memorable
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
