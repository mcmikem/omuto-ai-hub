import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, Button, Card, CardContent, Divider, FormControl, InputLabel, MenuItem, Select, Paper, CircularProgress, Chip, Avatar, Rating, IconButton } from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';

const FunderMatchmaker = () => {
  const { language } = useAppContext();
  
  // Filter state
  const [filters, setFilters] = useState({
    program: '',
    theme: '',
    location: '',
    grantType: '',
    budgetRange: '',
    deadline: '',
    acceptsFirstTime: false,
    youthLed: false,
    simplifiedApplication: false
  });
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Results state
  const [funders, setFunders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFunder, setSelectedFunder] = useState(null);
  const [showFunderDetails, setShowFunderDetails] = useState(false);
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle checkbox filter changes
  const handleCheckboxChange = (name) => {
    setFilters(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };
  
  // Handle search query changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle search submission
  const handleSearch = () => {
    searchFunders();
  };
  
  // Handle filter reset
  const handleResetFilters = () => {
    setFilters({
      program: '',
      theme: '',
      location: '',
      grantType: '',
      budgetRange: '',
      deadline: '',
      acceptsFirstTime: false,
      youthLed: false,
      simplifiedApplication: false
    });
    setSearchQuery('');
    searchFunders();
  };
  
  // Handle funder selection
  const handleSelectFunder = (funder) => {
    setSelectedFunder(funder);
    setShowFunderDetails(true);
  };
  
  // Handle favorite toggle
  const handleToggleFavorite = (id) => {
    setFunders(prev => 
      prev.map(funder => 
        funder.id === id 
          ? { ...funder, isFavorite: !funder.isFavorite } 
          : funder
      )
    );
  };
  
  // Handle pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
    searchFunders(newPage);
  };
  
  // Handle create proposal
  const handleCreateProposal = (funder) => {
    // In a real implementation, this would navigate to the Grant Generator with prefilled data
    alert(`Creating proposal for ${funder.name}`);
  };
  
  // Handle export to CSV
  const handleExportCSV = () => {
    // In a real implementation, this would call the backend API to generate and download a CSV
    alert('CSV export functionality would be implemented here');
  };
  
  // Handle export to PDF
  const handleExportPDF = () => {
    // In a real implementation, this would call the backend API to generate and download a PDF
    alert('PDF export functionality would be implemented here');
  };
  
  // Handle send to team
  const handleSendToTeam = () => {
    // In a real implementation, this would open an email form or connect to the team messaging system
    alert('Send to team functionality would be implemented here');
  };
  
  // Handle generate funder brief
  const handleGenerateBrief = (funder) => {
    // In a real implementation, this would call the backend API to generate a funder brief
    alert(`Generating brief for ${funder.name}`);
  };
  
  // Search funders based on filters and search query
  const searchFunders = async (pageNum = 1) => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the backend API
      // For now, simulate API call with timeout and mock data
      setTimeout(() => {
        // Mock funders data
        const mockFunders = [
          {
            id: '1',
            name: 'Global Fund for Children',
            logo: 'GFC',
            location: 'United States (Global Focus)',
            supportType: 'Financial',
            grantRange: '$5,000 - $25,000',
            deadline: 'April 15, 2025',
            description: 'Supports community-based organizations that work with vulnerable children and youth. Focus areas include education, health, and gender equity.',
            tags: ['Health', 'Education', 'Gender', 'Youth'],
            matchScore: 95,
            isFavorite: false
          },
          {
            id: '2',
            name: 'AmplifyChange',
            logo: 'AC',
            location: 'United Kingdom (Africa Focus)',
            supportType: 'Financial',
            grantRange: '$10,000 - $100,000',
            deadline: 'March 30, 2025',
            description: 'Supports civil society organizations working on sexual and reproductive health and rights, including menstrual health initiatives in Africa.',
            tags: ['Health', 'Gender', 'Africa'],
            matchScore: 92,
            isFavorite: false
          },
          {
            id: '3',
            name: 'Girl Effect',
            logo: 'GE',
            location: 'United Kingdom (Global Focus)',
            supportType: 'Financial, Partnership',
            grantRange: '$5,000 - $50,000',
            deadline: 'Rolling (Quarterly Review)',
            description: 'Focuses on empowering adolescent girls through innovative programs addressing health, education, and economic empowerment.',
            tags: ['Health', 'Gender', 'Youth', 'Innovation'],
            matchScore: 90,
            isFavorite: false
          },
          {
            id: '4',
            name: 'D-Prize',
            logo: 'DP',
            location: 'United States (Global Focus)',
            supportType: 'Financial',
            grantRange: '$10,000 - $20,000',
            deadline: 'May 1, 2025',
            description: 'Awards funding to entrepreneurs who can distribute proven poverty interventions, including health products and vocational training programs.',
            tags: ['Health', 'Education', 'Entrepreneurship'],
            matchScore: 85,
            isFavorite: false
          },
          {
            id: '5',
            name: 'Segal Family Foundation',
            logo: 'SFF',
            location: 'United States (East Africa Focus)',
            supportType: 'Financial, Capacity Building',
            grantRange: '$10,000 - $30,000',
            deadline: 'April 10, 2025',
            description: 'Supports community-driven organizations in East Africa working in health, education, and youth development with a focus on local leadership.',
            tags: ['Health', 'Education', 'East Africa', 'Youth'],
            matchScore: 88,
            isFavorite: false
          },
          {
            id: '6',
            name: 'Charity: Water',
            logo: 'CW',
            location: 'United States (Global Focus)',
            supportType: 'Financial, Technical',
            grantRange: '$5,000 - $50,000',
            deadline: 'March 31, 2025',
            description: 'Funds clean water projects in developing countries, with a focus on schools and communities. Also supports WASH education programs.',
            tags: ['Water', 'Health', 'Education', 'Schools'],
            matchScore: 82,
            isFavorite: false
          }
        ];
        
        // Apply filters (simplified for demonstration)
        let filteredFunders = [...mockFunders];
        
        if (filters.program) {
          // Map program to relevant tags
          const programTags = {
            'RED Campaign': ['Health', 'Gender'],
            'YoSkills': ['Education', 'Entrepreneurship'],
            'GCFA': ['Sports', 'Youth'],
            'GreenSchools': ['Environment', 'Climate'],
            'Omuto Pulse': ['Media', 'Advocacy'],
            'YARP': ['Leadership', 'Innovation'],
            'PureWater': ['Water', 'Health']
          };
          
          const relevantTags = programTags[filters.program] || [];
          filteredFunders = filteredFunders.filter(funder => 
            funder.tags.some(tag => relevantTags.includes(tag))
          );
        }
        
        if (filters.theme) {
          filteredFunders = filteredFunders.filter(funder => 
            funder.tags.includes(filters.theme)
          );
        }
        
        if (filters.location) {
          filteredFunders = filteredFunders.filter(funder => 
            funder.location.includes(filters.location)
          );
        }
        
        if (filters.grantType) {
          filteredFunders = filteredFunders.filter(funder => 
            funder.supportType.includes(filters.grantType)
          );
        }
        
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredFunders = filteredFunders.filter(funder => 
            funder.name.toLowerCase().includes(query) || 
            funder.description.toLowerCase().includes(query) ||
            funder.tags.some(tag => tag.toLowerCase().includes(query))
          );
        }
        
        // Sort by match score
        filteredFunders.sort((a, b) => b.matchScore - a.matchScore);
        
        setFunders(filteredFunders);
        setTotalPages(Math.ceil(filteredFunders.length / 10));
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error searching funders:', error);
      setIsLoading(false);
      alert('Failed to search funders. Please try again.');
    }
  };
  
  // Load initial data on component mount
  useEffect(() => {
    searchFunders();
    
    // Set example funder details for demonstration
    setSelectedFunder({
      id: '1',
      name: 'Global Fund for Children',
      logo: 'GFC',
      location: 'United States (Global Focus)',
      website: 'www.globalfundforchildren.org',
      email: 'grants@globalfundforchildren.org',
      contactPerson: 'Sarah Johnson, Program Officer for Africa',
      supportType: 'Financial',
      grantRange: '$5,000 - $25,000',
      deadline: 'April 15, 2025',
      applicationProcess: 'Online application form',
      description: 'Global Fund for Children partners with community-based organizations around the world to help children and youth reach their full potential and advance their rights. GFC finds, funds, and strengthens innovative local organizations that are making a difference in the lives of children.',
      fundingAreas: [
        'Education and learning opportunities',
        'Gender equity and girls\' empowerment',
        'Youth empowerment and leadership',
        'Freedom from violence and exploitation',
        'Health and well-being'
      ],
      applicationRequirements: [
        'Organization must be locally led and community-based',
        'Annual budget under $200,000',
        'Focus on vulnerable children and youth',
        'Registered as a nonprofit organization',
        'Operational for at least one year'
      ],
      pastGrantees: [
        'Uganda Youth Development Link',
        'Raising Teenagers Uganda',
        'Action for Fundamental Change and Development'
      ],
      omutoAlignment: {
        matchScore: 95,
        alignmentAreas: [
          'Strong alignment with RED Campaign\'s focus on menstrual health and education',
          'Supports youth-led organizations in Uganda',
          'Preference for community-based solutions',
          'Focus on vulnerable populations'
        ]
      },
      recommendedApproach: 'Emphasize the community-led nature of Omuto Foundation and focus on the RED Campaign\'s direct impact on girls\' education through menstrual health interventions. Highlight measurable outcomes and sustainability plans.',
      tags: ['Health', 'Education', 'Gender', 'Youth'],
      isFavorite: false
    });
  }, []);
  
  // Get tag color based on category
  const getTagColor = (tag) => {
    const tagColors = {
      'Health': '#f44336',
      'Education': '#2196f3',
      'Gender': '#e91e63',
      'Youth': '#ff9800',
      'Africa': '#4caf50',
      'East Africa': '#4caf50',
      'Innovation': '#9c27b0',
      'Entrepreneurship': '#ff5722',
      'Water': '#00bcd4',
      'Schools': '#3f51b5',
      'Environment': '#8bc34a',
      'Climate': '#009688',
      'Leadership': '#673ab7',
      'Sports': '#795548',
      'Media': '#607d8b',
      'Advocacy': '#795548'
    };
    
    return tagColors[tag] || '#9e9e9e';
  };
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {language === 'en' ? 'Funder Matchmaker' : 'Ekifo Eky\'okunoonya Abawa Ensimbi'}
      </Typography>
      
      <Grid container spacing={3}>
        {/* Filter Section */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                <FilterListIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                {language === 'en' ? 'Filters' : 'Ensengeka'}
              </Typography>
              
              <Button 
                variant="text" 
                color="primary" 
                size="small"
                onClick={handleResetFilters}
              >
                {language === 'en' ? 'Reset' : 'Ddamu'}
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={language === 'en' ? 'Search Funders' : 'Noonya Abawa Ensimbi'}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton size="small" onClick={handleSearch}>
                        <SearchIcon />
                      </IconButton>
                    )
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>{language === 'en' ? 'Program Area' : 'Ekitongole'}</InputLabel>
                  <Select
                    name="program"
                    value={filters.program}
                    onChange={handleFilterChange}
                    label={language === 'en' ? 'Program Area' : 'Ekitongole'}
                  >
                    <MenuItem value="">All Programs</MenuItem>
                    <MenuItem value="RED Campaign">RED Campaign</MenuItem>
                    <MenuItem value="YoSkills">YoSkills</MenuItem>
                    <MenuItem value="GCFA">GCFA</MenuItem>
                    <MenuItem value="GreenSchools">GreenSchools</MenuItem>
                    <MenuItem value="Omuto Pulse">Omuto Pulse</MenuItem>
                    <MenuItem value="YARP">YARP</MenuItem>
                    <MenuItem value="PureWater">PureWater</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>{language === 'en' ? 'Theme/Goal' : 'Ekigendererwa'}</InputLabel>
                  <Select
                    name="theme"
                    value={filters.theme}
                    onChange={handleFil<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>