
import { useState } from 'react';
import { Comment, addComment } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CommentSectionProps {
  issueId: string;
  comments: Comment[];
  onCommentAdded: (newComment: Comment) => void;
}

const CommentSection = ({ issueId, comments, onCommentAdded }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add a comment.",
        variant: "destructive"
      });
      return;
    }

    if (!newComment.trim()) {
      toast({
        title: "Empty Comment",
        description: "Please enter a comment.",
        variant: "destructive"
      });
      return;
    }

    const comment = addComment(issueId, user.id, newComment);
    if (comment) {
      onCommentAdded(comment);
      setNewComment('');
      
      toast({
        title: "Comment Added",
        description: "Your comment has been added successfully.",
      });
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">
        Comments ({comments.length})
      </h3>
      
      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex items-start space-x-3">
            <div className="avatar">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-grow">
              <textarea
                className="input-field"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <div className="mt-2 flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-fixit-primary hover:bg-fixit-secondary"
                >
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
      
      {!isAuthenticated && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center">
          <p className="text-gray-600">
            Please <a href="/login" className="text-fixit-primary hover:underline">log in</a> to add a comment.
          </p>
        </div>
      )}
      
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="avatar">
                  {comment.userName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium">
                      {comment.userName}
                    </h4>
                    {comment.userRole === 'authority' && (
                      <span className="ml-2 text-xs bg-fixit-primary text-white px-2 py-0.5 rounded-full">
                        Authority
                      </span>
                    )}
                    <span className="ml-2 text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
