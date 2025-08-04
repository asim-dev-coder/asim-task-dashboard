import { motion } from 'framer-motion';
import { FiCode, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface PlaceholderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function Placeholder({ title, description, icon }: PlaceholderProps) {
  const { darkMode } = useStore();

  return (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Link
          to="/dashboard"
          className={`inline-flex items-center space-x-2 ${
            darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          } hover:underline mb-8`}
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className={`p-8 rounded-xl ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          <div className="mb-6">
            {icon || (
              <FiCode className={`w-16 h-16 mx-auto ${
                darkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
            )}
          </div>
          
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            {title}
          </h1>
          
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
            {description}
          </p>

          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
          } border`}>
            <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              💡 <strong>Continue the conversation</strong> to have me build out this page with the features you need!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
