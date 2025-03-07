
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bed, Maximize2, Users, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonTransition } from './ui/button-transition';

interface RoomCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  amenities: string[];
  capacity: number;
  size: number;
  type: string;
  className?: string;
}

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  amenities,
  capacity,
  size,
  type,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "bg-white border border-hotel-200 rounded-lg overflow-hidden luxury-shadow hover:shadow-lg transition-all duration-500",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-60">
        <img 
          src={image} 
          alt={name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700", 
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-hotel-800 border border-hotel-200">
          {type}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-medium text-hotel-900">{name}</h3>
          <div className="text-right">
            <span className="text-xl font-medium text-hotel-800">${price}</span>
            <span className="text-sm text-muted-foreground"> / night</span>
          </div>
        </div>
        
        <div className="w-12 h-0.5 bg-hotel-300 rounded-full mb-3"></div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users size={16} className="mr-2 text-hotel-600" />
            <span>Up to {capacity} guests</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Maximize2 size={16} className="mr-2 text-hotel-600" />
            <span>{size} sqft</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Bed size={16} className="mr-2 text-hotel-600" />
            <span>King bed</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Wifi size={16} className="mr-2 text-hotel-600" />
            <span>Free Wifi</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Link to={`/rooms/${id}`} className="flex-1">
            <ButtonTransition 
              variant="outline" 
              size="sm" 
              className="w-full border-hotel-200 text-hotel-800 hover:bg-hotel-50"
            >
              View Details
            </ButtonTransition>
          </Link>
          
          <Link to={`/booking/${id}`} className="flex-1">
            <ButtonTransition 
              size="sm" 
              className="w-full luxury-button"
            >
              Book Now
            </ButtonTransition>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
