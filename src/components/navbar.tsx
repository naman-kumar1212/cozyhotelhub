
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import { ButtonTransition } from '@/components/ui/button-transition';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Rooms', path: '/rooms' },
  { name: 'Dining', path: '/dining' },
  { name: 'Events', path: '/events' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

// Pages that have light backgrounds and need dark text
const darkTextPages = ['/rooms', '/contact', '/services', '/about', '/dining', '/events'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const isDarkTextPage = darkTextPages.includes(location.pathname);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass-morphism py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo textClassName={cn(
          isScrolled ? "text-foreground" : isDarkTextPage ? "text-foreground" : "text-white"
        )} />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "relative font-medium text-sm whitespace-nowrap transition-colors duration-200 hover:text-hotel-800",
                "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-hotel-800 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
                isScrolled 
                  ? "text-foreground" 
                  : isDarkTextPage 
                    ? "text-foreground" 
                    : "text-white",
                location.pathname === link.path && "after:scale-x-100 after:origin-bottom-left text-hotel-800"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <ButtonTransition size="sm">
            <Link to="/login">Sign In</Link>
          </ButtonTransition>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out pt-20",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="container mx-auto px-4 py-5 flex flex-col space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-foreground text-lg font-medium py-2 border-b border-muted transition-colors",
                location.pathname === link.path && "text-hotel-800"
              )}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
          
          <ButtonTransition className="mt-4 w-full">
            <Link to="/login" className="w-full">Sign In</Link>
          </ButtonTransition>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
