import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

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
    navigate("/login");
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center text-white">
            <Crown size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-semibold ml-4">
            {greeting()}, {user?.name || "Guest"}!
          </h1>
        </div>
        <p className="text-gray-600 mb-6">
          Welcome to your dashboard. Here you can manage your account and
          settings.
        </p>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Account Details</h2>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>
        <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
