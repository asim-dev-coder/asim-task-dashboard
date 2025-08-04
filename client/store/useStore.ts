import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Task, Analytics, dummyUsers, dummyTasks, dummyAnalytics } from '../data/dummy';

interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loginWithGoogle: () => Promise<boolean>;
}

interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  selectTask: (id: string) => void;
  addComment: (taskId: string, content: string, userId: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
}

interface UIState {
  sidebarOpen: boolean;
  darkMode: boolean;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
}

interface AppState extends AuthState, TaskState, UIState {
  analytics: Analytics;
  users: User[];
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth state
      isAuthenticated: false,
      currentUser: null,
      
      login: async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simple validation - in real app this would be API call
        if (email && password.length >= 6) {
          const user = dummyUsers.find(u => u.email === email) || dummyUsers[0];
          set({ isAuthenticated: true, currentUser: user });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ isAuthenticated: false, currentUser: null });
      },
      
      loginWithGoogle: async () => {
        // Simulate Google OAuth
        await new Promise(resolve => setTimeout(resolve, 1500));
        set({ isAuthenticated: true, currentUser: dummyUsers[0] });
        return true;
      },

      // Task state
      tasks: dummyTasks,
      selectedTask: null,
      
      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set(state => ({ tasks: [...state.tasks, newTask] }));
      },
      
      updateTask: (id, updates) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date().toISOString() }
              : task
          ),
          selectedTask: state.selectedTask?.id === id
            ? { ...state.selectedTask, ...updates, updatedAt: new Date().toISOString() }
            : state.selectedTask
        }));
      },
      
      deleteTask: (id) => {
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== id),
          selectedTask: state.selectedTask?.id === id ? null : state.selectedTask
        }));
      },
      
      toggleTask: (id) => {
        const { updateTask } = get();
        const task = get().tasks.find(t => t.id === id);
        if (task) {
          updateTask(id, { completed: !task.completed });
        }
      },
      
      selectTask: (id) => {
        const task = get().tasks.find(t => t.id === id);
        set({ selectedTask: task || null });
      },
      
      addComment: (taskId, content, userId) => {
        const { updateTask } = get();
        const task = get().tasks.find(t => t.id === taskId);
        if (task) {
          const newComment = {
            id: Date.now().toString(),
            userId,
            content,
            createdAt: new Date().toISOString(),
          };
          updateTask(taskId, {
            comments: [...task.comments, newComment]
          });
        }
      },
      
      toggleSubtask: (taskId, subtaskId) => {
        const { updateTask } = get();
        const task = get().tasks.find(t => t.id === taskId);
        if (task) {
          const updatedSubtasks = task.subtasks.map(subtask =>
            subtask.id === subtaskId
              ? { ...subtask, completed: !subtask.completed }
              : subtask
          );
          updateTask(taskId, { subtasks: updatedSubtasks });
        }
      },

      // UI state
      sidebarOpen: true,
      darkMode: false,
      
      toggleSidebar: () => {
        set(state => ({ sidebarOpen: !state.sidebarOpen }));
      },
      
      toggleDarkMode: () => {
        set(state => ({ darkMode: !state.darkMode }));
      },

      // Static data
      analytics: dummyAnalytics,
      users: dummyUsers,
    }),
    {
      name: 'taskhive-store',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        darkMode: state.darkMode,
        tasks: state.tasks,
      }),
    }
  )
);
