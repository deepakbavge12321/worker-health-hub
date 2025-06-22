
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Globe, 
  TrendingUp, 
  BarChart3, 
  Users,
  Building2,
  Calendar,
  Settings,
  Shield,
  Eye,
  Database,
  AlertCircle,
  CheckCircle,
  Activity
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const SESIDashboard = () => {
  const [selectedState, setSelectedState] = useState("all");
  const [selectedMetric, setSelectedMetric] = useState("health-score");

  // Mock data for national analytics
  const stateHealthData = [
    { state: "SP", score: 78, companies: 245, employees: 15420, engagement: 82 },
    { state: "RJ", score: 74, companies: 189, employees: 12340, engagement: 79 },
    { state: "MG", score: 81, companies: 156, employees: 9870, engagement: 85 },
    { state: "RS", score: 76, companies: 132, employees: 8650, engagement: 77 },
    { state: "PR", score: 79, companies: 98, employees: 6420, engagement: 80 }
  ];

  const ageGroupTrends = [
    { age: "18-25", diabetes: 2.1, hypertension: 8.5, participation: 89 },
    { age: "26-35", diabetes: 4.8, hypertension: 15.2, participation: 85 },
    { age: "36-45", diabetes: 9.2, hypertension: 28.4, participation: 82 },
    { age: "46-55", diabetes: 15.6, hypertension: 42.1, participation: 78 },
    { age: "56+", diabetes: 24.3, hypertension: 58.9, participation: 74 }
  ];

  const companyMetrics = [
    { company: "ABC Industries", employees: 2340, score: 85, risk: "low", region: "Southeast" },
    { company: "XYZ Manufacturing", employees: 1890, score: 72, risk: "medium", region: "South" },
    { company: "Tech Solutions", employees: 856, score: 91, risk: "low", region: "Southeast" },
    { company: "Metal Works", employees: 1240, score: 68, risk: "high", region: "Northeast" },
    { company: "Green Energy", employees: 745, score: 88, risk: "low", region: "South" }
  ];

  const nationalKPIs = [
    { metric: "Overall Health Score", value: 76.8, trend: "+2.3%", status: "improving" },
    { metric: "Program Participation", value: 81.2, trend: "+5.1%", status: "improving" },
    { metric: "Risk Reduction", value: 18.5, trend: "+12.8%", status: "improving" },
    { metric: "Care Accessibility", value: 73.4, trend: "-1.2%", status: "declining" }
  ];

  const chronicallyIllTrends = [
    { month: "Jan", diabetes: 12.4, hypertension: 28.9, obesity: 31.2 },
    { month: "Feb", diabetes: 12.1, hypertension: 28.5, obesity: 30.8 },
    { month: "Mar", diabetes: 11.8, hypertension: 28.1, obesity: 30.3 },
    { month: "Apr", diabetes: 11.6, hypertension: 27.8, obesity: 29.9 },
    { month: "May", diabetes: 11.3, hypertension: 27.4, obesity: 29.5 },
    { month: "Jun", diabetes: 11.0, hypertension: 27.1, obesity: 29.1 }
  ];

  // Chart configurations
  const ageGroupChartConfig = {
    diabetes: { label: "Diabetes %", color: "#ef4444" },
    hypertension: { label: "Hypertension %", color: "#f59e0b" },
    participation: { label: "Participation %", color: "#22c55e" }
  };

  const chronicDiseaseChartConfig = {
    diabetes: { label: "Diabetes %", color: "#ef4444" },
    hypertension: { label: "Hypertension %", color: "#f59e0b" },
    obesity: { label: "Obesity %", color: "#8b5cf6" }
  };

  return (
    <div className="mobile-container bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">SESI National Dashboard</h1>
            <p className="text-sm text-gray-600">Alphaville Intelligence Platform • National Health Analytics</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Admin
            </Button>
            <Badge variant="secondary">Live Data</Badge>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* National KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {nationalKPIs.map((kpi) => (
            <Card key={kpi.metric} className="card-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-2xl font-bold text-gray-900">{kpi.value}%</p>
                    <p className="text-xs text-gray-600">{kpi.metric}</p>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs font-medium ${
                        kpi.status === 'improving' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {kpi.trend}
                      </span>
                    </div>
                  </div>
                  <div className={`w-2 h-8 rounded-full ${
                    kpi.status === 'improving' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="states" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="states">States</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="predictive">Predictive</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
          </TabsList>

          <TabsContent value="states" className="space-y-6">
            {/* State Selection */}
            <Card className="card-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    State-wise Health Analytics
                  </CardTitle>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                      <SelectItem value="PR">Paraná</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stateHealthData.map((state) => (
                    <div key={state.state} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{state.state}</h3>
                          <p className="text-sm text-gray-600">
                            {state.companies} companies • {state.employees.toLocaleString()} employees
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{state.score}/100</p>
                          <p className="text-sm text-gray-600">{state.engagement}% engagement</p>
                        </div>
                      </div>
                      <Progress value={state.score} className="w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            {/* Company Performance */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Company Health Status & Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {companyMetrics.map((company) => (
                  <div key={company.company} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{company.company}</h3>
                        <p className="text-sm text-gray-600">
                          {company.region} • {company.employees.toLocaleString()} employees
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            company.risk === 'low' ? 'secondary' : 
                            company.risk === 'medium' ? 'outline' : 'destructive'
                          }
                        >
                          {company.risk} risk
                        </Badge>
                        <span className="text-lg font-bold">{company.score}/100</span>
                      </div>
                    </div>
                    <Progress value={company.score} className="w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            {/* Age-wise Health Trends */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Age-wise Health Trends & Chronic Diseases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={ageGroupChartConfig} className="h-64 mb-6">
                  <BarChart data={ageGroupTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="diabetes" fill="#ef4444" name="Diabetes %" />
                    <Bar dataKey="hypertension" fill="#f59e0b" name="Hypertension %" />
                    <Bar dataKey="participation" fill="#22c55e" name="Participation %" />
                  </BarChart>
                </ChartContainer>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="w-4 h-4 bg-red-500 rounded mx-auto mb-2" />
                    <p className="text-sm font-medium">Diabetes Prevalence</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="w-4 h-4 bg-orange-500 rounded mx-auto mb-2" />
                    <p className="text-sm font-medium">Hypertension Cases</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="w-4 h-4 bg-green-500 rounded mx-auto mb-2" />
                    <p className="text-sm font-medium">Program Participation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chronic Disease Trends */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Chronic Disease Trends (6-Month)</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chronicDiseaseChartConfig} className="h-64">
                  <LineChart data={chronicallyIllTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="diabetes" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="Diabetes %"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hypertension" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      name="Hypertension %"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="obesity" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      name="Obesity %"
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictive" className="space-y-6">
            {/* Predictive Analytics */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Alphaville Intelligence Platform - Predictive KPIs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-blue-900">Risk Prediction Accuracy</h3>
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-blue-900">94.2%</p>
                    <p className="text-sm text-blue-700">AI model performance</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-green-900">Early Intervention Success</h3>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-green-900">78.6%</p>
                    <p className="text-sm text-green-700">Prevention effectiveness</p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-purple-900">Population Health Forecast</h3>
                      <Activity className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-purple-900">+2.8%</p>
                    <p className="text-sm text-purple-700">Projected improvement</p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-orange-900">Cost Avoidance</h3>
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                    </div>
                    <p className="text-2xl font-bold text-orange-900">R$ 12.4M</p>
                    <p className="text-sm text-orange-700">Annual savings projection</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            {/* Data Governance & Compliance */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Data Governance & Compliance Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Program Management</h3>
                      <p className="text-sm text-gray-600">Configure national health programs and policies</p>
                    </div>
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Data Privacy Controls</h3>
                      <p className="text-sm text-gray-600">LGPD compliance and data protection settings</p>
                    </div>
                    <Button variant="outline">
                      <Shield className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Audit & Monitoring</h3>
                      <p className="text-sm text-gray-600">System access logs and compliance reporting</p>
                    </div>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Logs
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Database Administration</h3>
                      <p className="text-sm text-gray-600">Manage data sources and integration pipelines</p>
                    </div>
                    <Button variant="outline">
                      <Database className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Status */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">LGPD Compliance</span>
                    <Badge variant="secondary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Compliant
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Retention Policy</span>
                    <Badge variant="secondary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security Audit</span>
                    <Badge variant="outline">
                      <Calendar className="w-3 h-3 mr-1" />
                      Due Next Month
                    </Badge>
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

export default SESIDashboard;
