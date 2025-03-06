
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown, 
  User, 
  Settings, 
  Calendar, 
  BedDouble, 
  LogOut, 
  Mail, 
  Bell,
  CreditCard,
  Home,
  Clock,
  Coffee,
  Hotel,
  Activity,
  ChevronRight,
  Utensils,
  Car,
  Sparkles
} from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) {
      return "Good morning";
    } else if (hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header section with gradient background */}
        <div className="bg-gradient-to-r from-hotel-500 to-hotel-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mr-5 shadow-inner">
                <Crown size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  {greeting()}, {user?.name || "Guest"}!
                </h1>
                <p className="text-white/80 mt-1">
                  {format(currentTime, "EEEE, MMMM do, yyyy")}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/">
                <Button size="sm" variant="secondary" className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white border-none">
                  <Home size={16} /> Home
                </Button>
              </Link>
              <Button size="sm" variant="secondary" className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white border-none">
                <Bell size={16} /> <span className="hidden sm:inline">Notifications</span>
              </Button>
              <Button size="sm" variant="secondary" className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white border-none">
                <Mail size={16} /> <span className="hidden sm:inline">Messages</span>
              </Button>
              <Button size="sm" onClick={handleLogout} variant="secondary" className="flex items-center gap-1 bg-white/30 hover:bg-white/40 text-white border-none">
                <LogOut size={16} /> Logout
              </Button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <Clock className="text-white/80" size={20} />
                <div>
                  <p className="text-white/70 text-sm">Check-in</p>
                  <p className="font-semibold">No upcoming</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <BedDouble className="text-white/80" size={20} />
                <div>
                  <p className="text-white/70 text-sm">Stays</p>
                  <p className="font-semibold">0 booked</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <Utensils className="text-white/80" size={20} />
                <div>
                  <p className="text-white/70 text-sm">Dining</p>
                  <p className="font-semibold">No reservations</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <Activity className="text-white/80" size={20} />
                <div>
                  <p className="text-white/70 text-sm">Loyalty Points</p>
                  <p className="font-semibold">500 pts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for main dashboard content */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="bg-white shadow rounded-lg mb-6 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-hotel-100 data-[state=active]:text-hotel-900">Overview</TabsTrigger>
            <TabsTrigger value="stays" className="data-[state=active]:bg-hotel-100 data-[state=active]:text-hotel-900">My Stays</TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-hotel-100 data-[state=active]:text-hotel-900">Services</TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-hotel-100 data-[state=active]:text-hotel-900">Payments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Card */}
              <Card className="overflow-hidden border-none shadow-lg">
                <div className="bg-gradient-to-r from-hotel-200 to-hotel-300 h-24"></div>
                <CardContent className="pt-0 relative">
                  <Avatar className="h-20 w-20 border-4 border-white absolute -top-10 shadow-md">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback className="bg-hotel-500 text-white">
                      {user.name ? user.name.charAt(0).toUpperCase() : <User size={32} />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-12">
                    <h3 className="font-bold text-xl">{user.name}</h3>
                    <p className="text-gray-500">{user.email}</p>
                    {user.address && (
                      <p className="text-gray-500 text-sm mt-1">{user.address}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className={cn(
                        "inline-block px-3 py-1 rounded-full text-xs font-medium",
                        user.role === 'admin' 
                          ? "bg-amber-100 text-amber-800" 
                          : "bg-hotel-100 text-hotel-800"
                      )}>
                        {user.role === 'admin' ? 'Administrator' : 'Guest'}
                      </span>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Link to="/profile" className="block">
                      <Button variant="outline" size="sm" className="w-full bg-gradient-to-r from-hotel-50 to-hotel-100 hover:from-hotel-100 hover:to-hotel-200 text-hotel-800">
                        <Settings size={14} className="mr-2" /> Manage Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Stays */}
              <Card className="border-none shadow-lg">
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BedDouble size={18} className="text-hotel-600" /> Upcoming Stays
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {user.reservations && user.reservations.length > 0 ? (
                    <div>
                      {/* Show reservations here */}
                      <p>Your upcoming reservations would appear here.</p>
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <div className="bg-hotel-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <BedDouble size={30} className="text-hotel-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-1">No upcoming stays</h3>
                      <p className="text-gray-500 text-sm mb-4">Book your next luxurious experience</p>
                      <Link to="/rooms">
                        <Button size="sm" className="bg-hotel-600 hover:bg-hotel-700">Book a Room</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Links Card */}
              <Card className="border-none shadow-lg">
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <Link to="/rooms" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <Hotel size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Book a Room</p>
                          <p className="text-sm text-gray-500">Find your perfect accommodation</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </Link>
                    
                    <Link to="/dining" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <Coffee size={18} className="text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">Reserve Dining</p>
                          <p className="text-sm text-gray-500">Enjoy our exclusive restaurants</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </Link>
                    
                    <Link to="/services" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <Sparkles size={18} className="text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Spa & Wellness</p>
                          <p className="text-sm text-gray-500">Relax and rejuvenate</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </Link>
                    
                    <Link to="/services" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <Car size={18} className="text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Transportation</p>
                          <p className="text-sm text-gray-500">Airport transfers and more</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Payment History Section */}
            <Card className="mt-6 border-none shadow-lg overflow-hidden">
              <CardHeader className="pb-2 border-b bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard size={18} className="text-hotel-600" /> Payment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CreditCard size={30} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-1">No payment history</h3>
                  <p className="text-gray-500 text-sm">Your transaction records will appear here</p>
                </div>
              </CardContent>
            </Card>

            {/* Admin Section - Only shown to admins */}
            {user.role === 'admin' && (
              <Card className="mt-6 border-2 border-amber-200 shadow-lg">
                <CardHeader className="pb-2 bg-gradient-to-r from-amber-50 to-amber-100">
                  <CardTitle className="flex items-center gap-2 text-lg text-amber-800">
                    <Crown size={18} /> Admin Controls
                  </CardTitle>
                  <CardDescription className="text-amber-700">Manage hotel resources and user accounts</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-auto py-3 border-amber-200 bg-white hover:bg-amber-50">
                    <User size={16} className="text-amber-600" /> <span>Manage Users</span>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-auto py-3 border-amber-200 bg-white hover:bg-amber-50">
                    <BedDouble size={16} className="text-amber-600" /> <span>Room Inventory</span>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-auto py-3 border-amber-200 bg-white hover:bg-amber-50">
                    <Settings size={16} className="text-amber-600" /> <span>System Settings</span>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="stays">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>My Stays</CardTitle>
                <CardDescription>View and manage your hotel reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Hotel size={30} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-1">No bookings found</h3>
                  <p className="text-gray-500 text-sm mb-4">You haven't made any reservations yet</p>
                  <Link to="/rooms">
                    <Button size="sm" className="bg-hotel-600 hover:bg-hotel-700">Explore Rooms</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Hotel Services</CardTitle>
                <CardDescription>Discover amenities and request special services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                    <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Coffee size={20} className="text-red-600" />
                    </div>
                    <h3 className="font-medium mb-1">Room Service</h3>
                    <p className="text-sm text-gray-500">Order food to your room</p>
                  </div>
                  
                  <div className="bg-white border rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                    <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Sparkles size={20} className="text-blue-600" />
                    </div>
                    <h3 className="font-medium mb-1">Housekeeping</h3>
                    <p className="text-sm text-gray-500">Request cleaning service</p>
                  </div>
                  
                  <div className="bg-white border rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                    <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Car size={20} className="text-purple-600" />
                    </div>
                    <h3 className="font-medium mb-1">Valet Service</h3>
                    <p className="text-sm text-gray-500">Request your vehicle</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>View your transaction history and manage payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CreditCard size={30} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-1">No transactions yet</h3>
                  <p className="text-gray-500 text-sm mb-4">Your payment history will appear here</p>
                  <Button size="sm" variant="outline">Add Payment Method</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
