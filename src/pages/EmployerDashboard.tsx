
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  FileText,
  Download,
  Eye,
  Shield,
  Building,
  Activity,
  DollarSign
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const EmployerDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Mock data for charts
  const absenteeismData = [
    { month: "Jan", rate: 4.2, previous: 5.1 },
    { month: "Feb", rate: 3.8, previous: 4.9 },
    { month: "Mar", rate: 3.5, previous: 4.7 },
    { month: "Apr", rate: 2.9, previous: 4.2 },
    { month: "May", rate: 3.1, previous: 4.0 },
    { month: "Jun", rate: 2.7, previous: 3.8 }
  ];

  const departmentHealth = [
    { department: "Manufacturing", score: 78, employees: 150, risk: "medium" },
    { department: "Administration", score: 85, employees: 45, risk: "low" },
    { department: "Logistics", score: 72, employees: 89, risk: "high" },
    { department: "Quality Control", score: 81, employees: 32, risk: "low" },
    { department: "Maintenance", score: 69, employees: 28, risk: "high" }
  ];

  const riskDistribution = [
    { name: "Low Risk", value: 62, color: "#22c55e" },
    { name: "Medium Risk", value: 28, color: "#f59e0b" },
    { name: "High Risk", value: 10, color: "#ef4444" }
  ];

  const careCreditsData = [
    { month: "Jan", used: 1250, allocated: 2000 },
    { month: "Feb", used: 1380, allocated: 2000 },
    { month: "Mar", used: 1560, allocated: 2000 },
    { month: "Apr", used: 1890, allocated: 2000 },
    { month: "May", used: 1650, allocated: 2000 },
    { month: "Jun", used: 1720, allocated: 2000 }
  ];

  const handleExportReport = (type: string) => {
    console.log(`Exporting ${type} report...`);
    // Implementation for report export
  };

  return (
    <div className="mobile-container bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Employer Dashboard</h1>
            <p className="text-sm text-gray-600">Employee health insights & workforce analytics</p>
          </div>
          <Button onClick={() => handleExportReport('comprehensive')}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Key Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-2xl font-bold text-gray-900">344</p>
                  <p className="text-xs text-gray-600">Total Employees</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Activity className="w-8 h-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-2xl font-bold text-gray-900">82%</p>
                  <p className="text-xs text-gray-600">Health Participation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <div className="ml-3">
                  <p className="text-2xl font-bold text-gray-900">2.7%</p>
                  <p className="text-xs text-gray-600">Absenteeism Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-2xl font-bold text-gray-900">86%</p>
                  <p className="text-xs text-gray-600">Care Credits Usage</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="absenteeism">Absenteeism</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Risk Distribution */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Employee Risk Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                  {riskDistribution.map((item) => (
                    <div key={item.name} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Care Credits Usage */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Care Credits Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={careCreditsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="used" fill="#3b82f6" name="Used" />
                      <Bar dataKey="allocated" fill="#e5e7eb" name="Allocated" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="absenteeism" className="space-y-6">
            {/* Real-time Absenteeism Tracking */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Absenteeism Trends
                  </span>
                  <Badge variant="secondary">Real-time</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={absenteeismData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="rate" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Current Year"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="previous" 
                        stroke="#94a3b8" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Previous Year"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* High Risk Alerts */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                  Risk Flags & Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium text-red-800">High Absenteeism - Logistics</p>
                    <p className="text-sm text-red-600">5.2% above normal threshold</p>
                  </div>
                  <Badge variant="destructive">High</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <p className="font-medium text-yellow-800">Wellness Engagement Drop</p>
                    <p className="text-sm text-yellow-600">Manufacturing department</p>
                  </div>
                  <Badge variant="secondary">Medium</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            {/* Department Health Scores */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Department Health Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {departmentHealth.map((dept) => (
                  <div key={dept.department} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{dept.department}</h3>
                      <Badge 
                        variant={dept.risk === 'low' ? 'secondary' : dept.risk === 'medium' ? 'outline' : 'destructive'}
                      >
                        {dept.risk} risk
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{dept.employees} employees</span>
                      <span className="text-sm font-medium">{dept.score}/100</span>
                    </div>
                    <Progress value={dept.score} className="w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {/* Export Reports */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Export Reports & Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">HR Analytics Report</h3>
                      <p className="text-sm text-gray-600">Comprehensive workforce health metrics</p>
                    </div>
                    <Button variant="outline" onClick={() => handleExportReport('hr')}>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Safety Planning Report</h3>
                      <p className="text-sm text-gray-600">Risk assessment and safety recommendations</p>
                    </div>
                    <Button variant="outline" onClick={() => handleExportReport('safety')}>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Insurance Engagement</h3>
                      <p className="text-sm text-gray-600">Claims, utilization and engagement metrics</p>
                    </div>
                    <Button variant="outline" onClick={() => handleExportReport('insurance')}>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployerDashboard;
