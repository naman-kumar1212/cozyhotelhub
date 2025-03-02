
import HeroSection from "@/components/hero-section";
import FeaturedRooms from "@/components/featured-rooms";
import ServicesSection from "@/components/services-section";
import TestimonialSection from "@/components/testimonial-section";
import NewsletterSection from "@/components/newsletter-section";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <div className="relative z-10 pt-16">
          <FeaturedRooms />
          <ServicesSection />
          <TestimonialSection />
          <NewsletterSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
