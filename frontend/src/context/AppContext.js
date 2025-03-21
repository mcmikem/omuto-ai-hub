import React, { createContext, useContext, useState } from 'react';

// Create context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }) => {
  // State for user preferences
  const [language, setLanguage] = useState('en'); // 'en' for English, 'lg' for Luganda
  const [darkMode, setDarkMode] = useState(false);
  
  // State for active module
  const [activeModule, setActiveModule] = useState('dashboard');
  
  // State for user data
  const [userData, setUserData] = useState({
    name: '',
    role: '',
    organization: 'Omuto Foundation',
    isLoggedIn: false
  });
  
  // State for notifications
  const [notifications, setNotifications] = useState([]);
  
  // Function to toggle language
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'lg' : 'en');
  };
  
  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  
  // Function to handle login
  const login = (userData) => {
    setUserData({
      ...userData,
      isLoggedIn: true
    });
  };
  
  // Function to handle logout
  const logout = () => {
    setUserData({
      name: '',
      role: '',
      organization: 'Omuto Foundation',
      isLoggedIn: false
    });
  };
  
  // Function to add notification
  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };
  
  // Function to remove notification
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };
  
  // Values to be provided to consumers
  const value = {
    language,
    darkMode,
    activeModule,
    userData,
    notifications,
    toggleLanguage,
    toggleDarkMode,
    setActiveModule,
    login,
    logout,
    addNotification,
    removeNotification
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
