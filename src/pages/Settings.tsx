
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Bell, 
  Globe, 
  User, 
  FileText, 
  LogOut, 
  Lock,
  Eye,
  Database,
  Download,
  Trash2
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [language, setLanguage] = useState("english");
  const [notifications, setNotifications] = useState({
    healthReminders: true,
    appointmentAlerts: true,
    safetyAlerts: true,
    insuranceUpdates: false,
    marketingCommunications: false
  });
  
  const [privacy, setPrivacy] = useState({
    shareHealthData: true,
    allowResearch: false,
    biometricAuth: true,
    locationTracking: false
  });

  const handleLogout = () => {
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been securely logged out.",
    });
    navigate('/');
  };

  const handleDataExport = () => {
    toast({
      title: "Data Export Requested",
      description: "Your data export will be ready within 48 hours. You'll receive an email notification.",
    });
  };

  const handleDataDeletion = () => {
    toast({
      title: "Data Deletion Requested",
      description: "Your request has been submitted. Account deletion will be processed within 30 days as per LGPD requirements.",
      variant: "destructive"
    });
  };

  const languages = [
    { value: "english", label: "English", flag: "🇺🇸" },
    { value: "portuguese", label: "Português", flag: "🇧🇷" },
    { value: "spanish", label: "Español", flag: "🇪🇸" }
  ];

  // If user is not logged in, redirect to login
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="mobile-container bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-600">Privacy, preferences & account management</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Profile Section */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <User className="w-4 h-4 mr-2" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">
                  {user.type === 'patient' ? `Health ID: ${user.healthId}` : `Registration: ${user.registrationId}`}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Language & Localization */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Language & Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      <span className="flex items-center">
                        <span className="mr-2">{lang.flag}</span>
                        {lang.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Health Reminders</p>
                  <p className="text-sm text-gray-600">Vaccination, checkup alerts</p>
                </div>
                <Switch
                  checked={notifications.healthReminders}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, healthReminders: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Appointment Alerts</p>
                  <p className="text-sm text-gray-600">Upcoming consultation reminders</p>
                </div>
                <Switch
                  checked={notifications.appointmentAlerts}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, appointmentAlerts: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Safety Alerts</p>
                  <p className="text-sm text-gray-600">Workplace safety notifications</p>
                </div>
                <Switch
                  checked={notifications.safetyAlerts}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, safetyAlerts: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Insurance Updates</p>
                  <p className="text-sm text-gray-600">Premium changes, benefits info</p>
                </div>
                <Switch
                  checked={notifications.insuranceUpdates}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, insuranceUpdates: checked }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Data Controls (LGPD Compliance) */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Privacy & Data Protection
            </CardTitle>
            <p className="text-xs text-gray-600 mt-1">
              Your rights under LGPD (Lei Geral de Proteção de Dados)
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Biometric Authentication</p>
                  <p className="text-sm text-gray-600">Fingerprint/face recognition</p>
                </div>
                <Switch
                  checked={privacy.biometricAuth}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, biometricAuth: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Share Health Data</p>
                  <p className="text-sm text-gray-600">With healthcare providers</p>
                </div>
                <Switch
                  checked={privacy.shareHealthData}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, shareHealthData: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Research Participation</p>
                  <p className="text-sm text-gray-600">Anonymous health research</p>
                </div>
                <Switch
                  checked={privacy.allowResearch}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, allowResearch: checked }))
                  }
                />
              </div>
            </div>

            <Separator />

            {/* LGPD Rights */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Your Data Rights</h4>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/privacy-policy')}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Privacy Policy
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleDataExport}
              >
                <Download className="w-4 h-4 mr-2" />
                Download My Data (LGPD Article 15)
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-600 hover:text-red-700"
                onClick={handleDataDeletion}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Request Data Deletion (LGPD Article 18)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Lock className="w-4 h-4 mr-2" />
              Change PIN
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Security Activity
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Database className="w-4 h-4 mr-2" />
              Connected Devices
            </Button>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base">Help & Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Help Center
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Contact Support
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Terms of Service
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="card-shadow">
          <CardContent className="p-4">
            <Button 
              onClick={handleLogout}
              variant="destructive" 
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center pb-6">
          <p className="text-xs text-gray-500">
            HealthID v1.0.0 • Secure • LGPD Compliant
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
