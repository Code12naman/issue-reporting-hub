import { useState } from 'react';
import { Issue, updateIssueStatus, Comment, upvoteIssue } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';
import CommentSection from './CommentSection';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Map from './Map';

interface IssueDetailProps {
  issue: Issue;
}

const IssueDetail = ({ issue: initialIssue }: IssueDetailProps) => {
  const [issue, setIssue] = useState<Issue>(initialIssue);
  const { isAuthority } = useAuth();
  const { toast } = useToast();

  const statusClass = 
    issue.status === 'open' 
      ? 'status-open' 
      : issue.status === 'in-progress' 
        ? 'status-in-progress' 
        : 'status-resolved';
  
  const statusLabel = 
    issue.status === 'open' 
      ? 'Open' 
      : issue.status === 'in-progress' 
        ? 'In Progress' 
        : 'Resolved';

  const handleStatusChange = (newStatus: 'open' | 'in-progress' | 'resolved') => {
    const updatedIssue = updateIssueStatus(issue.id, newStatus);
    if (updatedIssue) {
      setIssue({ ...issue, status: newStatus });
      
      toast({
        title: "Status Updated",
        description: `Issue status has been updated to ${newStatus.replace('-', ' ')}.`,
      });
    }
  };

  const handleUpvote = () => {
    const updatedIssue = upvoteIssue(issue.id);
    if (updatedIssue) {
      setIssue({ ...issue, upvotes: updatedIssue.upvotes });
      
      toast({
        title: "Upvoted",
        description: "You have successfully upvoted this issue.",
      });
    }
  };

  const handleCommentAdded = (newComment: Comment) => {
    setIssue({
      ...issue,
      comments: [...issue.comments, newComment]
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{issue.title}</h2>
                <span className={`${statusClass} ml-3`}>{statusLabel}</span>
              </div>
              <div className="text-sm text-gray-500 mb-4">
                Reported by {issue.reportedByName} on {new Date(issue.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-semibold">{issue.upvotes}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                </svg>
              </div>
              
              {issue.status !== 'resolved' && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-fixit-primary border-fixit-primary"
                  onClick={handleUpvote}
                >
                  Upvote
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="md:col-span-2">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{issue.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Details</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Category</span>
                    <p className="font-medium">{issue.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Location</span>
                    <p className="font-medium">{issue.location}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Reported</span>
                    <p className="font-medium">{new Date(issue.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Last Updated</span>
                    <p className="font-medium">{new Date(issue.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              {isAuthority() && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Authority Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    {issue.status !== 'open' && (
                      <Button 
                        className="bg-fixit-danger hover:bg-red-700"
                        onClick={() => handleStatusChange('open')}
                      >
                        Mark as Open
                      </Button>
                    )}
                    
                    {issue.status !== 'in-progress' && (
                      <Button 
                        className="bg-fixit-warning hover:bg-amber-600"
                        onClick={() => handleStatusChange('in-progress')}
                      >
                        Mark as In Progress
                      </Button>
                    )}
                    
                    {issue.status !== 'resolved' && (
                      <Button 
                        className="bg-fixit-success hover:bg-green-700"
                        onClick={() => handleStatusChange('resolved')}
                      >
                        Mark as Resolved
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              {issue.images.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Images</h3>
                  <div className="space-y-2">
                    {issue.images.map((image, index) => (
                      <img 
                        key={index} 
                        src={image} 
                        alt={`Image ${index + 1}`} 
                        className="w-full rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                {issue.coordinates ? (
                  <Map 
                    coordinates={issue.coordinates} 
                    height="h-40" 
                    showControls={false} 
                  />
                ) : (
                  <Map 
                    height="h-40" 
                    showControls={false} 
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CommentSection 
        issueId={issue.id} 
        comments={issue.comments} 
        onCommentAdded={handleCommentAdded} 
      />
    </div>
  );
};

export default IssueDetail;
