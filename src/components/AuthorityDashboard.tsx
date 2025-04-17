
import { useState } from 'react';
import { Issue, updateIssueStatus } from '../utils/mockData';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import FilterBar from './FilterBar';

interface AuthorityDashboardProps {
  issues: Issue[];
}

const AuthorityDashboard = ({ issues: initialIssues }: AuthorityDashboardProps) => {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { toast } = useToast();

  const handleStatusChange = (issueId: string, newStatus: 'open' | 'in-progress' | 'resolved') => {
    const updatedIssue = updateIssueStatus(issueId, newStatus);
    if (updatedIssue) {
      setIssues(
        issues.map(issue => 
          issue.id === issueId ? { ...issue, status: newStatus } : issue
        )
      );
      
      toast({
        title: "Status Updated",
        description: `Issue status has been updated to ${newStatus.replace('-', ' ')}.`,
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

  const getStatusBadge = (status: string) => {
    if (status === 'open') {
      return <Badge className="bg-fixit-danger">Open</Badge>;
    } else if (status === 'in-progress') {
      return <Badge className="bg-fixit-warning">In Progress</Badge>;
    } else {
      return <Badge className="bg-fixit-success">Resolved</Badge>;
    }
  };

  return (
    <div>
      <FilterBar 
        activeFilter={activeFilter}
        categoryFilter={categoryFilter}
        onStatusFilter={handleStatusFilter}
        onCategoryChange={handleCategoryChange}
      />
      
      <div className="rounded-md border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Issue</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Reported by</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Upvotes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIssues.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                  No issues found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              filteredIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">
                    <Link to={`/issues/${issue.id}`} className="text-fixit-primary hover:text-fixit-secondary">
                      {issue.title}
                    </Link>
                  </TableCell>
                  <TableCell>{issue.category}</TableCell>
                  <TableCell className="max-w-[150px] truncate" title={issue.location}>
                    {issue.location}
                  </TableCell>
                  <TableCell>{issue.reportedByName}</TableCell>
                  <TableCell>{new Date(issue.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{issue.upvotes}</TableCell>
                  <TableCell>{getStatusBadge(issue.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {issue.status !== 'open' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-fixit-danger border-fixit-danger hover:bg-red-50"
                          onClick={() => handleStatusChange(issue.id, 'open')}
                        >
                          Reopen
                        </Button>
                      )}
                      
                      {issue.status !== 'in-progress' && issue.status !== 'resolved' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-fixit-warning border-fixit-warning hover:bg-amber-50"
                          onClick={() => handleStatusChange(issue.id, 'in-progress')}
                        >
                          Start
                        </Button>
                      )}
                      
                      {issue.status !== 'resolved' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-fixit-success border-fixit-success hover:bg-green-50"
                          onClick={() => handleStatusChange(issue.id, 'resolved')}
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AuthorityDashboard;
