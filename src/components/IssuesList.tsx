
import { useState } from 'react';
import IssueCard from './IssueCard';
import { Issue, upvoteIssue } from '../utils/mockData';
import { useToast } from '@/hooks/use-toast';
import FilterBar from './FilterBar';

interface IssuesListProps {
  issues: Issue[];
  showFilters?: boolean;
}

const IssuesList = ({ issues: initialIssues, showFilters = true }: IssuesListProps) => {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { toast } = useToast();

  const handleUpvote = (issueId: string) => {
    const updatedIssue = upvoteIssue(issueId);
    if (updatedIssue) {
      setIssues(
        issues.map(issue => 
          issue.id === issueId ? { ...issue, upvotes: updatedIssue.upvotes } : issue
        )
      );
      
      toast({
        title: "Upvoted",
        description: "You have successfully upvoted this issue.",
      });
    }
  };

  const handleStatusFilter = (status: string) => {
    setActiveFilter(status);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
  };

  const filteredIssues = issues.filter(issue => {
    // Filter by status
    if (activeFilter !== 'all' && issue.status !== activeFilter) {
      return false;
    }
    
    // Filter by category
    if (categoryFilter !== 'all' && issue.category !== categoryFilter) {
      return false;
    }
    
    return true;
  });

  return (
    <div>
      {showFilters && (
        <FilterBar 
          activeFilter={activeFilter}
          categoryFilter={categoryFilter}
          onStatusFilter={handleStatusFilter}
          onCategoryChange={handleCategoryChange}
        />
      )}
      
      {filteredIssues.length === 0 ? (
        <div className="text-center py-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No issues found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try changing your filters or report a new issue.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredIssues.map(issue => (
            <IssueCard 
              key={issue.id} 
              issue={issue} 
              onUpvote={handleUpvote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IssuesList;
