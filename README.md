# 🚀 TaskHive - Modern Task Management Dashboard

A comprehensive, production-ready task management application built with React, TypeScript, and modern web technologies.

![TaskHive Dashboard](https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=600&fit=crop)

## ✨ Features

### 🔐 **Authentication System**
- Email/password login with validation
- Google OAuth simulation
- "Remember me" functionality
- Secure logout with session management

### 📊 **Dashboard**
- Personalized welcome messages with time-based greetings
- Real-time task statistics and progress tracking
- Today's tasks overview with priority indicators
- Interactive mini calendar with task scheduling
- Team member status and availability
- Quick action shortcuts

### ✅ **Task Management**
- **My Tasks Page**: Complete task management interface
  - Advanced filtering and sorting options
  - Bulk actions (complete, delete, assign)
  - Grid and list view modes
  - Real-time search functionality
  - Create and edit tasks with rich forms
  - Priority levels (High, Medium, Low)
  - Due date management
  - Task assignment to team members

### 📝 **Task Details**
- Comprehensive task detail pages with dynamic routing
- Editable task properties (title, description, priority, due date)
- Subtask management with progress tracking
- Threaded comment system
- Task assignment and collaboration features
- Activity timeline and history

### 📅 **Calendar Integration**
- Full-featured calendar with monthly view
- Visual task scheduling and deadline management
- Interactive task creation directly from calendar dates
- Task completion tracking within calendar
- Month navigation with task density indicators
- Color-coded priority system

### 📈 **Analytics Dashboard**
- **Productivity Metrics**:
  - Task completion rates and trends
  - Weekly progress charts
  - Priority distribution analysis
  - Team performance comparisons
- **Visual Charts**:
  - Interactive progress bars
  - Completion rate tracking
  - Priority distribution pie charts
  - Team collaboration metrics
- **Export Functionality**: Download analytics data as JSON

### ⚙️ **Settings & Preferences**
- **Profile Management**:
  - Edit personal information and avatar
  - Contact details and bio
  - Role and team information
- **Notification Settings**:
  - Email and push notification preferences
  - Granular control over notification types
  - Frequency settings (immediate, daily, weekly)
- **Appearance Customization**:
  - Dark/light mode toggle with system persistence
  - Compact view options
  - Animation preferences
  - Avatar display settings
- **Data & Privacy**:
  - Export personal data
  - Clear tasks and reset account
  - Account deletion options

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works flawlessly on desktop, tablet, and mobile
- **Dark Mode**: Complete dark theme with smooth transitions
- **Animations**: Smooth Framer Motion animations throughout
- **Accessibility**: WCAG compliant with proper focus management
- **Modern Icons**: Feather icons for consistent visual language

### 🔧 **Technical Features**
- **State Management**: Zustand with persistence
- **Routing**: React Router 6 with protected routes
- **Real-time Updates**: Instant UI updates across all pages
- **Local Storage**: Automatic data persistence
- **TypeScript**: Full type safety
- **Performance**: Optimized with memo and lazy loading

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS 3 + Custom Components
- **State**: Zustand with persistence middleware
- **Routing**: React Router 6
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather Icons)
- **Backend**: Express.js (integrated with Vite)
- **Build Tool**: Vite 6+ with HMR
- **Package Manager**: npm

## 📁 Project Structure

```
TaskHive/
├── 📁 client/                          # Frontend React application
│   ├── 📁 components/                  # Reusable UI components
│   │   ├── 📁 ui/                      # Base shadcn components
│   │   ├── Layout.tsx                  # Main app layout with sidebar
│   │   └── TaskCard.tsx               # Task display component
│   ├── 📁 data/                       # Application data
│   │   └── dummy.ts                   # Sample data and types
│   ├── 📁 pages/                      # Page components (routes)
│   │   ├── Login.tsx                  # Authentication page
│   │   ├── Dashboard.tsx              # Main dashboard
│   │   ├── Tasks.tsx                  # Task management page
│   │   ���── TaskDetail.tsx             # Individual task details
│   │   ├── Calendar.tsx               # Calendar view
│   │   ├── Analytics.tsx              # Analytics dashboard
│   │   ├── Settings.tsx               # Settings and preferences
│   │   └── Placeholder.tsx            # Generic placeholder
│   ├── 📁 store/                      # State management
│   │   └── useStore.ts                # Zustand store
│   ├── App.tsx                        # Main app with routing
│   └── global.css                     # Global styles
├── 📁 server/                         # Express backend
│   └── routes/                        # API endpoints
├── 📁 shared/                         # Shared types
└── package.json                       # Dependencies
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm (Download from [nodejs.org](https://nodejs.org))
- **Git** (Optional, for version control)

### Installation

1. **Extract the project files** to your desired directory

2. **Navigate to the project folder**
   ```bash
   cd TaskHive
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** and go to `http://localhost:8080`

