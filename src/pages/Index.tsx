
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, User, FileText, Bell } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
        {/* App Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HealthID</h1>
          <p className="text-gray-600 text-lg">Digital Health for Industrial Workers</p>
        </div>

        {/* Feature Cards */}
        <div className="w-full max-w-sm space-y-4 mb-8">
          <Card className="p-4 card-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure Access</h3>
                <p className="text-sm text-gray-600">Biometric authentication</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 card-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Health Records</h3>
                <p className="text-sm text-gray-600">Portable & secure</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 card-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Smart Alerts</h3>
                <p className="text-sm text-gray-600">Proactive health care</p>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={() => navigate('/login')}
          className="w-full max-w-sm h-12 text-lg font-semibold health-gradient hover:opacity-90 transition-opacity"
        >
          Get Started
        </Button>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Secure • Compliant • Trusted
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
