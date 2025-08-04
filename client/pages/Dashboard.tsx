import { motion } from 'framer-motion';
import { FiCheckSquare, FiClock, FiTrendingUp, FiCalendar, FiPlus } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import TaskCard from '../components/TaskCard';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color, trend }: {
  title: string;
  value: number;
  icon: any;
  color: string;
  trend?: string;
}) => {
  const { darkMode } = useStore();
  
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border rounded-lg p-6 transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mt-1`}>
            {value}
          </p>
          {trend && (
            <p className="text-sm text-green-600 mt-1">
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

const MiniCalendar = () => {
  const { darkMode } = useStore();
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const calendarDays = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className={`${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border rounded-lg p-4`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <Link 
          to="/calendar"
          className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} hover:underline`}
        >
          View full calendar
        </Link>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map(day => (
          <div key={day} className={`text-center text-xs font-medium ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          } py-1`}>
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`text-center text-sm py-2 rounded ${
              day === today.getDate()
                ? 'bg-blue-500 text-white font-semibold'
                : day
                ? darkMode
                  ? 'text-gray-300 hover:bg-gray-700 cursor-pointer'
                  : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
                : ''
            }`}
          >
            {day || ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { currentUser, tasks, analytics, users, darkMode, selectTask } = useStore();
  
  const todaysTasks = tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    const today = new Date();
    return taskDate.toDateString() === today.toDateString() && !task.completed;
  });

  const overdueTasks = tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    const today = new Date();
    return taskDate < today && !task.completed;
  });

  const recentTasks = tasks
    .filter(task => !task.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 4);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {getGreeting()}, {currentUser?.name?.split(' ')[0]}! 👋
          </h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            You have {todaysTasks.length} tasks due today
            {overdueTasks.length > 0 && `, ${overdueTasks.length} overdue`}
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          <FiPlus className="w-4 h-4" />
          <span>New Task</span>
        </motion.button>
      </motion.div>

      {/* Stats cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="Tasks Completed"
          value={analytics.tasksCompleted}
          icon={FiCheckSquare}
          color="bg-green-500"
          trend="+12% from last week"
        />
        <StatCard
          title="In Progress"
          value={analytics.tasksInProgress}
          icon={FiClock}
          color="bg-blue-500"
        />
        <StatCard
          title="Overdue"
          value={analytics.tasksOverdue}
          icon={FiTrendingUp}
          color="bg-red-500"
        />
        <StatCard
          title="Total Tasks"
          value={analytics.totalTasks}
          icon={FiCalendar}
          color="bg-purple-500"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Today's Tasks
            </h2>
            <Link
              to="/tasks"
              className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} hover:underline`}
            >
              View all tasks
            </Link>
          </div>
          
          <div className="space-y-3">
            {todaysTasks.length === 0 ? (
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border rounded-lg p-8 text-center`}>
                <FiCheckSquare className={`w-12 h-12 mx-auto mb-4 ${
                  darkMode ? 'text-gray-600' : 'text-gray-400'
                }`} />
                <p className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  No tasks due today!
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                  Enjoy your day or get ahead on tomorrow's tasks.
                </p>
              </div>
            ) : (
              todaysTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  users={users}
                  onClick={() => selectTask(task.id)}
                />
              ))
            )}
          </div>

          {/* Recent tasks section */}
          {recentTasks.length > 0 && (
            <div className="mt-8">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Upcoming Tasks
              </h3>
              <div className="space-y-3">
                {recentTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    users={users}
                    onClick={() => selectTask(task.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Sidebar with calendar and quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Mini calendar */}
          <MiniCalendar />

          {/* Quick actions */}
          <div className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border rounded-lg p-4`}>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link
                to="/tasks/new"
                className={`flex items-center space-x-2 w-full p-2 rounded-md ${
                  darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                } transition-colors`}
              >
                <FiPlus className="w-4 h-4" />
                <span>Create New Task</span>
              </Link>
              <Link
                to="/calendar"
                className={`flex items-center space-x-2 w-full p-2 rounded-md ${
                  darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                } transition-colors`}
              >
                <FiCalendar className="w-4 h-4" />
                <span>View Calendar</span>
              </Link>
              <Link
                to="/analytics"
                className={`flex items-center space-x-2 w-full p-2 rounded-md ${
                  darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                } transition-colors`}
              >
                <FiTrendingUp className="w-4 h-4" />
                <span>View Analytics</span>
              </Link>
            </div>
          </div>

          {/* Team members */}
          <div className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border rounded-lg p-4`}>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Team Members
            </h3>
            <div className="space-y-3">
              {users.slice(0, 4).map(user => (
                <div key={user.id} className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>
                      {user.name}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} truncate`}>
                      {user.role}
                    </p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
