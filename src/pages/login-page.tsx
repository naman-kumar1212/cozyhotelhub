
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';
import { ButtonTransition } from '@/components/ui/button-transition';
import Logo from '@/components/logo';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const { login, register, isLoading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      }
    } else {
      if (!formData.name) {
        alert('Please enter your name');
        return;
      }
      
      const success = await register(formData.name, formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section: Image */}
      <div 
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)' }}
      >
        <div className="h-full w-full bg-black/30 flex items-center justify-center p-12">
          <div className="text-white max-w-md">
            <h1 className="text-4xl font-light mb-4">Welcome to CozyHotelHub</h1>
            <p className="mb-6">
              Experience luxury and comfort like never before. 
              {isLogin ? 'Sign in to your account to access exclusive benefits and manage your bookings.' : 'Join us to enjoy exclusive benefits and a seamless booking experience.'}
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-1 bg-white/60 rounded-full"></div>
              <span className="text-white/80 text-sm">Luxury Redefined</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Section: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:text-left">
            <Logo className="mx-auto md:mx-0 mb-6" />
            <h2 className="text-2xl font-medium mb-2">
              {isLogin ? 'Sign in to your account' : 'Create an account'}
            </h2>
            <p className="text-muted-foreground">
              {isLogin ? 'Enter your credentials to access your account' : 'Fill in your details to create a new account'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-hotel-200 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-hotel-200 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-hotel-200 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            {isLogin && (
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-hotel-800 hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}
            
            <ButtonTransition
              type="submit"
              className="w-full py-3 bg-hotel-800 text-white hover:bg-hotel-900"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </ButtonTransition>
            
            <div className="text-center mt-6">
              <p className="text-muted-foreground text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-hotel-800 hover:underline font-medium"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </form>
          
          {/* Demo credentials */}
          {isLogin && (
            <div className="mt-6 p-4 bg-muted rounded-md text-sm">
              <p className="font-medium mb-2">Demo Credentials:</p>
              <p>Email: demo@example.com</p>
              <p>Password: password</p>
              <p className="mt-2">Admin: admin@example.com / admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
