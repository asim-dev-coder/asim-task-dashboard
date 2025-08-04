import { ReactNode, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiCheckSquare, 
  FiCalendar, 
  FiBarChart2, 
  FiSettings,
  FiMenu,
  FiX,
  FiSearch,
  FiBell,
  FiMoon,
  FiSun,
  FiChevronDown
} from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar, darkMode } = useStore();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'My Tasks', href: '/tasks', icon: FiCheckSquare },
    { name: 'Calendar', href: '/calendar', icon: FiCalendar },
    { name: 'Analytics', href: '/analytics', icon: FiBarChart2 },
    { name: 'Settings', href: '/settings', icon: FiSettings },
  ];

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Mobile overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed inset-y-0 left-0 z-50 w-64 ${
              darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
            } border-r flex flex-col lg:relative lg:z-auto`}
          >
            {/* Logo */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FiCheckSquare className="w-5 h-5 text-white" />
                </div>
                <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  TaskHive
                </span>
              </div>
              <button
                onClick={toggleSidebar}
                className={`lg:hidden p-1 rounded-md ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <FiX className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                            : darkMode
                            ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Header = () => {
  const { toggleSidebar, darkMode, toggleDarkMode, currentUser, logout } = useStore();

  return (
    <header className={`${
      darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
    } border-b px-4 py-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            <FiMenu className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
          
          {/* Search bar */}
          <div className="relative hidden md:block">
            <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search tasks..."
              className={`pl-10 pr-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64`}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            {darkMode ? (
              <FiSun className="w-5 h-5 text-yellow-500" />
            ) : (
              <FiMoon className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {/* Notifications */}
          <button className={`relative p-2 rounded-md ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            <FiBell className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User menu */}
          <div className="relative group">
            <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full"
              />
              <span className={`hidden md:block font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {currentUser?.name}
              </span>
              <FiChevronDown className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
            
            {/* Dropdown menu */}
            <div className={`absolute right-0 mt-2 w-48 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {currentUser?.name}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {currentUser?.email}
                </p>
              </div>
              <div className="p-2">
                <button
                  onClick={logout}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                    darkMode 
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default function Layout({ children }: LayoutProps) {
  const { darkMode, isAuthenticated } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (!isAuthenticated) {
    return <div className={darkMode ? 'dark' : ''}>{children}</div>;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
