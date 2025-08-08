export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo: string[];
  subtasks: Subtask[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

export interface Analytics {
  tasksCompleted: number;
  tasksOverdue: number;
  tasksInProgress: number;
  totalTasks: number;
  weeklyProgress: Array<{ day: string; completed: number; created: number }>;
}

export const dummyUsers: User[] = [
  {
    id: '1',
    name: 'Assim Ettisum',
    email: 'asim@outlook.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    role: 'CEO'
  },
  {
    id: '2',
    name: 'Sarah Connor',
    email: 'sarah@asimtask.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    role: 'Project Manager'
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john@asimtask.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    role: 'Developer'
  },
  {
    id: '4',
    name: 'Jane Smith',
    email: 'jane@asimtask.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    role: 'Designer'
  }
];

export const dummyTasks: Task[] = [
  {
    id: '1',
    title: 'Review quarterly budget proposals',
    description: 'Analyze and approve budget allocations for Q4 across all departments.',
    completed: false,
    priority: 'high',
    dueDate: '2024-01-15',
    assignedTo: ['1', '2'],
    subtasks: [
      { id: '1-1', title: 'Review marketing budget', completed: true },
      { id: '1-2', title: 'Review engineering budget', completed: false },
      { id: '1-3', title: 'Review HR budget', completed: false }
    ],
    comments: [
      {
        id: 'c1',
        userId: '2',
        content: 'Marketing budget looks good, but we might need to allocate more for engineering.',
        createdAt: '2024-01-10T10:30:00Z'
      }
    ],
    createdAt: '2024-01-08T09:00:00Z',
    updatedAt: '2024-01-10T15:45:00Z'
  },
  {
    id: '2',
    title: 'Prepare presentation for board meeting',
    description: 'Create comprehensive presentation covering company progress and future roadmap.',
    completed: false,
    priority: 'high',
    dueDate: '2024-01-18',
    assignedTo: ['1'],
    subtasks: [
      { id: '2-1', title: 'Gather financial data', completed: true },
      { id: '2-2', title: 'Create slide deck', completed: false },
      { id: '2-3', title: 'Prepare speaking notes', completed: false }
    ],
    comments: [],
    createdAt: '2024-01-09T14:20:00Z',
    updatedAt: '2024-01-11T11:30:00Z'
  },
  {
    id: '3',
    title: 'Update website design system',
    description: 'Refresh the design system with new components and improved accessibility.',
    completed: true,
    priority: 'medium',
    dueDate: '2024-01-12',
    assignedTo: ['4'],
    subtasks: [
      { id: '3-1', title: 'Audit current components', completed: true },
      { id: '3-2', title: 'Design new components', completed: true },
      { id: '3-3', title: 'Update documentation', completed: true }
    ],
    comments: [
      {
        id: 'c2',
        userId: '4',
        content: 'All components have been updated with improved accessibility features.',
        createdAt: '2024-01-12T16:00:00Z'
      }
    ],
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-12T16:00:00Z'
  },
  {
    id: '4',
    title: 'Implement user authentication system',
    description: 'Build secure authentication with OAuth integration and multi-factor authentication.',
    completed: false,
    priority: 'high',
    dueDate: '2024-01-25',
    assignedTo: ['3'],
    subtasks: [
      { id: '4-1', title: 'Set up OAuth providers', completed: true },
      { id: '4-2', title: 'Implement MFA', completed: false },
      { id: '4-3', title: 'Add password reset flow', completed: false },
      { id: '4-4', title: 'Write tests', completed: false }
    ],
    comments: [
      {
        id: 'c3',
        userId: '3',
        content: 'OAuth integration is complete. Working on MFA next.',
        createdAt: '2024-01-11T14:30:00Z'
      }
    ],
    createdAt: '2024-01-07T08:15:00Z',
    updatedAt: '2024-01-11T14:30:00Z'
  },
  {
    id: '5',
    title: 'Plan team building event',
    description: 'Organize quarterly team building event for all departments.',
    completed: false,
    priority: 'low',
    dueDate: '2024-02-01',
    assignedTo: ['2'],
    subtasks: [
      { id: '5-1', title: 'Survey team preferences', completed: false },
      { id: '5-2', title: 'Book venue', completed: false },
      { id: '5-3', title: 'Plan activities', completed: false }
    ],
    comments: [],
    createdAt: '2024-01-10T13:45:00Z',
    updatedAt: '2024-01-10T13:45:00Z'
  }
];

export const dummyAnalytics: Analytics = {
  tasksCompleted: 12,
  tasksOverdue: 3,
  tasksInProgress: 8,
  totalTasks: 23,
  weeklyProgress: [
    { day: 'Mon', completed: 3, created: 2 },
    { day: 'Tue', completed: 2, created: 4 },
    { day: 'Wed', completed: 5, created: 3 },
    { day: 'Thu', completed: 1, created: 1 },
    { day: 'Fri', completed: 4, created: 2 },
    { day: 'Sat', completed: 1, created: 0 },
    { day: 'Sun', completed: 2, created: 1 }
  ]
};
