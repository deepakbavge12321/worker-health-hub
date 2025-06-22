
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fingerprint, Shield, User, LogIn } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [activeTab, setActiveTab] = useState("patient");
  const [formData, setFormData] = useState({
    healthId: "",
    registrationId: "",
    pin: "",
    name: ""
  });

  const handleLogin = (userType: 'patient' | 'doctor') => {
    // Mock authentication
    const mockUser = {
      id: "1",
      name: formData.name || (userType === 'patient' ? 'João Silva' : 'Dr. Maria Santos'),
      type: userType,
      healthId: userType === 'patient' ? formData.healthId : undefined,
      registrationId: userType === 'doctor' ? formData.registrationId : undefined,
      photo: userType === 'patient' ? '/api/placeholder/100/100' : '/api/placeholder/100/100'
    };

    setUser(mockUser);
    toast({
      title: "Login Successful",
      description: `Welcome, ${mockUser.name}!`,
    });

    // Navigate based on user type
    navigate(userType === 'patient' ? '/patient-dashboard' : '/doctor-dashboard');
  };

  const handleBiometricLogin = () => {
    toast({
      title: "Biometric Authentication",
      description: "Please use your fingerprint or face recognition",
    });
    // Mock biometric success after 2 seconds
    setTimeout(() => {
      handleLogin(activeTab as 'patient' | 'doctor');
    }, 2000);
  };

  return (
    <div className="mobile-container bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Secure access to your health profile</p>
        </div>

        {/* Login Form */}
        <Card className="w-full max-w-sm card-shadow">
          <CardHeader>
            <CardTitle className="text-center">Choose Account Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="patient" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Patient
                </TabsTrigger>
                <TabsTrigger value="doctor" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Doctor
                </TabsTrigger>
              </TabsList>

              <TabsContent value="patient" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="healthId">Health ID</Label>
                  <Input
                    id="healthId"
                    placeholder="Enter your Health ID"
                    value={formData.healthId}
                    onChange={(e) => setFormData({...formData, healthId: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientName">Full Name</Label>
                  <Input
                    id="patientName"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pin">PIN (Optional)</Label>
                  <Input
                    id="pin"
                    type="password"
                    placeholder="Enter your PIN"
                    value={formData.pin}
                    onChange={(e) => setFormData({...formData, pin: e.target.value})}
                  />
                </div>
              </TabsContent>

              <TabsContent value="doctor" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="registrationId">Registration ID</Label>
                  <Input
                    id="registrationId"
                    placeholder="Enter your Registration ID"
                    value={formData.registrationId}
                    onChange={(e) => setFormData({...formData, registrationId: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctorName">Full Name</Label>
                  <Input
                    id="doctorName"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctorPin">PIN (Optional)</Label>
                  <Input
                    id="doctorPin"
                    type="password"
                    placeholder="Enter your PIN"
                    value={formData.pin}
                    onChange={(e) => setFormData({...formData, pin: e.target.value})}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Login Buttons */}
            <div className="space-y-3 mt-6">
              <Button 
                onClick={() => handleLogin(activeTab as 'patient' | 'doctor')}
                className="w-full health-gradient hover:opacity-90 transition-opacity"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>

              <Button 
                onClick={handleBiometricLogin}
                variant="outline" 
                className="w-full border-blue-200 hover:bg-blue-50"
              >
                <Fingerprint className="w-4 h-4 mr-2" />
                Use Biometric Login
              </Button>
            </div>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-xs text-gray-500">
                Secured with end-to-end encryption
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
