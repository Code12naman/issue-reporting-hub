
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import IssueDetail from '../components/IssueDetail';
import { getIssueById } from '../utils/mockData';
import { Button } from '@/components/ui/button';

const IssueView = () => {
  const { issueId } = useParams<{ issueId: string }>();
  const [issue, setIssue] = useState(issueId ? getIssueById(issueId) : undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (issueId) {
      const fetchedIssue = getIssueById(issueId);
      setIssue(fetchedIssue);
      
      if (!fetchedIssue) {
        // Issue not found, could redirect to 404 or dashboard
        console.error(`Issue with ID ${issueId} not found`);
      }
    }
  }, [issueId]);

  if (!issue) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Issue Not Found</h2>
          <p className="text-gray-600 mb-8">The issue you're looking for doesn't exist or has been removed.</p>
          <Button 
            className="bg-fixit-primary hover:bg-fixit-secondary"
            onClick={() => navigate('/dashboard')}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="fixit-container">
          <div className="mb-6">
            <Link 
              to="/dashboard" 
              className="inline-flex items-center text-fixit-primary hover:text-fixit-secondary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
          
          <IssueDetail issue={issue} />
        </div>
      </main>
    </div>
  );
};

export default IssueView;
