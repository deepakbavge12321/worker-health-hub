
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, User, Search, FileText, Camera, Bell } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");

  const todayAppointments = [
    {
      id: 1,
      patientName: "João Silva",
      patientId: "BR-12345678",
      time: "9:00 AM",
      type: "General Checkup",
      status: "confirmed",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      patientName: "Maria Oliveira",
      patientId: "BR-12345679",
      time: "10:30 AM",
      type: "Follow-up",
      status: "in-progress",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      patientName: "Carlos Santos",
      patientId: "BR-12345680",
      time: "2:00 PM",
      type: "Teleconsultation",
      status: "confirmed",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 4,
      patientName: "Ana Costa",
      patientId: "BR-12345681",
      time: "3:30 PM",
      type: "Occupational Health",
      status: "pending",
      avatar: "/api/placeholder/40/40"
    }
  ];

  const recentConsultations = [
    {
      id: 1,
      patientName: "Pedro Lima",
      patientId: "BR-12345682",
      date: "Dec 18, 2024",
      type: "General Checkup",
      status: "completed"
    },
    {
      id: 2,
      patientName: "Lucia Ferreira",
      patientId: "BR-12345683",
      date: "Dec 17, 2024",
      type: "Teleconsultation",
      status: "completed"
    }
  ];

  const stats = {
    todayAppointments: todayAppointments.length,
    completedToday: 2,
    pendingReports: 3,
    totalPatients: 147
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mobile-container bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="health-gradient text-white px-6 py-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Avatar className="w-16 h-16 border-2 border-white">
              <AvatarImage src={user?.photo} />
              <AvatarFallback className="bg-white text-blue-600 text-lg font-bold">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'DR'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">{user?.name || 'Doctor'}</h1>
              <p className="text-blue-100">Registration: {user?.registrationId || 'CRM-12345'}</p>
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

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-white">{stats.todayAppointments}</p>
              <p className="text-white/80 text-sm">Today's Appointments</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-white">{stats.completedToday}</p>
              <p className="text-white/80 text-sm">Completed Today</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Patient Search */}
        <Card className="card-shadow mb-6">
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Search className="w-4 h-4 mr-2" />
              Patient Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Input
                placeholder="Search by Health ID or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="w-full" disabled={!searchTerm}>
                Search Patient
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
          <div className="space-y-3">
            {todayAppointments.map((appointment) => (
              <Card key={appointment.id} className="card-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={appointment.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {appointment.patientName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                      <p className="text-sm text-gray-600">ID: {appointment.patientId}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center text-xs text-gray-600">
                          <Clock className="w-3 h-3 mr-1" />
                          {appointment.time}
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <Button 
                        size="sm"
                        onClick={() => navigate(`/doctor/consultation/${appointment.patientId}`)}
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        Consult
                      </Button>
                      {appointment.type === 'Teleconsultation' && (
                        <Button size="sm" variant="outline">
                          <Camera className="w-3 h-3 mr-1" />
                          Video
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm text-gray-700">{appointment.type}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Consultations */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Consultations</h2>
          <div className="space-y-3">
            {recentConsultations.map((consultation) => (
              <Card key={consultation.id} className="card-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{consultation.patientName}</h3>
                      <p className="text-sm text-gray-600">ID: {consultation.patientId}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-gray-600">{consultation.date}</span>
                        <Badge className={getStatusColor(consultation.status)}>
                          {consultation.status}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/doctor/consultation/${consultation.patientId}`)}
                    >
                      View Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start">
              <FileText className="w-4 h-4 mr-2" />
              New Report
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            <Button variant="outline" className="justify-start">
              <User className="w-4 h-4 mr-2" />
              Patient List
            </Button>
            <Button variant="outline" className="justify-start">
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;
