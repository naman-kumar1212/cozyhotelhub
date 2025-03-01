
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Logo from '@/components/logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-hotel-50 border-t border-hotel-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <Logo />
            <p className="text-muted-foreground text-sm">
              Discover luxury and comfort at our exquisite hotels. Experience premium service and unforgettable stays.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-hotel-700 hover:text-hotel-900 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-hotel-700 hover:text-hotel-900 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-hotel-700 hover:text-hotel-900 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-hotel-700 hover:text-hotel-900 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-hotel-800 transition-colors text-sm">Home</Link>
              </li>
              <li>
                <Link to="/rooms" className="text-muted-foreground hover:text-hotel-800 transition-colors text-sm">Rooms & Suites</Link>
              </li>
              <li>
                <Link to="/dining" className="text-muted-foreground hover:text-hotel-800 transition-colors text-sm">Dining</Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-hotel-800 transition-colors text-sm">Events</Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-hotel-800 transition-colors text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-hotel-800 transition-colors text-sm">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/rooms/luxury" className="text-muted-foreground hover:text-hotel-800 transition-colors text-sm">Luxury Suites</Link>
              </li>
              <li>
                <Link to="/dining/restaurant" className="text-muted-foreground hover:text-hotel-800 transition-colors text-sm">Fine Dining</Link>
              </li>
              <li>
                <Link to="/events/conference" className="text-muted-foreground hover:text-hotel-800 transition-colors text-sm">Conference Halls</Link>
              </li>
              <li>
                <Link to="/events/wedding" className="text-muted-foreground hover:text-hotel-800 transition-colors text-sm">Wedding Venues</Link>
              </li>
              <li>
                <Link to="/services/spa" className="text-muted-foreground hover:text-hotel-800 transition-colors text-sm">Spa & Wellness</Link>
              </li>
              <li>
                <Link to="/services/concierge" className="text-muted-foreground hover:text-hotel-800 transition-colors text-sm">Concierge Services</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-hotel-800 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">123 Luxury Lane, Prestige City, PC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-hotel-800 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-hotel-800 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">info@cozyhotelhub.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-hotel-100 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} CozyHotelHub. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-muted-foreground hover:text-hotel-800 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-hotel-800 transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-muted-foreground hover:text-hotel-800 transition-colors text-sm">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
