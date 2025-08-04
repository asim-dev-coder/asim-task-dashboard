import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheckSquare } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import { useStore } from '../store/useStore';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const { login, loginWithGoogle, isAuthenticated, darkMode, toggleDarkMode } = useStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const success = await login(formData.email, formData.password);
      if (!success) {
        setErrors({ submit: 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setErrors({});

    try {
      const success = await loginWithGoogle();
      if (!success) {
        setErrors({ submit: 'Google login failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred with Google login.' });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    } px-4 sm:px-6 lg:px-8`}>
      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
      >
        {darkMode ? (
          <FiEyeOff className="w-5 h-5 text-yellow-400" />
        ) : (
          <FiEye className="w-5 h-5 text-gray-600" />
        )}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Logo and title */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4"
          >
            <FiCheckSquare className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome to Asim Task
          </h2>
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Sign in to manage your tasks efficiently
          </p>
        </div>

        {/* Login form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-xl shadow-lg border p-8`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              } mb-2`}>
                Email Address
              </label>
              <div className="relative">
                <FiMail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : darkMode
                      ? 'border-gray-600 bg-gray-700 text-white focus:ring-blue-500'
                      : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                  } focus:ring-2 focus:border-transparent transition-all`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              } mb-2`}>
                Password
              </label>
              <div className="relative">
                <FiLock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : darkMode
                      ? 'border-gray-600 bg-gray-700 text-white focus:ring-blue-500'
                      : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                  } focus:ring-2 focus:border-transparent transition-all`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className={`ml-2 block text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Remember me
              </label>
            </div>

            {/* Submit error */}
            {errors.submit && (
              <div className="text-sm text-red-500 text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                {errors.submit}
              </div>
            )}

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Sign in'
              )}
            </motion.button>

            {/* Google login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${darkMode ? 'border-gray-600' : 'border-gray-300'}`} />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-2 ${
                    darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
                  }`}>
                    Or continue with
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className={`mt-3 w-full flex justify-center items-center py-3 px-4 border ${
                  darkMode 
                    ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-white'
                    : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
                } rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
              >
                {googleLoading ? (
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FaGoogle className="w-5 h-5 text-red-500 mr-2" />
                    Sign in with Google
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Demo credentials */}
          <div className={`mt-6 p-4 rounded-lg ${
            darkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'
          } border`}>
            <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-blue-800'} mb-2`}>
              Demo Credentials:
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-blue-600'}`}>
              Email: any valid email<br />
              Password: any 6+ characters
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
