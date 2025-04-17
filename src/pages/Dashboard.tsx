
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import IssuesList from '../components/IssuesList';
import AuthorityDashboard from '../components/AuthorityDashboard';
import ReportForm from '../components/ReportForm';
import DashboardCharts from '../components/DashboardCharts';
import { getIssues } from '../utils/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MapButton from '../components/MapButton';
import { FlagIcon, MapPinIcon, AlertTriangleIcon } from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated, isAuthority } = useAuth();
  const [issues, setIssues] = useState(getIssues());
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Handle new issue report - in a real app, this would make an API call
  const handleReportSubmit = (formData: any) => {
    console.log('New issue reported:', formData);
    // In a real app, we would add the new issue to the list
    // For now, we'll just refresh the issues list
    setIssues(getIssues());
  };

  if (!isAuthenticated || !user) {
    return null; // Redirecting to login, don't render anything
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="fixit-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                {isAuthority() ? (
                  <>
                    <FlagIcon className="mr-2 h-6 w-6 text-orange-500" />
                    Authority Dashboard
                  </>
                ) : (
                  <>
                    <MapPinIcon className="mr-2 h-6 w-6 text-fixit-primary" />
                    Citizen Dashboard
                  </>
                )}
              </h1>
              <p className="text-gray-600 mt-1">
                {isAuthority() 
                  ? 'Manage and respond to community issues across India' 
                  : 'Track and report local issues in your community'}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <MapButton />
              
              {!isAuthority() && (
                <ReportForm onSubmit={handleReportSubmit} />
              )}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-orange-200 mb-6">
            <div className="flex items-start">
              <AlertTriangleIcon className="h-5 w-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Important Notice</h3>
                <p className="text-sm text-gray-600">
                  The Swachh Bharat Mission encourages citizens to report cleanliness issues. Your participation helps keep our communities clean and beautiful!
                </p>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="issues" className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="issues">Issues List</TabsTrigger>
              <TabsTrigger value="analytics">Analytics & Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="issues">
              {isAuthority() ? (
                <AuthorityDashboard issues={issues} />
              ) : (
                <IssuesList issues={issues} />
              )}
            </TabsContent>
            
            <TabsContent value="analytics">
              <DashboardCharts />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
