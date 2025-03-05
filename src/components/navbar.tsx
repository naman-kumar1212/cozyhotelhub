
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import { ButtonTransition } from '@/components/ui/button-transition';
import { useAuth } from '@/context/auth-context';

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
  const { isAuthenticated, user, logout } = useAuth();
  
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
                "relative font-medium text-sm whitespace-nowrap transition-colors duration-200",
                (isScrolled || isDarkTextPage) 
                  ? "text-hotel-800 hover:text-hotel-950" 
                  : "text-white hover:text-hotel-100",
                location.pathname === link.path && (
                  (isScrolled || isDarkTextPage) ? "text-hotel-950 font-semibold" : "text-white font-semibold"
                ),
                "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
                location.pathname === link.path && "after:scale-x-100 after:origin-bottom-left"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="mr-2">
                <ButtonTransition size="sm" variant="outline" className="flex items-center gap-1">
                  <LayoutDashboard size={16} /> Dashboard
                </ButtonTransition>
              </Link>
              <ButtonTransition size="sm" onClick={logout}>
                Sign Out
              </ButtonTransition>
            </>
          ) : (
            <Link to="/login">
              <ButtonTransition size="sm">
                Sign In
              </ButtonTransition>
            </Link>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className={cn(
            "md:hidden p-2 focus:outline-none",
            isScrolled || isDarkTextPage ? "text-hotel-800" : "text-white"
          )}
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
                "text-hotel-800 text-lg font-medium py-2 border-b border-muted transition-colors hover:text-hotel-950",
                location.pathname === link.path && "text-hotel-950 font-semibold"
              )}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-hotel-800 text-lg font-medium py-2 border-b border-muted transition-colors hover:text-hotel-950 flex items-center"
                onClick={closeMenu}
              >
                <LayoutDashboard size={18} className="mr-2" /> Dashboard
              </Link>
              <ButtonTransition className="mt-4 w-full" onClick={logout}>
                Sign Out
              </ButtonTransition>
            </>
          ) : (
            <Link to="/login" className="w-full">
              <ButtonTransition className="mt-4 w-full">
                Sign In
              </ButtonTransition>
            </Link>
          )}
        </nav>
      </div>
      
      {/* Dashboard Quick Access Icon for all pages */}
      {isAuthenticated && !['/dashboard', '/'].includes(location.pathname) && (
        <Link
          to="/dashboard"
          className={cn(
            "fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
            "bg-hotel-800 text-white hover:bg-hotel-900 luxury-shadow",
          )}
          aria-label="Dashboard"
        >
          <LayoutDashboard size={24} />
        </Link>
      )}
    </header>
  );
};

export default Navbar;
