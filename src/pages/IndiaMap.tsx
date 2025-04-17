
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Map from '../components/Map';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapIcon, 
  MapPinIcon, 
  InfoIcon, 
  GlobeIcon, 
  UsersIcon, 
  HeartIcon, 
  CalendarIcon, 
  LandmarkIcon,
  BuildingIcon,
  HomeIcon,
  HelpCircleIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Demo data for state population chart
const statePopulationData = [
  { name: 'Uttar Pradesh', population: 237 },
  { name: 'Maharashtra', population: 123 },
  { name: 'Bihar', population: 120 },
  { name: 'West Bengal', population: 99 },
  { name: 'Madhya Pradesh', population: 84 },
  { name: 'Tamil Nadu', population: 77 },
  { name: 'Rajasthan', population: 76 },
  { name: 'Karnataka', population: 65 },
  { name: 'Gujarat', population: 63 },
  { name: 'Andhra Pradesh', population: 52 },
];

// Demo data for issues by state
const issuesByStateData = [
  { name: 'Maharashtra', issues: 245 },
  { name: 'Delhi', issues: 210 },
  { name: 'Karnataka', issues: 180 },
  { name: 'Tamil Nadu', issues: 165 },
  { name: 'West Bengal', issues: 140 },
  { name: 'Gujarat', issues: 125 },
  { name: 'Telangana', issues: 110 },
  { name: 'Uttar Pradesh', issues: 95 },
  { name: 'Kerala', issues: 85 },
  { name: 'Rajasthan', issues: 70 },
];

