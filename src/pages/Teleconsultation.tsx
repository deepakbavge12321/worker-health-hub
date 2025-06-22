
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Camera, Clock, User, Plus } from "lucide-react";

const Teleconsultation = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const availableDoctors = [
    {
      id: 1,
      name: "Dr. Maria Santos",
      specialty: "Occupational Medicine",
      rating: 4.9,
      availableToday: true,
      nextSlot: "2:00 PM",
      photo: "/api/placeholder/60/60"
    },
    {
      id: 2,
      name: "Dr. Carlos Lima",
      specialty: "General Practice",
      rating: 4.8,
      availableToday: true,
      nextSlot: "3:30 PM",
      photo: "/api/placeholder/60/60"
    },
    {
      id: 3,
      name: "Dr. Ana Silva",
      specialty: "Internal Medicine",
      rating: 4.7,
      availableToday: false,
      nextSlot: "Tomorrow 9:00 AM",
      photo: "/api/placeholder/60/60"
    }
  ];

  const upcomingConsultations = [
    {
      id: 1,
      doctor: "Dr. Maria Santos",
      date: "Dec 22, 2024",
      time: "2:00 PM",
      type: "Follow-up",
      status: "confirmed"
    }
  ];

  const pastConsultations = [
    {
      id: 1,
      doctor: "Dr. Carlos Lima",
      date: "Dec 15, 2024",
      time: "10:00 AM",
      type: "General Checkup",
      status: "completed",
      notes: "Routine checkup completed. All vitals normal. Continue current medication."
    },
    {
      id: 2,
      doctor: "Dr. Maria Santos",
      date: "Nov 28, 2024",
      time: "3:00 PM",
      type: "Occupational Health",
      status: "completed",
      notes: "Work-related health assessment. Recommended ergonomic improvements."
    }
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  return (
    <div className="mobile-container bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">Teleconsultation</h1>
        <p className="text-sm text-gray-600">Virtual healthcare at your fingertips</p>
      </div>

      <div className="px-6 py-6">
        <Tabs defaultValue="book" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="book">Book</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="book" className="space-y-6">
            {/* Quick Book Emergency */}
            <Card className="card-shadow bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-red-900">Emergency Consultation</h3>
                    <p className="text-sm text-red-700">Available 24/7</p>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Camera className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Available Doctors */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Doctors</h2>
              <div className="space-y-4">
                {availableDoctors.map((doctor) => (
                  <Card key={doctor.id} className="card-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-14 h-14">
                          <AvatarImage src={doctor.photo} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {doctor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              ⭐ {doctor.rating}
                            </Badge>
                            <Badge 
                              variant={doctor.availableToday ? "default" : "secondary"}
                              className={doctor.availableToday ? "bg-green-100 text-green-800" : ""}
                            >
                              {doctor.availableToday ? "Available Today" : "Tomorrow"}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{doctor.nextSlot}</p>
                          <Button size="sm" className="mt-2">
                            Book
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Time Slots for Selected Doctor */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-base">Select Time Slot</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedTimeSlot === slot ? "default" : "outline"}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className="justify-center"
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
                {selectedTimeSlot && (
                  <Button className="w-full mt-4 health-gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    Confirm Appointment - {selectedTimeSlot}
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingConsultations.length > 0 ? (
              upcomingConsultations.map((consultation) => (
                <Card key={consultation.id} className="card-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{consultation.doctor}</h3>
                        <p className="text-sm text-gray-600">{consultation.type}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {consultation.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {consultation.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {consultation.time}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1 health-gradient">
                        <Camera className="w-4 h-4 mr-2" />
                        Join Call
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Reschedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="card-shadow">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">No Upcoming Consultations</h3>
                  <p className="text-sm text-gray-600">Book your next appointment to stay on top of your health</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {pastConsultations.map((consultation) => (
              <Card key={consultation.id} className="card-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{consultation.doctor}</h3>
                      <p className="text-sm text-gray-600">{consultation.type}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {consultation.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {consultation.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {consultation.time}
                    </div>
                  </div>
                  {consultation.notes && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 mb-1">Doctor's Notes:</p>
                      <p className="text-sm text-gray-700">{consultation.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Teleconsultation;
