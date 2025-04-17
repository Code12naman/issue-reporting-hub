
// Mock user data
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'authority';
  avatar?: string;
}

export interface Comment {
  id: string;
  issueId: string;
  userId: string;
  userName: string;
  userRole: 'citizen' | 'authority';
  content: string;
  createdAt: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  status: 'open' | 'in-progress' | 'resolved';
  upvotes: number;
  reportedBy: string;
  reportedByName: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'citizen',
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'citizen',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@cityworks.gov',
    role: 'authority',
  },
];

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Pothole on Main Street',
    description: 'Large pothole near the intersection of Main and Oak. It\'s been growing for weeks and is now a hazard for vehicles.',
    category: 'Roads',
    location: '123 Main Street',
    coordinates: { lat: 40.7128, lng: -74.006 },
    status: 'open',
    upvotes: 15,
    reportedBy: '1',
    reportedByName: 'Jane Doe',
    images: ['https://images.unsplash.com/photo-1584715642381-6f1c4b452b1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'],
    createdAt: '2025-04-10T08:30:00Z',
    updatedAt: '2025-04-10T08:30:00Z',
    comments: [
      {
        id: 'c1',
        issueId: '1',
        userId: '2',
        userName: 'John Smith',
        userRole: 'citizen',
        content: 'I hit this pothole yesterday and it damaged my tire. Please fix ASAP!',
        createdAt: '2025-04-11T10:20:00Z',
      },
      {
        id: 'c2',
        issueId: '1',
        userId: '3',
        userName: 'Admin User',
        userRole: 'authority',
        content: 'We have scheduled a repair for next week. Thank you for reporting.',
        createdAt: '2025-04-12T14:15:00Z',
      },
    ],
  },
  {
    id: '2',
    title: 'Broken Street Light',
    description: 'Street light at the corner of Elm and Pine has been out for over a week, creating a safety hazard at night.',
    category: 'Street Lighting',
    location: 'Corner of Elm and Pine',
    coordinates: { lat: 40.7218, lng: -74.0134 },
    status: 'in-progress',
    upvotes: 8,
    reportedBy: '2',
    reportedByName: 'John Smith',
    images: ['https://images.unsplash.com/photo-1543674892-7d64d45abd30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'],
    createdAt: '2025-04-08T15:45:00Z',
    updatedAt: '2025-04-13T09:20:00Z',
    comments: [
      {
        id: 'c3',
        issueId: '2',
        userId: '3',
        userName: 'Admin User',
        userRole: 'authority',
        content: 'Our maintenance team has been dispatched to assess the situation.',
        createdAt: '2025-04-13T09:20:00Z',
      },
    ],
  },
  {
    id: '3',
    title: 'Overflowing Trash Bin',
    description: 'Public trash bin at Central Park entrance is overflowing and attracting pests.',
    category: 'Sanitation',
    location: 'Central Park East Entrance',
    coordinates: { lat: 40.7648, lng: -73.9724 },
    status: 'resolved',
    upvotes: 12,
    reportedBy: '1',
    reportedByName: 'Jane Doe',
    images: ['https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'],
    createdAt: '2025-04-05T11:20:00Z',
    updatedAt: '2025-04-07T13:10:00Z',
    comments: [
      {
        id: 'c4',
        issueId: '3',
        userId: '1',
        userName: 'Jane Doe',
        userRole: 'citizen',
        content: 'This has been a problem for weeks now. The bin is always full!',
        createdAt: '2025-04-05T12:30:00Z',
      },
      {
        id: 'c5',
        issueId: '3',
        userId: '3',
        userName: 'Admin User',
        userRole: 'authority',
        content: 'We have emptied the bin and increased collection frequency for this location.',
        createdAt: '2025-04-07T13:10:00Z',
      },
      {
        id: 'c6',
        issueId: '3',
        userId: '1',
        userName: 'Jane Doe',
        userRole: 'citizen',
        content: 'Thank you for the quick response! The area looks much better now.',
        createdAt: '2025-04-08T09:45:00Z',
      },
    ],
  },
  {
    id: '4',
    title: 'Fallen Tree Blocking Sidewalk',
    description: 'A large tree has fallen and is completely blocking the sidewalk on Washington Avenue.',
    category: 'Parks & Trees',
    location: '456 Washington Ave',
    coordinates: { lat: 40.7328, lng: -74.0228 },
    status: 'open',
    upvotes: 20,
    reportedBy: '2',
    reportedByName: 'John Smith',
    images: ['https://images.unsplash.com/photo-1517660029921-0cbea2f15f8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'],
    createdAt: '2025-04-15T07:50:00Z',
    updatedAt: '2025-04-15T07:50:00Z',
    comments: [],
  },
  {
    id: '5',
    title: 'Graffiti on Public Library',
    description: 'The west wall of the public library has been vandalized with graffiti.',
    category: 'Vandalism',
    location: 'City Public Library, 789 Jefferson St',
    coordinates: { lat: 40.7412, lng: -74.0101 },
    status: 'in-progress',
    upvotes: 5,
    reportedBy: '1',
    reportedByName: 'Jane Doe',
    images: ['https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'],
    createdAt: '2025-04-14T14:30:00Z',
    updatedAt: '2025-04-16T10:15:00Z',
    comments: [
      {
        id: 'c7',
        issueId: '5',
        userId: '3',
        userName: 'Admin User',
        userRole: 'authority',
        content: 'Cleaning crew has been scheduled for tomorrow morning.',
        createdAt: '2025-04-16T10:15:00Z',
      },
    ],
  }
];

