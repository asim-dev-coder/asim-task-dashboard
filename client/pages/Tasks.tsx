import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiFilter, 
  FiPlus, 
  FiMoreVertical,
  FiTrash2,
  FiEdit3,
  FiCheckSquare,
  FiSquare,
  FiCalendar,
  FiUser,
  FiArrowUp,
  FiArrowDown,
  FiList,
  FiGrid,
  FiX
} from 'react-icons/fi';
import { useStore } from '../store/useStore';
import TaskCard from '../components/TaskCard';
import { Task } from '../data/dummy';

type SortOption = 'dueDate' | 'priority' | 'created' | 'title';
type FilterOption = 'all' | 'pending' | 'completed' | 'overdue' | 'high' | 'medium' | 'low';
type ViewMode = 'grid' | 'list';

const TaskModal = ({ 
  isOpen, 
  onClose, 
  task, 
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  task?: Task | null;
  onSave: (taskData: any) => void;
}) => {
  const { users, darkMode } = useStore();
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium' as 'low' | 'medium' | 'high',
    dueDate: task?.dueDate || new Date().toISOString().split('T')[0],
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
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button onClick={onClose} className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <FiX className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
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

export default function Tasks() {
  const { tasks, users, addTask, updateTask, deleteTask, darkMode } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      // Search filter
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      let matchesFilter = true;
      switch (filterBy) {
        case 'pending':
          matchesFilter = !task.completed;
          break;
        case 'completed':
          matchesFilter = task.completed;
          break;
        case 'overdue':
          matchesFilter = new Date(task.dueDate) < new Date() && !task.completed;
          break;
        case 'high':
        case 'medium':
        case 'low':
          matchesFilter = task.priority === filterBy;
          break;
      }
      
      return matchesSearch && matchesFilter;
    });

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'dueDate':
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'created':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [tasks, searchTerm, sortBy, sortOrder, filterBy]);

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

  const handleBulkDelete = () => {
    selectedTasks.forEach(taskId => deleteTask(taskId));
    setSelectedTasks([]);
  };

  const handleBulkComplete = () => {
    selectedTasks.forEach(taskId => {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        updateTask(taskId, { completed: !task.completed });
      }
    });
    setSelectedTasks([]);
  };

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const getFilterCount = (filter: FilterOption) => {
    switch (filter) {
      case 'all': return tasks.length;
      case 'pending': return tasks.filter(t => !t.completed).length;
      case 'completed': return tasks.filter(t => t.completed).length;
      case 'overdue': return tasks.filter(t => new Date(t.dueDate) < new Date() && !t.completed).length;
      case 'high': return tasks.filter(t => t.priority === 'high').length;
      case 'medium': return tasks.filter(t => t.priority === 'medium').length;
      case 'low': return tasks.filter(t => t.priority === 'low').length;
      default: return 0;
    }
  };

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
            My Tasks
          </h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage and organize your tasks efficiently
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* View mode toggle */}
          <div className={`flex rounded-lg p-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' 
                ? 'bg-blue-500 text-white' 
                : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' 
                ? 'bg-blue-500 text-white' 
                : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </motion.div>

      {/* Search and filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {/* Search and filter buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FiFilter className="w-4 h-4" />
              <span>Filter</span>
            </button>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as SortOption);
                setSortOrder(order as 'asc' | 'desc');
              }}
              className={`px-4 py-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <option value="dueDate-asc">Due Date (Soon first)</option>
              <option value="dueDate-desc">Due Date (Late first)</option>
              <option value="priority-desc">Priority (High first)</option>
              <option value="priority-asc">Priority (Low first)</option>
              <option value="created-desc">Newest first</option>
              <option value="created-asc">Oldest first</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Filter options */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-4 rounded-lg border ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'All Tasks' },
                  { key: 'pending', label: 'Pending' },
                  { key: 'completed', label: 'Completed' },
                  { key: 'overdue', label: 'Overdue' },
                  { key: 'high', label: 'High Priority' },
                  { key: 'medium', label: 'Medium Priority' },
                  { key: 'low', label: 'Low Priority' },
                ].map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => setFilterBy(filter.key as FilterOption)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterBy === filter.key
                        ? 'bg-blue-500 text-white'
                        : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {filter.label} ({getFilterCount(filter.key as FilterOption)})
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bulk actions */}
      <AnimatePresence>
        {selectedTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex items-center justify-between p-4 rounded-lg ${
              darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
            } border`}
          >
            <span className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              {selectedTasks.length} task(s) selected
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleBulkComplete}
                className={`px-3 py-1 rounded ${
                  darkMode ? 'bg-green-700 text-white hover:bg-green-600' : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                Toggle Complete
              </button>
              <button
                onClick={handleBulkDelete}
                className={`px-3 py-1 rounded ${
                  darkMode ? 'bg-red-700 text-white hover:bg-red-600' : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                Delete
              </button>
              <button
                onClick={() => setSelectedTasks([])}
                className={`px-3 py-1 rounded ${
                  darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tasks grid/list */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {filteredAndSortedTasks.length === 0 ? (
          <div className={`text-center py-12 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border rounded-lg`}>
            <FiCheckSquare className={`w-16 h-16 mx-auto mb-4 ${
              darkMode ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
              No tasks found
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              {searchTerm || filterBy !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Create your first task to get started'
              }
            </p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            : 'space-y-3'
          }>
            <AnimatePresence>
              {filteredAndSortedTasks.map(task => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative"
                >
                  {/* Selection checkbox */}
                  <div className="absolute top-2 left-2 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTaskSelection(task.id);
                      }}
                      className={`p-1 rounded ${
                        selectedTasks.includes(task.id)
                          ? 'bg-blue-500 text-white'
                          : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {selectedTasks.includes(task.id) ? (
                        <FiCheckSquare className="w-3 h-3" />
                      ) : (
                        <FiSquare className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  {/* Edit button */}
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingTask(task);
                        setIsModalOpen(true);
                      }}
                      className={`p-1 rounded ${
                        darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      <FiEdit3 className="w-3 h-3" />
                    </button>
                  </div>

                  <TaskCard
                    task={task}
                    users={users}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          task={editingTask}
          onSave={handleSaveTask}
        />
      </AnimatePresence>
    </div>
  );
}
