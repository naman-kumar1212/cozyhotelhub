
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Home
} from "lucide-react";
import { format } from "date-fns";

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
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center text-white mr-4">
              <Crown size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">
                {greeting()}, {user?.name || "Guest"}!
              </h1>
              <p className="text-gray-500">
                {format(currentTime, "EEEE, MMMM do, yyyy")}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link to="/">
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Home size={16} /> Home
              </Button>
            </Link>
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <Bell size={16} /> Notifications
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <Mail size={16} /> Messages
            </Button>
            <Button size="sm" onClick={handleLogout} variant="destructive" className="flex items-center gap-1">
              <LogOut size={16} /> Logout
            </Button>
          </div>
        </div>

        {/* Main dashboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <User size={18} /> Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={32} className="text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full mt-1">
                    {user.role === 'admin' ? 'Administrator' : 'Guest'}
                  </span>
                </div>
              </div>
              <Link to="/profile" className="block">
                <Button variant="outline" size="sm" className="w-full">
                  <Settings size={14} className="mr-2" /> Manage Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Upcoming Stays */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <BedDouble size={18} /> Upcoming Stays
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.reservations && user.reservations.length > 0 ? (
                <div>
                  {/* Show reservations here */}
                  <p>Your upcoming reservations would appear here.</p>
                </div>
              ) : (
                <div className="text-center py-6">
                  <BedDouble size={40} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500 mb-4">No upcoming stays</p>
                  <Link to="/rooms">
                    <Button size="sm">Book a Room</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Link to="/rooms" className="block">
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                  <BedDouble size={14} /> Book Room
                </Button>
              </Link>
              <Link to="/dining" className="block">
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                  <Calendar size={14} /> Reserve Table
                </Button>
              </Link>
              <Link to="/services" className="block">
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                  <Crown size={14} /> Services
                </Button>
              </Link>
              <Link to="/contact" className="block">
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                  <Mail size={14} /> Contact
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Payment History Section */}
        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <CreditCard size={18} /> Payment History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <CreditCard size={40} className="mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500">No payment history available</p>
            </div>
          </CardContent>
        </Card>

        {/* Admin Section - Only shown to admins */}
        {user.role === 'admin' && (
          <Card className="border-2 border-amber-200">
            <CardHeader className="pb-2 bg-amber-50">
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Crown size={18} /> Admin Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <User size={16} /> Manage Users
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <BedDouble size={16} /> Room Inventory
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <Settings size={16} /> System Settings
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
