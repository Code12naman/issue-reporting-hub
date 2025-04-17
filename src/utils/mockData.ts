
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
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    role: 'citizen',
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya@example.com',
    role: 'citizen',
  },
  {
    id: '3',
    name: 'Aditya Kumar',
    email: 'aditya@municipalcorp.gov.in',
    role: 'authority',
  },
];

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Pothole on MG Road',
    description: 'Large pothole near the MG Road and Brigade Road junction. It\'s been growing for weeks and is now a hazard for vehicles and two-wheelers.',
    category: 'Roads',
    location: 'MG Road, Bengaluru',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    status: 'open',
    upvotes: 15,
    reportedBy: '1',
    reportedByName: 'Rahul Sharma',
    images: ['https://images.unsplash.com/photo-1584715642381-6f1c4b452b1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'],
    createdAt: '2025-04-10T08:30:00Z',
    updatedAt: '2025-04-10T08:30:00Z',
    comments: [
      {
        id: 'c1',
        issueId: '1',
        userId: '2',
        userName: 'Priya Patel',
        userRole: 'citizen',
        content: 'My scooter almost fell into this pothole yesterday. Please fix ASAP!',
        createdAt: '2025-04-11T10:20:00Z',
      },
      {
        id: 'c2',
        issueId: '1',
        userId: '3',
        userName: 'Aditya Kumar',
        userRole: 'authority',
        content: 'We have scheduled a repair for next week. Thank you for reporting.',
        createdAt: '2025-04-12T14:15:00Z',
      },
    ],
  },
  {
    id: '2',
    title: 'Broken Street Light in Sector 18',
    description: 'Street light near Sector 18 market has been out for over a week, creating a safety hazard at night for shoppers and residents.',
    category: 'Street Lighting',
    location: 'Sector 18, Noida',
    coordinates: { lat: 28.5691, lng: 77.3203 },
    status: 'in-progress',
    upvotes: 8,
    reportedBy: '2',
    reportedByName: 'Priya Patel',
    images: ['https://images.unsplash.com/photo-1543674892-7d64d45abd30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'],
    createdAt: '2025-04-08T15:45:00Z',
    updatedAt: '2025-04-13T09:20:00Z',
    comments: [
      {
        id: 'c3',
        issueId: '2',
        userId: '3',
        userName: 'Aditya Kumar',
        userRole: 'authority',
        content: 'Our maintenance team has been dispatched to assess the situation.',
        createdAt: '2025-04-13T09:20:00Z',
      },
    ],
  },
  {
    id: '3',
    title: 'Garbage Dump near Community Park',
    description: 'Waste is being dumped outside the designated area near Lodi Gardens, causing bad odor and health hazards.',
    category: 'Waste Management',
    location: 'Lodi Road, New Delhi',
    coordinates: { lat: 28.5928, lng: 77.2209 },
    status: 'resolved',
    upvotes: 12,
    reportedBy: '1',
    reportedByName: 'Rahul Sharma',
    images: ['https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'],
    createdAt: '2025-04-05T11:20:00Z',
    updatedAt: '2025-04-07T13:10:00Z',
    comments: [
      {
        id: 'c4',
        issueId: '3',
        userId: '1',
        userName: 'Rahul Sharma',
        userRole: 'citizen',
        content: 'This has been a problem for weeks now. The area is always dirty!',
        createdAt: '2025-04-05T12:30:00Z',
      },
      {
        id: 'c5',
        issueId: '3',
        userId: '3',
        userName: 'Aditya Kumar',
        userRole: 'authority',
        content: 'We have cleared the garbage and increased inspection frequency for this location.',
        createdAt: '2025-04-07T13:10:00Z',
      },
      {
        id: 'c6',
        issueId: '3',
        userId: '1',
        userName: 'Rahul Sharma',
        userRole: 'citizen',
        content: 'Thank you for the quick response! The area looks much better now.',
        createdAt: '2025-04-08T09:45:00Z',
      },
    ],
  },
  {
    id: '4',
    title: 'Waterlogging after Monsoon Rain',
    description: 'Severe waterlogging on the main road after yesterday\'s heavy rain. The entire street is flooded and impassable for pedestrians.',
    category: 'Drainage',
    location: 'Dadar West, Mumbai',
    coordinates: { lat: 19.0178, lng: 72.8478 },
    status: 'open',
    upvotes: 20,
    reportedBy: '2',
    reportedByName: 'Priya Patel',
    images: ['https://images.unsplash.com/photo-1517660029921-0cbea2f15f8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'],
    createdAt: '2025-04-15T07:50:00Z',
    updatedAt: '2025-04-15T07:50:00Z',
    comments: [],
  },
  {
    id: '5',
    title: 'Illegal Encroachment on Footpath',
    description: 'Vendors have illegally encroached on the footpath, forcing pedestrians to walk on the busy road.',
    category: 'Illegal Encroachment',
    location: 'Park Street, Kolkata',
    coordinates: { lat: 22.5584, lng: 88.3530 },
    status: 'in-progress',
    upvotes: 5,
    reportedBy: '1',
    reportedByName: 'Rahul Sharma',
    images: ['https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'],
    createdAt: '2025-04-14T14:30:00Z',
    updatedAt: '2025-04-16T10:15:00Z',
    comments: [
      {
        id: 'c7',
        issueId: '5',
        userId: '3',
        userName: 'Aditya Kumar',
        userRole: 'authority',
        content: 'Our team will visit the location for verification and take necessary action.',
        createdAt: '2025-04-16T10:15:00Z',
      },
    ],
  },
  {
    id: '6',
    title: 'Broken Public Water Tap',
    description: 'Public water tap at the community center is broken and leaking continuously, causing water wastage.',
    category: 'Water Supply',
    location: 'Navrangpura, Ahmedabad',
    coordinates: { lat: 23.0388, lng: 72.5517 },
    status: 'open',
    upvotes: 9,
    reportedBy: '2',
    reportedByName: 'Priya Patel',
    images: ['https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'],
    createdAt: '2025-04-13T11:20:00Z',
    updatedAt: '2025-04-13T11:20:00Z',
    comments: [],
  }
];

// Mock categories with India-specific issues
export const categories = [
  'Roads',
  'Street Lighting',
  'Waste Management',
  'Drainage',
  'Water Supply',
  'Illegal Encroachment',
  'Public Transport',
  'Stray Animals',
  'Noise Pollution',
  'Electricity Issues',
  'Public Toilets',
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
