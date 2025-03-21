import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Divider, 
  CssBaseline, 
  useTheme, 
  useMediaQuery,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Switch,
  FormControlLabel
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BarChartIcon from '@mui/icons-material/BarChart';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsIcon from '@mui/icons-material/Settings';
import TranslateIcon from '@mui/icons-material/Translate';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { AppProvider } from './context/AppContext';
import GrantGenerator from './pages/GrantGenerator';
import FunderMatchmaker from './pages/FunderMatchmaker';
import TheoryOfChange from './pages/TheoryOfChange';
import ImpactDashboard from './pages/ImpactDashboard';
import HomePage from './pages/HomePage';

const App = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Custom theme with Omuto Foundation colors
  const appTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#F5B841',
      },
      secondary: {
        main: '#2A2D34',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    },
  });
  
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };
  
  const handleLanguageMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    handleLanguageMenuClose();
  };
  
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };
  
  const handleLogout = () => {
    // Handle logout logic here
    handleUserMenuClose();
  };
  
  const handleDrawerClose = () => {
    if (isMobile) {
      setOpen(false);
    }
  };
  
  const drawerWidth = 240;
  
  const menuItems = [
    {
      text: language === 'en' ? 'Dashboard' : 'Ekitabo Ekikulu',
      icon: <DashboardIcon />,
      path: '/'
    },
    {
      text: language === 'en' ? 'Grant Generator' : 'Ekifo Eky\'okukola Ebirowoozo',
      icon: <DescriptionIcon />,
      path: '/grant-generator'
    },
    {
      text: language === 'en' ? 'Funder Matchmaker' : 'Ekifo Eky\'okunoonya Abawa Ensimbi',
      icon: <SearchIcon />,
      path: '/funder-matchmaker'
    },
    {
      text: language === 'en' ? 'Theory of Change' : 'Ekifo Eky\'okukola Enkyukakyuka',
      icon: <AccountTreeIcon />,
      path: '/theory-of-change'
    },
    {
      text: language === 'en' ? 'Impact Dashboard' : 'Ekitabo ky\'Enkyukakyuka',
      icon: <BarChartIcon />,
      path: '/impact-dashboard'
    },
    {
      text: language === 'en' ? 'Training Builder' : 'Ekifo Eky\'okukola Entendeka',
      icon: <SchoolIcon />,
      path: '/training-builder'
    },
    {
      text: language === 'en' ? 'Volunteer Tracker' : 'Ekifo Eky\'okugoberera Abayamba',
      icon: <PeopleIcon />,
      path: '/volunteer-tracker'
    },
    {
      text: language === 'en' ? 'Proposal Library' : 'Ekyuma ky\'Ebirowoozo',
      icon: <EmojiEventsIcon />,
      path: '/proposal-library'
    },
    {
      text: language === 'en' ? 'Settings' : 'Entegeka',
      icon: <SettingsIcon />,
      path: '/settings'
    }
  ];
  
  const drawer = (
    <div>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          Omuto AI Hub
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.path}
            onClick={handleDrawerClose}
            sx={{
              '&.active': {
                bgcolor: 'rgba(245, 184, 65, 0.2)',
              },
              '&:hover': {
                bgcolor: 'rgba(245, 184, 65, 0.1)',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'primary.main' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <FormControlLabel
          control={
            <Switch 
              checked={darkMode} 
              onChange={handleThemeToggle} 
              color="primary" 
            />
          }
          label={darkMode ? (language === 'en' ? 'Dark Mode' : 'Endabika Enzirugavu') : (language === 'en' ? 'Light Mode' : 'Endabika Enjeru')}
        />
      </Box>
    </div>
  );
  
  return (
    <AppProvider value={{ language, darkMode }}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex' }}>
            <AppBar 
              position="fixed" 
              sx={{ 
                zIndex: (theme) => theme.zIndex.drawer + 1,
                bgcolor: 'secondary.main'
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                  Omuto AI Hub
                </Typography>
                
                <Button
                  color="inherit"
                  startIcon={<TranslateIcon />}
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={handleLanguageMenuOpen}
                  sx={{ mr: 2 }}
                >
                  {language === 'en' ? 'English' : 'Luganda'}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleLanguageMenuClose}
                >
                  <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
                  <MenuItem onClick={() => handleLanguageChange('lg')}>Luganda</MenuItem>
                </Menu>
                
                <IconButton 
                  color="inherit" 
                  onClick={handleThemeToggle}
                  sx={{ mr: 2 }}
                >
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                
                <IconButton
                  color="inherit"
                  onClick={handleUserMenuOpen}
                >
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <AccountCircleIcon />
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={userMenuAnchorEl}
                  open={Boolean(userMenuAnchorEl)}
                  onClose={handleUserMenuClose}
                >
                  <MenuItem onClick={handleUserMenuClose}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={language === 'en' ? 'Profile' : 'Ebikukwatako'} />
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={language === 'en' ? 'Logout' : 'Fuluma'} />
                  </MenuItem>
                </Menu>
              </Toolbar>
            </AppBar>
            
            <Drawer
              variant={isMobile ? "temporary" : "permanent"}
              open={isMobile ? open : true}
              onClose={handleDrawerToggle}
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { 
                  width: drawerWidth, 
                  boxSizing: 'border-box',
                  bgcolor: 'background.paper'
                },
              }}
            >
              {drawer}
            </Drawer>
            
            <Box
              component="main"
              sx={{ 
                flexGrow: 1, 
                p: 3, 
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                bgcolor: 'background.default',
                minHeight: '100vh'
              }}
            >
              <Toolbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/grant-generator" element={<GrantGenerator />} />
                <Route path="/funder-matchmaker" element={<FunderMatchmaker />} />
                <Route path="/theory-of-change" element={<TheoryOfChange />} />
                <Route path="/impact-dashboard" element={<ImpactDashboard />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
