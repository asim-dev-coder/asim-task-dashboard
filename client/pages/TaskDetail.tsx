import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiCheckSquare, 
  FiSquare, 
  FiCalendar, 
  FiUser, 
  FiMessageCircle,
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiSend
} from 'react-icons/fi';
import { useStore } from '../store/useStore';
import { User } from '../data/dummy';

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const { 
    tasks, 
    users, 
    updateTask, 
    toggleSubtask, 
    addComment, 
    currentUser, 
    darkMode 
  } = useStore();
  
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const task = tasks.find(t => t.id === id);

  useEffect(() => {
    if (task) {
      setEditData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority
      });
    }
  }, [task]);

  if (!task) {
    return <Navigate to="/tasks" replace />;
  }

  const getAssignedUsers = () => {
    return task.assignedTo.map(userId => users.find(user => user.id === userId)).filter(Boolean) as User[];
  };

  const getUserById = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  const handleSaveEdit = () => {
    updateTask(task.id, editData);
    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (newComment.trim() && currentUser) {
      addComment(task.id, newComment.trim(), currentUser.id);
      setNewComment('');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
  const completedSubtasks = task.subtasks.filter(st => st.completed).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <Link
          to="/dashboard"
          className={`flex items-center space-x-2 ${
            darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          } hover:underline`}
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } transition-colors`}
          >
            <FiEdit3 className="w-4 h-4" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-lg p-6`}
          >
            <div className="flex items-start space-x-4">
              <button
                onClick={() => updateTask(task.id, { completed: !task.completed })}
                className="mt-1"
              >
                {task.completed ? (
                  <FiCheckSquare className="w-6 h-6 text-green-500" />
                ) : (
                  <FiSquare className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                )}
              </button>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                      className={`w-full text-xl font-bold border-0 bg-transparent ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      } focus:ring-0 focus:outline-none`}
                    />
                    <textarea
                      value={editData.description}
                      onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className={`w-full border-0 bg-transparent ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      } focus:ring-0 focus:outline-none resize-none`}
                    />
                    <div className="flex items-center space-x-4">
                      <input
                        type="date"
                        value={editData.dueDate}
                        onChange={(e) => setEditData(prev => ({ ...prev, dueDate: e.target.value }))}
                        className={`px-3 py-2 rounded-lg border ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                      <select
                        value={editData.priority}
                        onChange={(e) => setEditData(prev => ({ ...prev, priority: e.target.value as any }))}
                        className={`px-3 py-2 rounded-lg border ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className={`px-4 py-2 rounded-lg ${
                          darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className={`text-2xl font-bold ${
                      task.completed ? 'line-through' : ''
                    } ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                      {task.title}
                    </h1>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                      {task.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 text-sm font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority} priority
                      </span>
                      <div className={`flex items-center space-x-2 ${
                        isOverdue ? 'text-red-500' : darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <FiCalendar className="w-4 h-4" />
                        <span className="text-sm">
                          Due {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Subtasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-lg p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Subtasks ({completedSubtasks}/{task.subtasks.length})
              </h2>
              <button className={`flex items-center space-x-2 text-sm ${
                darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
              }`}>
                <FiPlus className="w-4 h-4" />
                <span>Add subtask</span>
              </button>
            </div>

            <div className="space-y-3">
              {task.subtasks.map(subtask => (
                <div key={subtask.id} className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleSubtask(task.id, subtask.id)}
                  >
                    {subtask.completed ? (
                      <FiCheckSquare className="w-5 h-5 text-green-500" />
                    ) : (
                      <FiSquare className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    )}
                  </button>
                  <span className={`flex-1 ${
                    subtask.completed ? 'line-through' : ''
                  } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {subtask.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Comments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-lg p-6`}
          >
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Comments ({task.comments.length})
            </h2>

            {/* Add comment */}
            <div className="mb-6">
              <div className="flex space-x-3">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows={3}
                    className={`w-full p-3 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiSend className="w-4 h-4" />
                      <span>Comment</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments list */}
            <div className="space-y-4">
              {task.comments.map(comment => {
                const user = getUserById(comment.userId);
                return (
                  <div key={comment.id} className="flex space-x-3">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user?.name}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {comment.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assigned users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-lg p-4`}
          >
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
              Assigned To
            </h3>
            <div className="space-y-3">
              {getAssignedUsers().map(user => (
                <div key={user.id} className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {user.name}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {user.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className={`w-full mt-3 py-2 border-2 border-dashed ${
              darkMode ? 'border-gray-600 text-gray-400 hover:border-gray-500' : 'border-gray-300 text-gray-500 hover:border-gray-400'
            } rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}>
              + Assign user
            </button>
          </motion.div>

          {/* Task details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-lg p-4`}
          >
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
              Task Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Created:</span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Updated:</span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {new Date(task.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Status:</span>
                <span className={`${
                  task.completed ? 'text-green-500' : 'text-blue-500'
                }`}>
                  {task.completed ? 'Completed' : 'In Progress'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
