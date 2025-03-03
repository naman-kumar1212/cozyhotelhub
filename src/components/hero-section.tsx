
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ButtonTransition } from './ui/button-transition';
import { Calendar, ChevronLeft, ChevronRight, Users, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    title: "Experience Luxury",
    subtitle: "Unforgettable stays in our premium suites",
    buttonText: "Explore Rooms",
    buttonLink: "/rooms"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    title: "Exquisite Dining",
    subtitle: "Savor world-class cuisine at our restaurants",
    buttonText: "View Dining",
    buttonLink: "/dining"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    title: "Memorable Events",
    subtitle: "Perfect venues for your special occasions",
    buttonText: "See Events",
    buttonLink: "/events"
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  useEffect(() => {
    const preloadImages = async () => {
      try {
        await Promise.all(
          heroSlides.map((slide) => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = slide.image;
              img.onload = resolve;
              img.onerror = reject;
            });
          })
        );
        setLoading(false);
      } catch (error) {
        console.error("Failed to preload images", error);
        setLoading(false);
      }
    };

    preloadImages();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-hotel-100 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center justify-center">
          <div className="w-32 h-32 bg-hotel-200 rounded-full mb-4"></div>
          <div className="h-6 bg-hotel-200 rounded w-48 mb-4"></div>
          <div className="h-4 bg-hotel-200 rounded w-64"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="relative z-20 h-full flex flex-col items-center justify-center text-white px-4">
            <div className={cn(
              "text-center transform transition-all duration-700",
              index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-tight">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {slide.subtitle}
              </p>
              <ButtonTransition
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                onClick={() => navigate(slide.buttonLink)}
              >
                {slide.buttonText}
              </ButtonTransition>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation indicators */}
      <div className="absolute bottom-32 left-0 right-0 z-30 flex justify-center space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentSlide ? "bg-white scale-100" : "bg-white/50 scale-75 hover:scale-90 hover:bg-white/70"
            )}
            onClick={() => {
              setIsAnimating(true);
              setCurrentSlide(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Arrow navigation */}
      <button
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 bg-black/20 backdrop-blur-sm hover:bg-black/40 p-2 rounded-full text-white/90 hover:text-white transition-all duration-300"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 bg-black/20 backdrop-blur-sm hover:bg-black/40 p-2 rounded-full text-white/90 hover:text-white transition-all duration-300"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Booking Form - Adjusted position to be visible */}
      <div className="absolute bottom-6 left-0 right-0 z-30 mx-auto w-full max-w-5xl px-4 md:px-6">
        <div className="glass-morphism p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-t-hotel-800">
          <div className="mb-4">
            <h3 className="text-lg md:text-xl font-medium text-hotel-800 mb-1">Check Availability</h3>
            <p className="text-sm text-muted-foreground">Find your perfect room for your stay</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="check-in" className="text-sm font-medium text-hotel-700">Check-in Date</Label>
              <div className="relative">
                <Input 
                  id="check-in"
                  type="date" 
                  className="w-full pl-10 border-hotel-200 focus-visible:ring-hotel-400"
                  placeholder="Check-in Date"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-hotel-400" size={18} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="check-out" className="text-sm font-medium text-hotel-700">Check-out Date</Label>
              <div className="relative">
                <Input 
                  id="check-out"
                  type="date" 
                  className="w-full pl-10 border-hotel-200 focus-visible:ring-hotel-400"
                  placeholder="Check-out Date"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-hotel-400" size={18} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="guests" className="text-sm font-medium text-hotel-700">Guests</Label>
              <div className="relative">
                <select 
                  id="guests"
                  className="flex h-10 w-full rounded-md border border-hotel-200 bg-background px-3 py-2 pl-10 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hotel-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>2 Adults, 1 Child</option>
                  <option>2 Adults, 2 Children</option>
                </select>
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-hotel-400" size={18} />
              </div>
            </div>
            
            <div className="space-y-2 flex items-end">
              <ButtonTransition className="w-full bg-hotel-800 text-white hover:bg-hotel-900 h-10 gap-2 group">
                <Search size={18} className="group-hover:translate-x-1 transition-transform" />
                <span>Check Availability</span>
              </ButtonTransition>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