const IndiaMap = () => {
  const [activeTab, setActiveTab] = useState<string>("map");

  const indiaFacts = [
    {
      title: "Geography",
      icon: GlobeIcon,
      facts: [
        "India is the seventh-largest country in the world",
        "Total area: 3.287 million km²",
        "Bordered by the Indian Ocean, Arabian Sea, and Bay of Bengal",
        "Shares land borders with Pakistan, China, Nepal, Bhutan, Bangladesh and Myanmar",
        "Home to the Himalayan mountain range in the north",
        "Has diverse geographical features including deserts, plains, plateaus and coastal areas"
      ]
    },
    {
      title: "Demographics",
      icon: UsersIcon,
      facts: [
        "Population: Over 1.4 billion people (2nd most populous)",
        "Population density: 382 people per square kilometer",
        "22 official languages recognized by the Constitution",
        "Hindi and English are the most widely used for official purposes",
        "Home to all major world religions",
        "Literacy rate: Approximately 74%"
      ]
    },
    {
      title: "Culture",
      icon: HeartIcon,
      facts: [
        "One of the world's oldest civilizations",
        "Birthplace of four major religions: Hinduism, Buddhism, Jainism, and Sikhism",
        "Rich diversity in arts, architecture, music, and cuisine",
        "Famous for its colorful festivals celebrated throughout the year",
        "Home to 40 UNESCO World Heritage Sites",
        "Classical dance forms include Bharatanatyam, Kathak, Kathakali, and more"
      ]
    },
    {
      title: "Governance",
      icon: LandmarkIcon,
      facts: [
        "World's largest democracy",
        "Federal parliamentary democratic republic",
        "28 states and 8 union territories",
        "Bicameral parliamentary legislature (Lok Sabha and Rajya Sabha)",
        "Each state has its own elected government",
        "The President is the constitutional head of state"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="fixit-container py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                <MapIcon className="mr-2 h-6 w-6 text-fixit-primary" />
                India Map & Information
              </h1>
              <p className="text-gray-600">
                Explore the geographical and cultural diversity of India through our interactive map and visualizations
              </p>
            </div>
            <div className="flex space-x-2">
              <Link to="/dashboard">
                <Button variant="outline" className="flex items-center">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="map" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="map" className="flex items-center">
              <MapIcon className="mr-2 h-4 w-4" />
              Map View
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center">
              <InfoIcon className="mr-2 h-4 w-4" />
              About India
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center">
              <BuildingIcon className="mr-2 h-4 w-4" />
              Statistics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Interactive Map of India</CardTitle>
                    <CardDescription>
                      Hover over states to see details or click to view issues in that region
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Map height="h-[600px]" showControls={true} showStateInfo={true} />
                  </CardContent>
                </Card>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Button className="bg-fixit-primary hover:bg-fixit-secondary flex items-center justify-center">
                    <MapPinIcon className="mr-2 h-5 w-5" />
                    View Community Issues Map
                  </Button>
                  <Link to="/dashboard" className="w-full">
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <BuildingIcon className="mr-2 h-5 w-5" />
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>India at a Glance</CardTitle>
                    <Separator className="my-2" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <GlobeIcon className="h-5 w-5 text-fixit-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Capital</h3>
                        <p className="text-sm text-gray-600">New Delhi</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <UsersIcon className="h-5 w-5 text-fixit-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Population</h3>
                        <p className="text-sm text-gray-600">Over 1.4 billion</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <GlobeIcon className="h-5 w-5 text-fixit-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Area</h3>
                        <p className="text-sm text-gray-600">3.287 million km²</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <HeartIcon className="h-5 w-5 text-fixit-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Official Languages</h3>
                        <p className="text-sm text-gray-600">22 scheduled languages</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <LandmarkIcon className="h-5 w-5 text-fixit-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Government</h3>
                        <p className="text-sm text-gray-600">Federal parliamentary constitutional republic</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Top Reported Issues by Category</CardTitle>
                    <CardDescription>Most common issues reported on FixIt</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Roads</span>
                        <span className="text-sm text-gray-500">42%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-fixit-primary h-2.5 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Sanitation</span>
                        <span className="text-sm text-gray-500">28%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-fixit-primary h-2.5 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Water Supply</span>
                        <span className="text-sm text-gray-500">15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-fixit-primary h-2.5 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Electricity</span>
                        <span className="text-sm text-gray-500">10%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-fixit-primary h-2.5 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Others</span>
                        <span className="text-sm text-gray-500">5%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-fixit-primary h-2.5 rounded-full" style={{ width: '5%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {indiaFacts.map((section, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="flex items-center">
                      {section.icon && <section.icon className="mr-2 h-5 w-5 text-fixit-primary" />}
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-2">
                      {section.facts.map((fact, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-fixit-primary mr-2 mt-1">•</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>States and Union Territories</CardTitle>
                  <CardDescription>India comprises 28 states and 8 union territories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h3 className="font-medium text-sm">Northern India</h3>
                      <ul className="text-sm text-gray-600 mt-1">
                        <li>Jammu & Kashmir (UT)</li>
                        <li>Ladakh (UT)</li>
                        <li>Himachal Pradesh</li>
                        <li>Punjab</li>
                        <li>Uttarakhand</li>
                        <li>Haryana</li>
                        <li>Delhi (NCT)</li>
                        <li>Chandigarh (UT)</li>
                        <li>Uttar Pradesh</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h3 className="font-medium text-sm">Eastern India</h3>
                      <ul className="text-sm text-gray-600 mt-1">
                        <li>Bihar</li>
                        <li>Jharkhand</li>
                        <li>West Bengal</li>
                        <li>Odisha</li>
                        <li>Andaman & Nicobar Islands (UT)</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h3 className="font-medium text-sm">North Eastern India</h3>
                      <ul className="text-sm text-gray-600 mt-1">
                        <li>Sikkim</li>
                        <li>Assam</li>
                        <li>Arunachal Pradesh</li>
                        <li>Nagaland</li>
                        <li>Manipur</li>
                        <li>Mizoram</li>
                        <li>Tripura</li>
                        <li>Meghalaya</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h3 className="font-medium text-sm">Central India</h3>
                      <ul className="text-sm text-gray-600 mt-1">
                        <li>Rajasthan</li>
                        <li>Madhya Pradesh</li>
                        <li>Chhattisgarh</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h3 className="font-medium text-sm">Western India</h3>
                      <ul className="text-sm text-gray-600 mt-1">
                        <li>Gujarat</li>
                        <li>Dadra & Nagar Haveli and Daman & Diu (UT)</li>
                        <li>Maharashtra</li>
                        <li>Goa</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h3 className="font-medium text-sm">Southern India</h3>
                      <ul className="text-sm text-gray-600 mt-1">
                        <li>Karnataka</li>
                        <li>Telangana</li>
                        <li>Andhra Pradesh</li>
                        <li>Tamil Nadu</li>
                        <li>Kerala</li>
                        <li>Puducherry (UT)</li>
                        <li>Lakshadweep (UT)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Population by State</CardTitle>
                  <CardDescription>Top 10 most populated states (in millions)</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={statePopulationData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
                      <Tooltip />
                      <Bar dataKey="population" fill="#3b82f6" name="Population (millions)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Issues Reported by State</CardTitle>
                  <CardDescription>Top 10 states by number of reported issues</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={issuesByStateData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
                      <Tooltip />
                      <Bar dataKey="issues" fill="#f97316" name="Number of Issues" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Key Development Indicators</CardTitle>
                  <CardDescription>National statistics on infrastructure and development</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">97.5%</div>
                      <div className="text-sm text-gray-700">Households with electricity access</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">93.7%</div>
                      <div className="text-sm text-gray-700">Rural households with access to toilets</div>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg text-center">
                      <div className="text-4xl font-bold text-amber-600 mb-2">95.5%</div>
                      <div className="text-sm text-gray-700">Population with access to improved water source</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-4xl font-bold text-purple-600 mb-2">63%</div>
                      <div className="text-sm text-gray-700">Internet penetration rate</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-sm text-gray-600">
                      Note: Data shown is for demonstration purposes. Actual figures may vary.
                      For accurate and up-to-date statistics, please refer to official government sources.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IndiaMap;