// Mock categories
export const categories = [
  'Roads',
  'Street Lighting',
  'Sanitation',
  'Parks & Trees',
  'Vandalism',
  'Public Safety',
  'Water & Sewage',
  'Noise Complaint',
  'Other'
];

// Mock active user
export let currentUser: User | null = null;

// Helper function to simulate login
export const login = (email: string, password: string): User | null => {
  const user = mockUsers.find(u => u.email === email);
  if (user) {
    currentUser = user;
    return user;
  }
  return null;
};

// Helper function to simulate logout
export const logout = () => {
  currentUser = null;
};

// Helper function to get issues
export const getIssues = (filter?: {
  status?: 'open' | 'in-progress' | 'resolved',
  category?: string,
  reportedBy?: string
}) => {
  let filtered = [...mockIssues];
  
  if (filter?.status) {
    filtered = filtered.filter(issue => issue.status === filter.status);
  }
  
  if (filter?.category) {
    filtered = filtered.filter(issue => issue.category === filter.category);
  }
  
  if (filter?.reportedBy) {
    filtered = filtered.filter(issue => issue.reportedBy === filter.reportedBy);
  }
  
  return filtered;
};

// Helper function to get a single issue by ID
export const getIssueById = (id: string): Issue | undefined => {
  return mockIssues.find(issue => issue.id === id);
};

// Helper to update issue status
export const updateIssueStatus = (issueId: string, status: 'open' | 'in-progress' | 'resolved') => {
  const issueIndex = mockIssues.findIndex(i => i.id === issueId);
  if (issueIndex !== -1) {
    mockIssues[issueIndex].status = status;
    mockIssues[issueIndex].updatedAt = new Date().toISOString();
    return mockIssues[issueIndex];
  }
  return null;
};

// Helper to add comment
export const addComment = (issueId: string, userId: string, content: string) => {
  const user = mockUsers.find(u => u.id === userId);
  if (!user) return null;
  
  const issueIndex = mockIssues.findIndex(i => i.id === issueId);
  if (issueIndex === -1) return null;
  
  const newComment: Comment = {
    id: `c${Date.now()}`,
    issueId,
    userId,
    userName: user.name,
    userRole: user.role,
    content,
    createdAt: new Date().toISOString()
  };
  
  mockIssues[issueIndex].comments.push(newComment);
  mockIssues[issueIndex].updatedAt = new Date().toISOString();
  return newComment;
};

// Helper to upvote an issue
export const upvoteIssue = (issueId: string) => {
  const issueIndex = mockIssues.findIndex(i => i.id === issueId);
  if (issueIndex !== -1) {
    mockIssues[issueIndex].upvotes += 1;
    return mockIssues[issueIndex];
  }
  return null;
};
