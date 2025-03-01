
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ButtonTransition } from "@/components/ui/button-transition";
import { ArrowLeft, Home } from "lucide-react";
import Logo from "@/components/logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-hotel-50 p-4">
      <div className="text-center max-w-md">
        <Logo className="mx-auto mb-8" />
        
        <h1 className="text-6xl font-light text-hotel-800 mb-4">404</h1>
        <p className="text-xl text-hotel-600 mb-8">Oops! The page you're looking for cannot be found.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonTransition 
            className="bg-white border border-hotel-200 text-hotel-800 hover:bg-hotel-50 flex items-center justify-center"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </ButtonTransition>
          
          <ButtonTransition 
            className="bg-hotel-800 text-white hover:bg-hotel-900 flex items-center justify-center"
          >
            <Link to="/" className="flex items-center">
              <Home size={18} className="mr-2" />
              Return Home
            </Link>
          </ButtonTransition>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
