import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, 
  FiBell, 
  FiMoon, 
  FiSun,
  FiShield,
  FiUsers,
  FiDownload,
  FiTrash2,
  FiSave,
  FiEdit3,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCamera,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiX
} from 'react-icons/fi';
import { useStore } from '../store/useStore';

type SettingsTab = 'profile' | 'notifications' | 'appearance' | 'security' | 'team' | 'data';

const TabButton = ({ 
  tab, 
  activeTab, 
  onClick, 
  icon: Icon, 
  label 
}: { 
  tab: SettingsTab; 
  activeTab: SettingsTab; 
  onClick: (tab: SettingsTab) => void; 
  icon: any; 
  label: string;
}) => {
  const { darkMode } = useStore();
  const isActive = activeTab === tab;
  
  return (
    <button
      onClick={() => onClick(tab)}
      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-colors ${
        isActive
          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
          : darkMode
          ? 'text-gray-300 hover:text-white hover:bg-gray-700'
          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );
};

const ProfileSettings = () => {
  const { currentUser, darkMode } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    role: currentUser?.role || '',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Product manager passionate about creating efficient workflows and helping teams succeed.'
  });

  const handleSave = () => {
    // In a real app, this would update the user profile
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Profile Settings
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors`}
        >
          <FiEdit3 className="w-4 h-4" />
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>

      <div className={`${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border rounded-lg p-6`}>
        {/* Avatar section */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-20 h-20 rounded-full"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                <FiCamera className="w-4 h-4" />
              </button>
            )}
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentUser?.name}
            </h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {currentUser?.role}
            </p>
          </div>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            ) : (
              <p className={`p-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {formData.name}
              </p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            ) : (
              <p className={`p-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {formData.email}
              </p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Role
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className={`w-full p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            ) : (
              <p className={`p-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {formData.role}
              </p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className={`w-full p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            ) : (
              <p className={`p-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {formData.phone}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Location
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className={`w-full p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            ) : (
              <p className={`p-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {formData.location}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Bio
            </label>
            {isEditing ? (
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                rows={3}
                className={`w-full p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
              />
            ) : (
              <p className={`p-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {formData.bio}
              </p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-2 mt-6">
            <button
              onClick={() => setIsEditing(false)}
              className={`px-4 py-2 rounded-lg ${
                darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiSave className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const NotificationSettings = () => {
  const { darkMode } = useStore();
  const [notifications, setNotifications] = useState({
    email: {
      taskAssignments: true,
      taskDeadlines: true,
      taskComments: false,
      weeklyReports: true,
    },
    push: {
      taskAssignments: true,
      taskDeadlines: true,
      taskComments: true,
      weeklyReports: false,
    },
    frequency: 'immediate', // immediate, daily, weekly
  });

  const handleToggle = (category: 'email' | 'push', setting: string) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting as keyof typeof prev[category]]
      }
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Notification Settings
      </h2>

      <div className={`${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border rounded-lg p-6`}>
        <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Email Notifications
        </h3>

        <div className="space-y-4">
          {Object.entries(notifications.email).map(([key, enabled]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Receive email notifications for {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                </p>
              </div>
              <button
                onClick={() => handleToggle('email', key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  enabled ? 'bg-blue-600' : darkMode ? 'bg-gray-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={`${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border rounded-lg p-6`}>
        <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Push Notifications
        </h3>

        <div className="space-y-4">
          {Object.entries(notifications.push).map(([key, enabled]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Receive push notifications for {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                </p>
              </div>
              <button
                onClick={() => handleToggle('push', key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  enabled ? 'bg-blue-600' : darkMode ? 'bg-gray-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AppearanceSettings = () => {
  const { darkMode, toggleDarkMode } = useStore();
  const [preferences, setPreferences] = useState({
    theme: darkMode ? 'dark' : 'light',
    compactView: false,
    showAvatars: true,
    animationsEnabled: true,
  });

  return (
    <div className="space-y-6">
      <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Appearance Settings
      </h2>

      <div className={`${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border rounded-lg p-6`}>
        <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Theme
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {darkMode ? <FiMoon className="w-5 h-5 text-yellow-500" /> : <FiSun className="w-5 h-5 text-yellow-500" />}
              <div>
                <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Dark Mode
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Use dark theme across the application
                </p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Compact View
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Show more content with tighter spacing
              </p>
            </div>
            <button
              onClick={() => setPreferences(prev => ({ ...prev, compactView: !prev.compactView }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.compactView ? 'bg-blue-600' : darkMode ? 'bg-gray-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.compactView ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Show Avatars
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Display user avatars in task cards and comments
              </p>
            </div>
            <button
              onClick={() => setPreferences(prev => ({ ...prev, showAvatars: !prev.showAvatars }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.showAvatars ? 'bg-blue-600' : darkMode ? 'bg-gray-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.showAvatars ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Enable Animations
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Show smooth transitions and animations
              </p>
            </div>
            <button
              onClick={() => setPreferences(prev => ({ ...prev, animationsEnabled: !prev.animationsEnabled }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.animationsEnabled ? 'bg-blue-600' : darkMode ? 'bg-gray-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.animationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataSettings = () => {
  const { darkMode } = useStore();

  const handleExportData = () => {
    // Export user data
    const data = {
      exportDate: new Date().toISOString(),
      note: 'This is a demo export - in a real app, this would contain your actual data'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskhive-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Data & Privacy
      </h2>

      <div className={`${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border rounded-lg p-6`}>
        <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Export Data
        </h3>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
          Download a copy of your data including tasks, comments, and preferences.
        </p>
        <button
          onClick={handleExportData}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiDownload className="w-4 h-4" />
          <span>Export My Data</span>
        </button>
      </div>

      <div className={`${
        darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
      } border rounded-lg p-6`}>
        <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
          Danger Zone
        </h3>
        <p className={`${darkMode ? 'text-red-300' : 'text-red-600'} mb-4`}>
          These actions cannot be undone. Please be careful.
        </p>
        <div className="space-y-3">
          <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            darkMode ? 'bg-red-800 text-red-200 hover:bg-red-700' : 'bg-red-600 text-white hover:bg-red-700'
          } transition-colors`}>
            <FiTrash2 className="w-4 h-4" />
            <span>Clear All Tasks</span>
          </button>
          <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            darkMode ? 'bg-red-900 text-red-200 hover:bg-red-800' : 'bg-red-700 text-white hover:bg-red-800'
          } transition-colors`}>
            <FiTrash2 className="w-4 h-4" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Settings() {
  const { darkMode } = useStore();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const tabs = [
    { id: 'profile' as SettingsTab, label: 'Profile', icon: FiUser },
    { id: 'notifications' as SettingsTab, label: 'Notifications', icon: FiBell },
    { id: 'appearance' as SettingsTab, label: 'Appearance', icon: FiMoon },
    { id: 'security' as SettingsTab, label: 'Security', icon: FiShield },
    { id: 'team' as SettingsTab, label: 'Team', icon: FiUsers },
    { id: 'data' as SettingsTab, label: 'Data & Privacy', icon: FiDownload },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'data':
        return <DataSettings />;
      default:
        return (
          <div className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border rounded-lg p-8 text-center`}>
            <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
              {tabs.find(tab => tab.id === activeTab)?.label} Settings
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              These settings will be implemented in a future update.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Settings
        </h1>
        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage your account settings and preferences
        </p>
      </motion.div>

      {/* Settings content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border rounded-lg p-4`}
        >
          <nav className="space-y-2">
            {tabs.map(tab => (
              <TabButton
                key={tab.id}
                tab={tab.id}
                activeTab={activeTab}
                onClick={setActiveTab}
                icon={tab.icon}
                label={tab.label}
              />
            ))}
          </nav>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}
