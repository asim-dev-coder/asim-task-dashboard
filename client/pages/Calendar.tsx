import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiPlus, 
  FiCalendar, 
  FiClock,
  FiUser,
  FiMoreHorizontal,
  FiEdit3,
  FiTrash2
} from 'react-icons/fi';
import { useStore } from '../store/useStore';
import { Task } from '../data/dummy';

type CalendarView = 'month' | 'week' | 'day';

const TaskEventModal = ({ 
  isOpen, 
  onClose, 
  selectedDate,
  task,
  onSave
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  selectedDate: Date;
  task?: Task | null;
  onSave: (taskData: any) => void;
}) => {
  const { users, darkMode } = useStore();
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium' as 'low' | 'medium' | 'high',
    dueDate: task?.dueDate || selectedDate.toISOString().split('T')[0],
    assignedTo: task?.assignedTo || []
  });

  const handleSave = () => {
    if (formData.title.trim()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border rounded-lg p-6 w-full max-w-md`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {task ? 'Edit Task' : 'Schedule New Task'}
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={`w-full p-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className={`w-full p-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
              placeholder="Enter task description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                className={`w-full p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className={`w-full p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!formData.title.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {task ? 'Update' : 'Create'} Task
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TaskEventCard = ({ 
  task, 
  onEdit, 
  onDelete 
}: { 
  task: Task; 
  onEdit: () => void; 
  onDelete: () => void; 
}) => {
  const { darkMode, toggleTask } = useStore();
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`group relative p-2 mb-1 rounded text-xs cursor-pointer ${
        task.completed 
          ? darkMode ? 'bg-gray-700 opacity-60' : 'bg-gray-200 opacity-60'
          : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-50 hover:bg-blue-100'
      } transition-all`}
      onClick={() => toggleTask(task.id)}
    >
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
        <span className={`flex-1 truncate ${
          task.completed ? 'line-through' : ''
        } ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
          {task.title}
        </span>
      </div>
      
      {/* Actions (show on hover) */}
      <div className={`absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className={`p-1 rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white hover:bg-gray-100'}`}
        >
          <FiEdit3 className="w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className={`p-1 rounded ${darkMode ? 'bg-red-700 hover:bg-red-600' : 'bg-red-100 hover:bg-red-200'} text-red-500`}
        >
          <FiTrash2 className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
};

export default function Calendar() {
  const { tasks, addTask, updateTask, deleteTask, users, darkMode } = useStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Previous month's trailing days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonth.getDate() - i),
        isCurrentMonth: false,
        isPreviousMonth: true
      });
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
        isPreviousMonth: false
      });
    }
    
    // Next month's leading days
    const remaining = 42 - days.length; // 6 weeks * 7 days
    for (let day = 1; day <= remaining; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        isPreviousMonth: false
      });
    }

    return days;
  }, [currentDate]);

  const getTasksForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData: any) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask({
        ...taskData,
        completed: false,
        subtasks: [],
        comments: [],
      });
    }
    setEditingTask(null);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div className="flex items-center space-x-4">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Calendar
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
              className={`p-2 rounded-lg ${
                darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <span className={`text-lg font-semibold min-w-[200px] text-center ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button
              onClick={() => navigateMonth('next')}
              className={`p-2 rounded-lg ${
                darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={goToToday}
            className={`px-4 py-2 rounded-lg ${
              darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors`}
          >
            Today
          </button>

          <div className={`flex rounded-lg p-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            {(['month', 'week', 'day'] as CalendarView[]).map(viewOption => (
              <button
                key={viewOption}
                onClick={() => setView(viewOption)}
                className={`px-3 py-1 rounded text-sm font-medium capitalize ${
                  view === viewOption
                    ? 'bg-blue-500 text-white'
                    : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {viewOption}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setSelectedDate(new Date());
              setIsModalOpen(true);
            }}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </motion.div>

      {/* Calendar Grid */}
      {view === 'month' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border rounded-lg overflow-hidden`}
        >
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
            {dayNames.map(day => (
              <div
                key={day}
                className={`p-4 text-center font-semibold ${
                  darkMode ? 'text-gray-400 bg-gray-900' : 'text-gray-600 bg-gray-50'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {calendarDays.map((dayInfo, index) => {
              const dayTasks = getTasksForDate(dayInfo.date);
              const isCurrentMonth = dayInfo.isCurrentMonth;
              const todayFlag = isToday(dayInfo.date);
              const selectedFlag = isSelected(dayInfo.date);

              return (
                <motion.div
                  key={index}
                  whileHover={{ backgroundColor: darkMode ? '#374151' : '#f3f4f6' }}
                  className={`min-h-[120px] p-2 border-b border-r border-gray-200 dark:border-gray-700 cursor-pointer ${
                    !isCurrentMonth ? 'opacity-30' : ''
                  } ${todayFlag ? (darkMode ? 'bg-blue-900/20' : 'bg-blue-50') : ''}
                  ${selectedFlag ? (darkMode ? 'bg-blue-800/30' : 'bg-blue-100') : ''}`}
                  onClick={() => handleDateClick(dayInfo.date)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${
                      todayFlag 
                        ? 'text-blue-600 dark:text-blue-400 font-bold'
                        : darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {dayInfo.date.getDate()}
                    </span>
                    {dayTasks.length > 0 && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        darkMode ? 'bg-blue-700 text-blue-300' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {dayTasks.length}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    {dayTasks.slice(0, 3).map(task => (
                      <TaskEventCard
                        key={task.id}
                        task={task}
                        onEdit={() => {
                          setEditingTask(task);
                          setSelectedDate(dayInfo.date);
                          setIsModalOpen(true);
                        }}
                        onDelete={() => deleteTask(task.id)}
                      />
                    ))}
                    {dayTasks.length > 3 && (
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center`}>
                        +{dayTasks.length - 3} more
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Week and Day views would be implemented here */}
      {view !== 'month' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border rounded-lg p-8 text-center`}
        >
          <FiCalendar className={`w-16 h-16 mx-auto mb-4 ${
            darkMode ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            {view.charAt(0).toUpperCase() + view.slice(1)} View
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            {view === 'week' ? 'Weekly calendar view' : 'Daily calendar view'} will be implemented here.
            For now, use the month view to manage your tasks.
          </p>
        </motion.div>
      )}

      {/* Task Statistics Sidebar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className={`${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border rounded-lg p-4`}>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <FiCalendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                This Month
              </p>
              <p className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {tasks.filter(task => {
                  const taskDate = new Date(task.dueDate);
                  return taskDate.getMonth() === currentDate.getMonth() && 
                         taskDate.getFullYear() === currentDate.getFullYear();
                }).length} tasks
              </p>
            </div>
          </div>
        </div>

        <div className={`${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border rounded-lg p-4`}>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <FiClock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Completed
              </p>
              <p className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {tasks.filter(task => task.completed).length} tasks
              </p>
            </div>
          </div>
        </div>

        <div className={`${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border rounded-lg p-4`}>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-500 rounded-lg">
              <FiUser className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Overdue
              </p>
              <p className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {tasks.filter(task => {
                  return new Date(task.dueDate) < new Date() && !task.completed;
                }).length} tasks
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        <TaskEventModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
            setSelectedDate(null);
          }}
          selectedDate={selectedDate || new Date()}
          task={editingTask}
          onSave={handleSaveTask}
        />
      </AnimatePresence>
    </div>
  );
}
