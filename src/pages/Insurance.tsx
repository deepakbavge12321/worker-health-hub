
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Star, Gift, TrendingDown, Award } from "lucide-react";

const Insurance = () => {
  const insuranceData = {
    currentPremium: 185,
    originalPremium: 220,
    savings: 35,
    healthScore: 92,
    discountPercentage: 16
  };

  const careCredits = {
    current: 450,
    earned: 150,
    redeemed: 100,
    tier: "Gold"
  };

  const healthBehaviors = [
    { behavior: "Regular Health Checkups", impact: "15% discount", status: "active" },
    { behavior: "Safety Training Completion", impact: "10% discount", status: "active" },
    { behavior: "No Workplace Incidents", impact: "8% discount", status: "active" },
    { behavior: "Preventive Care Participation", impact: "5% discount", status: "pending" }
  ];

  const redeemableServices = [
    {
      id: 1,
      name: "Healthy Meal Plan",
      credits: 100,
      description: "1-month nutritious meal subscription",
      category: "Nutrition"
    },
    {
      id: 2,
      name: "Pharmacy Discount",
      credits: 50,
      description: "25% off prescription medicines",
      category: "Medical"
    },
    {
      id: 3,
      name: "Transport Voucher",
      credits: 75,
      description: "Free medical appointment transportation",
      category: "Transportation"
    },
    {
      id: 4,
      name: "Wellness Check",
      credits: 200,
      description: "Comprehensive health assessment",
      category: "Medical"
    },
    {
      id: 5,
      name: "Gym Membership",
      credits: 300,
      description: "3-month fitness center access",
      category: "Fitness"
    }
  ];

  const recentActivity = [
    { action: "Earned 25 credits", description: "Weekly safety training completed", date: "Dec 18" },
    { action: "Redeemed 50 credits", description: "Pharmacy discount used", date: "Dec 15" },
    { action: "Earned 30 credits", description: "Health checkup attended", date: "Dec 10" }
  ];

  return (
    <div className="mobile-container bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">Insurance & Rewards</h1>
        <p className="text-sm text-gray-600">Smart premiums based on healthy living</p>
      </div>

      <div className="px-6 py-6">
        <Tabs defaultValue="insurance" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="rewards">Care Credits</TabsTrigger>
          </TabsList>

          <TabsContent value="insurance" className="space-y-6">
            {/* Current Premium Card */}
            <Card className="card-shadow bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Your Insurance Premium
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">${insuranceData.currentPremium}</p>
                    <p className="text-sm text-gray-600">Current Monthly Premium</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">${insuranceData.savings}</p>
                    <p className="text-sm text-gray-600">Monthly Savings</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Health Score Impact</p>
                    <p className="text-xs text-gray-600">Score: {insuranceData.healthScore}/100</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    {insuranceData.discountPercentage}% discount
                  </Badge>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Health Score Progress</span>
                    <span>{insuranceData.healthScore}/100</span>
                  </div>
                  <Progress value={insuranceData.healthScore} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Health Behaviors Impact */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-base">Premium Factors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {healthBehaviors.map((behavior, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{behavior.behavior}</p>
                      <p className="text-xs text-gray-600">{behavior.impact}</p>
                    </div>
                    <Badge 
                      variant={behavior.status === 'active' ? 'default' : 'secondary'}
                      className={behavior.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {behavior.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Premium History */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-base">Premium Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">December 2024</span>
                    <span className="font-medium">${insuranceData.currentPremium}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">November 2024</span>
                    <span className="font-medium">$195</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">October 2024</span>
                    <span className="font-medium">$210</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Original Rate</span>
                    <span className="font-medium text-gray-500 line-through">${insuranceData.originalPremium}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            {/* Care Credits Overview */}
            <Card className="card-shadow bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Star className="w-5 h-5 mr-2 text-yellow-600" />
                  Care Credits Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-gray-900">{careCredits.current}</p>
                  <p className="text-sm text-gray-600">Available Credits</p>
                  <Badge className="mt-2 bg-yellow-100 text-yellow-800">
                    <Award className="w-3 h-3 mr-1" />
                    {careCredits.tier} Member
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-lg font-semibold text-green-600">+{careCredits.earned}</p>
                    <p className="text-xs text-gray-600">This Month</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-lg font-semibold text-blue-600">{careCredits.redeemed}</p>
                    <p className="text-xs text-gray-600">Redeemed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Redeem Services */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <Gift className="w-4 h-4 mr-2" />
                  Redeem Credits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {redeemableServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{service.name}</h3>
                      <p className="text-xs text-gray-600 mb-1">{service.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {service.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{service.credits} credits</p>
                      <Button 
                        size="sm" 
                        disabled={careCredits.current < service.credits}
                        className="mt-1"
                      >
                        Redeem
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-base">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.description}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.date}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Insurance;
