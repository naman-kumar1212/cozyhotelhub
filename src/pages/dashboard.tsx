
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  CreditCard,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  BookOpen,
  Mail,
  Clock,
  Hotel,
  CheckCircle,
  AlertCircle,
  Bell,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import { ButtonTransition } from '@/components/ui/button-transition';
import { toast } from 'sonner';

// Sample data
const upcomingBookings = [
  {
    id: 1,
    roomType: 'Deluxe Suite',
    checkIn: '2023-06-15',
    checkOut: '2023-06-20',
    status: 'confirmed',
    guests: 2,
    amount: 1495
  },
  {
    id: 2,
    roomType: 'Ocean View Room',
    checkIn: '2023-07-10',
    checkOut: '2023-07-15',
    status: 'pending',
    guests: 2,
    amount: 1245
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'booking',
    message: 'You booked a Deluxe Suite',
    date: '2023-06-01',
    time: '10:23 AM'
  },
  {
    id: 2,
    type: 'login',
    message: 'Successful login from new device',
    date: '2023-05-28',
    time: '08:11 PM'
  },
  {
    id: 3,
    type: 'spa',
    message: 'Spa treatment scheduled',
    date: '2023-05-27',
    time: '09:45 AM'
  }
];

const recommendedRooms = [
  {
    id: 1,
    name: 'Executive Suite',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: 399
  },
  {
    id: 2,
    name: 'Family Room',
    image: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: 349
  }
];

// Sidebar items
const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Calendar, label: 'Bookings' },
  { icon: Hotel, label: 'Rooms' },
  { icon: CreditCard, label: 'Payments' },
  { icon: BookOpen, label: 'Reviews' },
  { icon: User, label: 'Profile' },
  { icon: Settings, label: 'Settings' }
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex h-screen bg-hotel-50/50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-hotel-100 hidden md:flex flex-col">
        <div className="p-6">
          <Logo size="sm" />
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={cn(
                "flex items-center w-full px-4 py-3 text-sm rounded-lg transition-colors",
                item.active
                  ? "bg-hotel-800 text-white"
                  : "text-muted-foreground hover:bg-hotel-100 hover:text-foreground"
              )}
              onClick={() => setActiveTab(item.label.toLowerCase())}
            >
              <item.icon size={18} className="mr-3" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-hotel-100">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-sm text-red-500 hover:bg-red-50 w-full rounded-lg transition-colors"
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-hotel-100 py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="md:hidden">
              <Logo size="sm" />
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-hotel-700 hover:bg-hotel-50 rounded-full">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-hotel-200 flex items-center justify-center text-hotel-800 font-medium">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <div className="col-span-1 lg:col-span-2 bg-white rounded-xl border border-hotel-100 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h1 className="text-2xl font-medium mb-2">Welcome back, {user.name}!</h1>
                  <p className="text-muted-foreground">Here's an overview of your activities and upcoming stays</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <ButtonTransition 
                    className="bg-hotel-100 text-hotel-800 hover:bg-hotel-200"
                    onClick={() => navigate('/rooms')}
                  >
                    Book a Room
                  </ButtonTransition>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="col-span-1 bg-white rounded-xl border border-hotel-100 p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Your Loyalty Status</h2>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center text-white">
                  <Crown size={24} className="text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Current Tier</p>
                  <p className="font-medium">Gold Member</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Points</span>
                    <span className="font-medium">850 / 1000</span>
                  </div>
                  <div className="h-2 bg-hotel-100 rounded-full mt-1">
                    <div className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">150 points until Platinum status</p>
              </div>
            </div>

            {/* Upcoming Bookings */}
            <div className="col-span-1 lg:col-span-2 bg-white rounded-xl border border-hotel-100 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Upcoming Stays</h2>
                <button className="text-sm text-hotel-800 hover:underline">View All</button>
              </div>
              
              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="border border-hotel-100 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{booking.roomType}</h3>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "px-2 py-1 text-xs rounded-full",
                            booking.status === 'confirmed'
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          )}
                        >
                          {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <User size={14} className="mr-1 text-hotel-600" />
                          <span>{booking.guests} Guests</span>
                        </div>
                        <div className="font-medium">${booking.amount}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed border-hotel-200 rounded-lg">
                  <Calendar className="mx-auto h-10 w-10 text-hotel-400 mb-2" />
                  <h3 className="text-lg font-medium mb-1">No upcoming stays</h3>
                  <p className="text-muted-foreground mb-4">Time to plan your next getaway!</p>
                  <ButtonTransition
                    className="bg-hotel-100 text-hotel-800 hover:bg-hotel-200"
                    onClick={() => navigate('/rooms')}
                  >
                    Browse Rooms
                  </ButtonTransition>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="col-span-1 bg-white rounded-xl border border-hotel-100 p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <ActivityIcon type={activity.type} />
                    </div>
                    <div>
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.date} at {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="text-sm text-hotel-800 hover:underline mt-4 w-full text-center">
                View All Activities
              </button>
            </div>

            {/* Recommended Rooms */}
            <div className="col-span-1 lg:col-span-3 bg-white rounded-xl border border-hotel-100 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Recommended for You</h2>
                <button className="text-sm text-hotel-800 hover:underline" onClick={() => navigate('/rooms')}>
                  View All Rooms
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedRooms.map((room) => (
                  <div key={room.id} className="flex bg-hotel-50/50 rounded-lg overflow-hidden">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                      <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-medium">{room.name}</h3>
                        <p className="text-muted-foreground text-sm">Available next month</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-hotel-800 font-medium">${room.price} / night</span>
                        <button className="text-xs text-hotel-800 flex items-center">
                          View <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Helper component for activity icons
const ActivityIcon = ({ type }) => {
  switch (type) {
    case 'booking':
      return <Hotel size={16} className="text-blue-500" />;
    case 'login':
      return <CheckCircle size={16} className="text-green-500" />;
    case 'spa':
      return <Clock size={16} className="text-purple-500" />;
    default:
      return <AlertCircle size={16} className="text-yellow-500" />;
  }
};

// Crown icon for loyalty status
const Crown = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className || ""}
  >
    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
  </svg>
);

export default Dashboard;