### Demo Login
- **Email**: Any valid email format (e.g., `demo@taskhive.com`)
- **Password**: Any password with 6+ characters (e.g., `password123`)

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start dev server (frontend + backend)
npm run typecheck    # Check TypeScript errors

# Production
npm run build        # Build for production
npm start           # Start production server

# Testing & Quality
npm test            # Run tests
npm run format.fix  # Format code with Prettier
```

## 📋 Features Walkthrough

### 1. **Login & Authentication**
- Try the demo credentials or create your own
- Toggle dark mode from the login screen
- Experience smooth authentication flow

### 2. **Dashboard Overview**
- View personalized greeting based on time of day
- Check today's tasks and overall statistics
- Navigate using the collapsible sidebar
- Access quick actions and team information

### 3. **Task Management**
- **Create Tasks**: Use the "New Task" button or calendar
- **Filter & Sort**: Advanced filtering by status, priority, date
- **Bulk Actions**: Select multiple tasks for batch operations
- **View Modes**: Switch between grid and list layouts

### 4. **Calendar Scheduling**
- Click any date to create a task
- View task density and deadlines
- Edit tasks directly from the calendar
- Navigate between months seamlessly

### 5. **Analytics Insights**
- Monitor productivity trends and completion rates
- Analyze team performance and collaboration
- Export data for external analysis
- Track priority distribution and workload

### 6. **Settings Customization**
- Update your profile information and avatar
- Configure notification preferences
- Toggle dark mode and appearance settings
- Manage data privacy and export options

## 🔧 Customization

### Adding New Features
1. **New Pages**: Create components in `client/pages/`
2. **Routes**: Add to `client/App.tsx`
3. **State**: Extend `client/store/useStore.ts`
4. **Styling**: Use Tailwind classes or extend `global.css`

### Theming
- **Colors**: Modify `tailwind.config.ts` and `global.css`
- **Dark Mode**: Controlled via Zustand store
- **Components**: Customize in `client/components/ui/`

### Data Integration
- **Replace dummy data** in `client/data/dummy.ts`
- **Add API calls** in store actions
- **Integrate backend** using the Express server setup

## 🐛 Troubleshooting

### Common Issues

**Port conflicts**
```bash
# If port 8080 is in use, Vite will automatically use another port
# Check the console output for the actual URL
```

**Module not found errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**
```bash
# Check for type issues
npm run typecheck
```

**Dark mode not persisting**
```bash
# Clear browser localStorage
# Open DevTools > Application > Local Storage > Clear
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Cloud Deployment
The app is ready for deployment on:
- **Netlify**: Use the included `netlify.toml`
- **Vercel**: Deploy directly from GitHub
- **Railway**: One-click deployment
- **Heroku**: Use the included build scripts

## 🔐 Security Notes

- Demo app uses local storage for persistence
- In production, implement proper authentication
- Add CSRF protection and input sanitization
- Use environment variables for sensitive data

## 📝 License

This project is created for demonstration purposes. Feel free to use it as a starting point for your own task management application.

## 🤝 Contributing

This is a demo project, but you can:
1. Fork the repository
2. Create feature branches
3. Submit pull requests
4. Report issues and suggestions

## 📞 Support

For questions about this demo application:
- Check the [Builder.io documentation](https://www.builder.io/c/docs)
- Review the code comments and structure
- Experiment with the features and functionality

---

**Built with ❤️ using modern web technologies**

🚀 **TaskHive** - Efficient task management for modern teams
