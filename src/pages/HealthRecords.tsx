
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, FileText, QrCode, Nfc, ArrowDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const HealthRecords = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const medicalHistory = [
    {
      id: 1,
      date: "2024-12-15",
      type: "General Checkup",
      doctor: "Dr. Maria Santos",
      diagnosis: "Routine health assessment - All parameters normal",
      status: "completed",
      attachments: ["blood_test.pdf", "chest_xray.jpg"]
    },
    {
      id: 2,
      date: "2024-11-20",
      type: "Occupational Health",
      doctor: "Dr. Carlos Lima",
      diagnosis: "Hearing test - Within normal limits",
      status: "completed",
      attachments: ["hearing_test.pdf"]
    },
    {
      id: 3,
      date: "2024-10-10",
      type: "Vaccination",
      doctor: "Nurse Ana Paula",
      diagnosis: "Tetanus booster administered",
      status: "completed",
      attachments: ["vaccination_record.pdf"]
    }
  ];

  const diagnosticReports = [
    {
      id: 1,
      name: "Complete Blood Count",
      date: "2024-12-15",
      result: "Normal",
      status: "normal"
    },
    {
      id: 2,
      name: "Chest X-Ray",
      date: "2024-12-15",
      result: "No abnormalities detected",
      status: "normal"
    },
    {
      id: 3,
      name: "Audiometry Test",
      date: "2024-11-20",
      result: "Hearing within normal limits",
      status: "normal"
    },
    {
      id: 4,
      name: "Vision Test",
      date: "2024-09-15",
      result: "Corrective lenses recommended",
      status: "attention"
    }
  ];

  const filteredHistory = medicalHistory.filter(record =>
    record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mobile-container bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Health Records</h1>
            <p className="text-sm text-gray-600">Portable & secure medical history</p>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="flex items-center">
              <QrCode className="w-4 h-4 mr-1" />
              QR
            </Button>
            <Button size="sm" variant="outline" className="flex items-center">
              <NFC className="w-4 h-4 mr-1" />
              NFC
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Offline Access Card */}
        <Card className="card-shadow mb-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Offline Access</h3>
                <p className="text-sm text-gray-600">QR/NFC codes for emergency situations</p>
              </div>
              <div className="flex space-x-2">
                <div className="w-12 h-12 bg-white rounded-lg border-2 border-dashed border-blue-300 flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-blue-600" />
                </div>
                <div className="w-12 h-12 bg-white rounded-lg border-2 border-dashed border-green-300 flex items-center justify-center">
                  <NFC className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Records Tabs */}
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="reports">Diagnostic Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            {filteredHistory.map((record) => (
              <Card key={record.id} className="card-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{record.type}</CardTitle>
                      <p className="text-sm text-gray-600">{record.doctor}</p>
                    </div>
                    <Badge variant="secondary">{record.date}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-800 mb-3">{record.diagnosis}</p>
                  
                  {record.attachments.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-600">Attachments:</p>
                      {record.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-blue-600" />
                            <span className="text-sm">{attachment}</span>
                          </div>
                          <Button size="sm" variant="ghost">
                            <ArrowDown className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            {diagnosticReports.map((report) => (
              <Card key={report.id} className="card-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{report.name}</h3>
                    <Badge 
                      variant={report.status === 'normal' ? 'default' : 'secondary'}
                      className={report.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                    >
                      {report.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{report.date}</p>
                  <p className="text-sm text-gray-800">{report.result}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Export Options */}
        <Card className="card-shadow mt-6">
          <CardHeader>
            <CardTitle className="text-base">Export & Share</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <ArrowDown className="w-4 h-4 mr-2" />
              Download Complete Records (PDF)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Share Selected Records
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <QrCode className="w-4 h-4 mr-2" />
              Generate Emergency QR Code
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthRecords;
