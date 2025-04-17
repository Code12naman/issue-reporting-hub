
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockIssues } from '../utils/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const DashboardCharts = () => {
  // Process data for monthly trend chart
  const getMonthlyData = () => {
    const monthlyIssues = new Array(12).fill(0).map((_, i) => ({
      month: new Date(0, i).toLocaleString('default', { month: 'short' }),
      count: 0
    }));
    
    mockIssues.forEach(issue => {
      const month = new Date(issue.createdAt).getMonth();
      monthlyIssues[month].count += 1;
    });
    
    return monthlyIssues.slice(0, new Date().getMonth() + 1); // Only return months up to current
  };
  
  // Process data for category distribution
  const getCategoryData = () => {
    const categories: Record<string, number> = {};
    
    mockIssues.forEach(issue => {
      if (categories[issue.category]) {
        categories[issue.category] += 1;
      } else {
        categories[issue.category] = 1;
      }
    });
    
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  };
  
  // Process data for status distribution
  const getStatusData = () => {
    const statuses = {
      "open": { name: "Open", value: 0, color: "#F44336" },
      "in-progress": { name: "In Progress", value: 0, color: "#FFC107" },
      "resolved": { name: "Resolved", value: 0, color: "#4CAF50" }
    };
    
    mockIssues.forEach(issue => {
      if (statuses[issue.status as keyof typeof statuses]) {
        statuses[issue.status as keyof typeof statuses].value += 1;
      }
    });
    
    return Object.values(statuses);
  };
  
  // Process top locations
  const getTopLocations = () => {
    const locations: Record<string, number> = {};
    
    mockIssues.forEach(issue => {
      // Extract city/area from location
      const locationParts = issue.location.split(',');
      const mainLocation = locationParts.length > 1 
        ? locationParts[locationParts.length - 2].trim() 
        : issue.location;
      
      if (locations[mainLocation]) {
        locations[mainLocation] += 1;
      } else {
        locations[mainLocation] = 1;
      }
    });
    
    return Object.entries(locations)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));
  };
  
  const monthlyData = getMonthlyData();
  const categoryData = getCategoryData();
  const statusData = getStatusData();
  const topLocations = getTopLocations();
  
  // Colors for the pie charts
  const CATEGORY_COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="charts">Charts & Trends</TabsTrigger>
          <TabsTrigger value="stats">Stats & Metrics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Issue Reports</CardTitle>
                <CardDescription>
                  Number of issues reported each month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        name="Issues" 
                        stroke="#1E88E5" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Issue Categories Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Issue Categories</CardTitle>
                <CardDescription>
                  Distribution of issues by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Issue Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Issue Status</CardTitle>
                <CardDescription>
                  Current status of all reported issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Top Locations */}
            <Card>
              <CardHeader>
                <CardTitle>Top 5 Locations</CardTitle>
                <CardDescription>
                  Areas with most reported issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topLocations}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Issues" fill="#1E88E5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Issues */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mockIssues.length}</div>
                <p className="text-xs text-muted-foreground">
                  +{monthlyData[monthlyData.length - 1]?.count || 0} this month
                </p>
              </CardContent>
            </Card>
            
            {/* Open Issues */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Open Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-fixit-danger">
                  {mockIssues.filter(issue => issue.status === 'open').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Requires attention
                </p>
              </CardContent>
            </Card>
            
            {/* In Progress */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-fixit-warning">
                  {mockIssues.filter(issue => issue.status === 'in-progress').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Being addressed
                </p>
              </CardContent>
            </Card>
            
            {/* Resolved */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-fixit-success">
                  {mockIssues.filter(issue => issue.status === 'resolved').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Successfully completed
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Resolution Rate</CardTitle>
              <CardDescription>Percentage of issues resolved over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyData.map(month => {
                      const totalIssues = mockIssues.filter(
                        issue => new Date(issue.createdAt).toLocaleString('default', { month: 'short' }) === month.month
                      );
                      const resolvedIssues = totalIssues.filter(issue => issue.status === 'resolved');
                      const resolutionRate = totalIssues.length ? (resolvedIssues.length / totalIssues.length) * 100 : 0;
                      
                      return {
                        ...month,
                        resolutionRate: parseFloat(resolutionRate.toFixed(1))
                      };
                    })}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Resolution Rate']} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="resolutionRate" 
                      name="Resolution Rate %" 
                      stroke="#4CAF50" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Response Time</CardTitle>
              <CardDescription>Average time to first response for reported issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { category: "Roads", days: 2.3 },
                      { category: "Garbage", days: 1.5 },
                      { category: "Water Supply", days: 3.2 },
                      { category: "Electricity", days: 1.8 },
                      { category: "Public Safety", days: 1.2 }
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="days" name="Avg. Response Time (Days)" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Resolution Performance</CardTitle>
              <CardDescription>Average days to resolve issues by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { category: "Roads", days: 12.3 },
                      { category: "Garbage", days: 5.5 },
                      { category: "Water Supply", days: 8.2 },
                      { category: "Electricity", days: 4.8 },
                      { category: "Public Safety", days: 7.2 }
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="days" name="Avg. Resolution Time (Days)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardCharts;
