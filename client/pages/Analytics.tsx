import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBarChart2, 
  FiTrendingUp, 
  FiTrendingDown,
  FiTarget,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiCalendar,
  FiUsers,
  FiActivity,
  FiDownload,
  FiRefreshCw
} from 'react-icons/fi';
import { useStore } from '../store/useStore';

type TimeRange = '7d' | '30d' | '90d' | '1y';
type ChartType = 'bar' | 'line' | 'pie';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  color 
}: {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  icon: any;
  color: string;
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
          <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mt-2`}>
            {value}
          </p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'
            }`}>
              {trend === 'up' && <FiTrendingUp className="w-4 h-4 mr-1" />}
              {trend === 'down' && <FiTrendingDown className="w-4 h-4 mr-1" />}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

const ProgressChart = ({ 
  data, 
  title 
}: { 
  data: Array<{ day: string; completed: number; created: number }>; 
  title: string;
}) => {
  const { darkMode } = useStore();
  
  const maxValue = Math.max(...data.map(d => Math.max(d.completed, d.created)));
  
  return (
    <div className={`${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border rounded-lg p-6`}>
      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
        {title}
      </h3>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={item.day} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{item.day}</span>
              <div className="flex space-x-4">
                <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {item.completed} completed
                </span>
                <span className={`${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {item.created} created
                </span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              {/* Completed bar */}
              <div className={`flex-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.completed / maxValue) * 100}%` }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="bg-blue-500 h-2 rounded-full"
                />
              </div>
              
              {/* Created bar */}
              <div className={`flex-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.created / maxValue) * 100}%` }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                  className="bg-green-500 h-2 rounded-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center space-x-6 mt-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Tasks Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Tasks Created</span>
        </div>
      </div>
    </div>
  );
};

const PriorityDistribution = ({ tasks }: { tasks: any[] }) => {
  const { darkMode } = useStore();
  
  const priorityStats = useMemo(() => {
    const stats = { high: 0, medium: 0, low: 0 };
    tasks.forEach(task => {
      stats[task.priority as keyof typeof stats]++;
    });
    return stats;
  }, [tasks]);

  const total = Object.values(priorityStats).reduce((sum, count) => sum + count, 0);
  
  const priorityData = [
    { label: 'High Priority', count: priorityStats.high, color: 'bg-red-500', percentage: total ? (priorityStats.high / total * 100) : 0 },
    { label: 'Medium Priority', count: priorityStats.medium, color: 'bg-yellow-500', percentage: total ? (priorityStats.medium / total * 100) : 0 },
    { label: 'Low Priority', count: priorityStats.low, color: 'bg-green-500', percentage: total ? (priorityStats.low / total * 100) : 0 },
  ];

  return (
    <div className={`${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border rounded-lg p-6`}>
      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
        Priority Distribution
      </h3>
      
      <div className="space-y-4">
        {priorityData.map((item, index) => (
          <div key={item.label} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {item.label}
              </span>
              <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {item.count} ({item.percentage.toFixed(1)}%)
              </span>
            </div>
            
            <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ delay: index * 0.2, duration: 1 }}
                className={`${item.color} h-2 rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TeamPerformance = ({ tasks, users }: { tasks: any[]; users: any[] }) => {
  const { darkMode } = useStore();
  
  const userStats = useMemo(() => {
    const stats = users.map(user => {
      const userTasks = tasks.filter(task => task.assignedTo.includes(user.id));
      const completedTasks = userTasks.filter(task => task.completed);
      const completionRate = userTasks.length ? (completedTasks.length / userTasks.length * 100) : 0;
      
      return {
        ...user,
        totalTasks: userTasks.length,
        completedTasks: completedTasks.length,
        completionRate: completionRate
      };
    });
    
    return stats.sort((a, b) => b.completionRate - a.completionRate);
  }, [tasks, users]);

  return (
    <div className={`${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border rounded-lg p-6`}>
      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
        Team Performance
      </h3>
      
      <div className="space-y-4">
        {userStats.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user.name}
                </span>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {user.completedTasks}/{user.totalTasks} tasks
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`flex-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${user.completionRate}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    className={`h-2 rounded-full ${
                      user.completionRate >= 80 ? 'bg-green-500' :
                      user.completionRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  />
                </div>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} min-w-[40px]`}>
                  {user.completionRate.toFixed(0)}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function Analytics() {
  const { tasks, users, analytics, darkMode } = useStore();
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleExport = () => {
    // Simulate data export
    const data = {
      summary: {
        totalTasks: analytics.totalTasks,
        completed: analytics.tasksCompleted,
        inProgress: analytics.tasksInProgress,
        overdue: analytics.tasksOverdue
      },
      weeklyProgress: analytics.weeklyProgress,
      tasks: tasks.map(task => ({
        title: task.title,
        priority: task.priority,
        status: task.completed ? 'completed' : 'pending',
        dueDate: task.dueDate,
        createdAt: task.createdAt
      }))
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskhive-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const completionRate = analytics.totalTasks ? (analytics.tasksCompleted / analytics.totalTasks * 100) : 0;
  const overdueRate = analytics.totalTasks ? (analytics.tasksOverdue / analytics.totalTasks * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Analytics Dashboard
          </h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Track your productivity and team performance
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Time range selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as TimeRange)}
            className={`px-4 py-2 rounded-lg border ${
              darkMode 
                ? 'bg-gray-800 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-700'
            }`}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors disabled:opacity-50`}
          >
            <FiRefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExport}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiDownload className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <MetricCard
          title="Total Tasks"
          value={analytics.totalTasks}
          change="+5 from last week"
          trend="up"
          icon={FiTarget}
          color="bg-blue-500"
        />
        <MetricCard
          title="Completed"
          value={analytics.tasksCompleted}
          change={`${completionRate.toFixed(1)}% completion rate`}
          trend={completionRate > 75 ? "up" : "down"}
          icon={FiCheckCircle}
          color="bg-green-500"
        />
        <MetricCard
          title="In Progress"
          value={analytics.tasksInProgress}
          change="Active tasks"
          icon={FiClock}
          color="bg-yellow-500"
        />
        <MetricCard
          title="Overdue"
          value={analytics.tasksOverdue}
          change={`${overdueRate.toFixed(1)}% of total`}
          trend={overdueRate > 10 ? "down" : "up"}
          icon={FiAlertCircle}
          color="bg-red-500"
        />
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ProgressChart
            data={analytics.weeklyProgress}
            title="Weekly Task Progress"
          />
        </motion.div>

        {/* Priority Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PriorityDistribution tasks={tasks} />
        </motion.div>
      </div>

      {/* Team Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <TeamPerformance tasks={tasks} users={users} />
      </motion.div>

      {/* Additional Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Average completion time */}
        <div className={`${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border rounded-lg p-6`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-500 rounded-lg">
              <FiActivity className="w-5 h-5 text-white" />
            </div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Avg. Completion Time
            </h3>
          </div>
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            3.2 days
          </p>
          <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'} mt-1`}>
            -0.5 days from last month
          </p>
        </div>

        {/* Most productive day */}
        <div className={`${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border rounded-lg p-6`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-500 rounded-lg">
              <FiCalendar className="w-5 h-5 text-white" />
            </div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Most Productive
            </h3>
          </div>
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Wednesday
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            5.2 tasks completed avg.
          </p>
        </div>

        {/* Team collaboration */}
        <div className={`${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border rounded-lg p-6`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-teal-500 rounded-lg">
              <FiUsers className="w-5 h-5 text-white" />
            </div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Team Tasks
            </h3>
          </div>
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {tasks.filter(task => task.assignedTo.length > 1).length}
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            Collaborative tasks
          </p>
        </div>
      </motion.div>
    </div>
  );
}
