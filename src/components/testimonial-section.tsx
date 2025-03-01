
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: "Emma Thompson",
    location: "New York, USA",
    rating: 5,
    text: "Our stay at this hotel exceeded all expectations. The rooms were immaculate, the staff was attentive, and the amenities were top-notch. Will definitely be returning!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "London, UK",
    rating: 5,
    text: "The attention to detail was impressive. From the moment we checked in until our departure, every aspect of our stay was handled with utmost professionalism and care.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    location: "Paris, France",
    rating: 4,
    text: "Beautiful property with amazing views. The dining experience was phenomenal and the spa services were rejuvenating. A perfect weekend getaway.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    name: "James Wilson",
    location: "Sydney, Australia",
    rating: 5,
    text: "We hosted our corporate event here and were blown away by the service. The meeting spaces were well-equipped, and the catering was exceptional. Highly recommended!",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  }
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  
  const handleResize = () => {
    if (window.innerWidth < 640) {
      setVisibleCount(1);
    } else if (window.innerWidth < 1024) {
      setVisibleCount(2);
    } else {
      setVisibleCount(3);
    }
  };
  
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = () => {
    setActiveIndex((prevIndex) => 
      prevIndex + visibleCount >= testimonials.length 
        ? 0 
        : prevIndex + 1
    );
  };

  const prev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex <= 0 
        ? Math.max(0, testimonials.length - visibleCount) 
        : prevIndex - 1
    );
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-2">Guest Experiences</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read what our valued guests have to say about their stay with us
          </p>
        </div>
        
        <div className="flex justify-end mb-6 space-x-3">
          <button 
            onClick={prev} 
            className="p-2 border border-hotel-200 rounded-full text-hotel-700 hover:bg-hotel-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next} 
            className="p-2 border border-hotel-200 rounded-full text-hotel-700 hover:bg-hotel-50 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-all duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${activeIndex * (100 / visibleCount)}%)`,
              width: `${(testimonials.length / visibleCount) * 100}%` 
            }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="px-3"
                style={{ width: `${100 / testimonials.length * visibleCount}%` }}
              >
                <div className="bg-white border border-hotel-100 rounded-lg p-6 h-full shadow-sm">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground text-sm italic">"{testimonial.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
