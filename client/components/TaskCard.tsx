import { motion } from 'framer-motion';
import { FiCheckSquare, FiSquare, FiCalendar, FiUser, FiMessageCircle } from 'react-icons/fi';
import { Task, User } from '../data/dummy';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

interface TaskCardProps {
  task: Task;
  users: User[];
  onClick?: () => void;
}

export default function TaskCard({ task, users, onClick }: TaskCardProps) {
  const { toggleTask, darkMode } = useStore();
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getAssignedUsers = () => {
    return task.assignedTo.map(userId => users.find(user => user.id === userId)).filter(Boolean) as User[];
  };

  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
  const completedSubtasks = task.subtasks.filter(st => st.completed).length;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      className={`${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
        task.completed ? 'opacity-75' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleTask(task.id);
            }}
            className="mt-1"
          >
            {task.completed ? (
              <FiCheckSquare className="w-5 h-5 text-green-500" />
            ) : (
              <FiSquare className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            )}
          </button>
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-sm mb-1 ${
              task.completed ? 'line-through' : ''
            } ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
              {task.description}
            </p>
          </div>
        </div>

        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          {/* Due date */}
          <div className={`flex items-center space-x-1 ${
            isOverdue ? 'text-red-500' : darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <FiCalendar className="w-3 h-3" />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>

          {/* Subtasks progress */}
          {task.subtasks.length > 0 && (
            <div className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <FiCheckSquare className="w-3 h-3" />
              <span>{completedSubtasks}/{task.subtasks.length}</span>
            </div>
          )}

          {/* Comments count */}
          {task.comments.length > 0 && (
            <div className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <FiMessageCircle className="w-3 h-3" />
              <span>{task.comments.length}</span>
            </div>
          )}
        </div>

        {/* Assigned users */}
        <div className="flex items-center -space-x-1">
          {getAssignedUsers().slice(0, 3).map((user, index) => (
            <img
              key={user.id}
              src={user.avatar}
              alt={user.name}
              title={user.name}
              className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
              style={{ zIndex: 10 - index }}
            />
          ))}
          {getAssignedUsers().length > 3 && (
            <div className={`w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
            } flex items-center justify-center text-xs font-medium`}>
              +{getAssignedUsers().length - 3}
            </div>
          )}
        </div>
      </div>

      {/* Click to view details hint */}
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <Link
          to={`/task/${task.id}`}
          onClick={(e) => e.stopPropagation()}
          className={`text-xs ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} hover:underline`}
        >
          View details →
        </Link>
      </div>
    </motion.div>
  );
}
