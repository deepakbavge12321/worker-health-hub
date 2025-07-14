import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FileText, Calendar, Shield, Settings, Bell, QrCode } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  // Default to "Carlos Henrique da Silva" if user.name is not provided
  const displayName = user?.name || "Carlos Henrique da Silva";
  const firstName = displayName.split(" ")[0];

  const healthMetrics = [
    { label: "Last Check-up", value: "Dec 15, 2024", status: "completed" },
    { label: "Next Vaccination", value: "Jan 20, 2025", status: "pending" },
    { label: "Insurance Status", value: "Active", status: "active" },
    { label: "Safety Score", value: "92/100", status: "good" }
  ];

  const quickActions = [
    { 
      title: "Health Records", 
      icon: FileText, 
      path: "/health-records",
      description: "View medical history"
    },
    { 
      title: "Teleconsultation", 
      icon: Calendar, 
      path: "/teleconsultation",
      description: "Book virtual appointments"
    },
    { 
      title: "Insurance & Rewards", 
      icon: Shield, 
      path: "/insurance",
      description: "Manage benefits"
    },
    { 
      title: "Settings", 
      icon: Settings, 
      path: "/settings",
      description: "Privacy & preferences"
    }
  ];

  return (
    <div className="mobile-container bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="health-gradient text-white px-6 py-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Avatar className="w-16 h-16 border-2 border-white">
              <AvatarImage src={user?.photo} />
              <AvatarFallback className="bg-white text-blue-600 text-lg font-bold">
                {displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">Hello, {firstName}</h1>
              <p className="text-blue-100">Health ID: {user?.healthId || 'BR-12345678'}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/settings')}
          >
            <Bell className="w-5 h-5" />
          </Button>
        </div>

        {/* QR Code for Quick Access */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/90 text-sm font-medium">Quick Access QR</p>
                <p className="text-white/70 text-xs">For offline emergencies</p>
              </div>
              <QrCode className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Status Overview */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Health Status</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {healthMetrics.map((metric, index) => (
            <Card key={index} className="card-shadow">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">{metric.label}</p>
                  <p className="font-semibold text-sm text-gray-900">{metric.value}</p>
                  <Badge 
                    variant={['active', 'completed', 'good'].includes(metric.status) ? 'default' : 'secondary'}
                    className="mt-2 text-xs"
                  >
                    {metric.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="card-shadow mb-6">
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Health checkup completed</p>
                <p className="text-xs text-gray-600">Dec 15, 2024 - All results normal</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Earned 50 care credits</p>
                <p className="text-xs text-gray-600">Dec 10, 2024 - Safety training completion</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="card-shadow hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(action.path)}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                  <action.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">{action.title}</h3>
                <p className="text-xs text-gray-600">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Contact */}
        <Card className="card-shadow bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="font-semibold text-red-900 mb-2">Emergency Contact</h3>
              <p className="text-sm text-red-700 mb-3">24/7 Health Support Hotline</p>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Call Emergency Line
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
