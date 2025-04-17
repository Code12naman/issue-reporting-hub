
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import IssuesList from '../components/IssuesList';
import AuthorityDashboard from '../components/AuthorityDashboard';
import ReportForm from '../components/ReportForm';
import { getIssues } from '../utils/mockData';

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
              <h1 className="text-2xl font-bold text-gray-900">
                {isAuthority() ? 'Authority Dashboard' : 'My Dashboard'}
              </h1>
              <p className="text-gray-600 mt-1">
                {isAuthority() 
                  ? 'Manage and respond to community issues' 
                  : 'Track and report community issues'}
              </p>
            </div>
            
            {!isAuthority() && (
              <div className="mt-4 md:mt-0">
                <ReportForm onSubmit={handleReportSubmit} />
              </div>
            )}
          </div>
          
          {isAuthority() ? (
            <AuthorityDashboard issues={issues} />
          ) : (
            <IssuesList issues={issues} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
