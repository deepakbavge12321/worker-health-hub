
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FileText, Camera, Save, User, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DoctorConsultation = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [attachments, setAttachments] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    patientName: "João Silva",
    healthId: patientId || "BR-12345678",
    age: "35",
    consultation_type: "general",
    chief_complaint: "",
    vital_signs: {
      blood_pressure: "",
      heart_rate: "",
      temperature: "",
      weight: "",
      height: ""
    },
    physical_examination: "",
    diagnosis: "",
    treatment_plan: "",
    medications: "",
    recommendations: "",
    follow_up: "",
    notes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const handleSubmit = () => {
    toast({
      title: "Consultation Saved",
      description: "Patient records have been updated successfully.",
    });
    navigate('/doctor-dashboard');
  };

  return (
    <div className="mobile-container bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/api/placeholder/48/48" />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {formData.patientName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{formData.patientName}</h1>
            <p className="text-sm text-gray-600">Health ID: {formData.healthId}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Patient Info */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <User className="w-4 h-4 mr-2" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="consultation_type">Consultation Type</Label>
                <Select 
                  value={formData.consultation_type} 
                  onValueChange={(value) => handleInputChange('consultation_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Checkup</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="occupational">Occupational Health</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chief Complaint */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base">Chief Complaint</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Patient's main concern or reason for visit..."
              value={formData.chief_complaint}
              onChange={(e) => handleInputChange('chief_complaint', e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Vital Signs */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base">Vital Signs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="bp">Blood Pressure</Label>
                <Input
                  id="bp"
                  placeholder="120/80"
                  value={formData.vital_signs.blood_pressure}
                  onChange={(e) => handleInputChange('vital_signs.blood_pressure', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hr">Heart Rate</Label>
                <Input
                  id="hr"
                  placeholder="72 bpm"
                  value={formData.vital_signs.heart_rate}
                  onChange={(e) => handleInputChange('vital_signs.heart_rate', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="temp">Temperature</Label>
                <Input
                  id="temp"
                  placeholder="36.5°C"
                  value={formData.vital_signs.temperature}
                  onChange={(e) => handleInputChange('vital_signs.temperature', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  placeholder="70 kg"
                  value={formData.vital_signs.weight}
                  onChange={(e) => handleInputChange('vital_signs.weight', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  placeholder="175 cm"
                  value={formData.vital_signs.height}
                  onChange={(e) => handleInputChange('vital_signs.height', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Physical Examination */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base">Physical Examination</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Findings from physical examination..."
              value={formData.physical_examination}
              onChange={(e) => handleInputChange('physical_examination', e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Diagnosis */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base">Diagnosis</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Primary and secondary diagnoses..."
              value={formData.diagnosis}
              onChange={(e) => handleInputChange('diagnosis', e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Treatment Plan */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base">Treatment Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="medications">Medications/Prescriptions</Label>
              <Textarea
                id="medications"
                placeholder="List medications, dosages, and instructions..."
                value={formData.medications}
                onChange={(e) => handleInputChange('medications', e.target.value)}
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="recommendations">Recommendations</Label>
              <Textarea
                id="recommendations"
                placeholder="Lifestyle recommendations, precautions, etc..."
                value={formData.recommendations}
                onChange={(e) => handleInputChange('recommendations', e.target.value)}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Follow-up */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Follow-up
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Next appointment, monitoring requirements, when to return..."
              value={formData.follow_up}
              onChange={(e) => handleInputChange('follow_up', e.target.value)}
              rows={2}
            />
          </CardContent>
        </Card>

        {/* Attachments */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Camera className="w-4 h-4 mr-2" />
              Attachments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <input
                type="file"
                id="file-upload"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('file-upload')?.click()}
                className="w-full"
              >
                <Camera className="w-4 h-4 mr-2" />
                Add Images/Reports
              </Button>
              
              {attachments.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Attached Files:</p>
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{file.name}</span>
                      <Badge variant="secondary">{file.type.includes('image') ? 'Image' : 'Document'}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base">Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Any additional observations or notes..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="pb-6">
          <Button 
            onClick={handleSubmit}
            className="w-full h-12 health-gradient text-lg font-semibold"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Consultation & Update Records
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorConsultation;
