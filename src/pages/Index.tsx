
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import IssuesList from '../components/IssuesList';
import ReportForm from '../components/ReportForm';
import MapButton from '../components/MapButton';
import { mockIssues } from '../utils/mockData';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  // Display only the most recent 3 issues for homepage
  const recentIssues = mockIssues
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-fixit-primary to-fixit-secondary text-white py-16">
        <div className="fixit-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Report, Track, Resolve Community Issues
              </h1>
              <p className="text-xl mb-8 opacity-90">
                FixIt connects citizens and authorities on a single platform to address and solve community problems faster.
              </p>
              <div className="flex flex-wrap gap-4">
                {isAuthenticated ? (
                  <>
                    <ReportForm onSubmit={(data) => console.log('Report issue:', data)} />
                    <Link to="/dashboard">
                      <Button variant="outline" className="bg-white text-fixit-primary hover:bg-gray-100">
                        View Dashboard
                      </Button>
                    </Link>
                    <MapButton />
                  </>
                ) : (
                  <>
                    <Link to="/signup">
                      <Button className="bg-white text-fixit-primary hover:bg-gray-100">
                        Sign Up Now
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" className="border-white text-white hover:bg-white/10">
                        Log In
                      </Button>
                    </Link>
                    <MapButton />
                  </>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1523841589119-b55aee41b1b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
                alt="Community issues" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="fixit-container">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-fixit-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fixit-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Report an Issue</h3>
              <p className="text-gray-600">
                Spot a problem in your community? Report it with details and photos in just a few clicks.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-fixit-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fixit-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Follow updates as authorities acknowledge and address the reported issues.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-fixit-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fixit-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Collaboration</h3>
              <p className="text-gray-600">
                Upvote issues, leave comments, and work together to improve your neighborhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Issues Section */}
      <section className="py-16">
        <div className="fixit-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Recent Issues</h2>
            <div className="flex gap-4">
              <Link to="/dashboard" className="text-fixit-primary hover:text-fixit-secondary">
                View all issues →
              </Link>
              <Link to="/india-map" className="text-fixit-primary hover:text-fixit-secondary">
                View India Map →
              </Link>
            </div>
          </div>
          
          <IssuesList issues={recentIssues} showFilters={false} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="fixit-container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to improve your community?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join FixIt today and be part of the solution. Report issues, track their progress, and collaborate with your community.
          </p>
          <div className="flex justify-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/signup">
                  <Button className="bg-fixit-primary hover:bg-fixit-secondary text-white px-6 py-3">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="border-fixit-primary text-fixit-primary hover:bg-fixit-primary-light px-6 py-3">
                    Log In
                  </Button>
                </Link>
              </>
            ) : (
              <ReportForm onSubmit={(data) => console.log('Report issue:', data)} />
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="fixit-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FixIt</h3>
              <p className="text-gray-400">
                Connecting citizens and authorities to create better communities.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/dashboard" className="text-gray-400 hover:text-white">Dashboard</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
                <li><Link to="/signup" className="text-gray-400 hover:text-white">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">
                Have questions or feedback?<br />
                Email us at info@fixitapp.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© 2025 FixIt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
