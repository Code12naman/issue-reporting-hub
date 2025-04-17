
import React from 'react';
import { Link } from 'react-router-dom';
import { Issue } from '../utils/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface IssueCardProps {
  issue: Issue;
  onUpvote?: (issueId: string) => void;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, onUpvote }) => {
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

  const formattedDate = new Date(issue.createdAt).toLocaleDateString();
  
  // Limit description to first 100 characters
  const truncatedDescription = 
    issue.description.length > 100 
      ? `${issue.description.substring(0, 100)}...` 
      : issue.description;

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">
            <Link to={`/issues/${issue.id}`} className="text-fixit-primary hover:text-fixit-secondary">
              {issue.title}
            </Link>
          </h3>
          <span className={statusClass}>{statusLabel}</span>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {issue.category} • {formattedDate}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 flex-grow">
        {issue.images.length > 0 && (
          <div className="mb-3">
            <img 
              src={issue.images[0]} 
              alt={issue.title} 
              className="w-full h-32 object-cover rounded-md"
            />
          </div>
        )}
        <p className="text-gray-700 text-sm">{truncatedDescription}</p>
        <div className="mt-2 text-xs text-gray-500">
          <span className="inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {issue.location}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="avatar">
            {issue.reportedByName.charAt(0)}
          </div>
          <span className="text-sm text-gray-600">{issue.reportedByName}</span>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">
            <span className="font-semibold">{issue.upvotes}</span> upvotes
          </span>
          
          {onUpvote && issue.status !== 'resolved' && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-fixit-primary border-fixit-primary"
              onClick={() => onUpvote(issue.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
              </svg>
              Upvote
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default IssueCard;
