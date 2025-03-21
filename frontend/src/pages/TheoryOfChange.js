import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Button, Card, CardContent, Divider, FormControl, InputLabel, MenuItem, Select, TextField, IconButton, CircularProgress } from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import LinkIcon from '@mui/icons-material/Link';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

const TheoryOfChange = () => {
  const { language } = useAppContext();
  
  // Project state
  const [project, setProject] = useState({
    id: '',
    title: '',
    program: '',
    status: 'Draft'
  });
  
  // Components state
  const [components, setComponents] = useState({
    problems: [],
    activities: [],
    outputs: [],
    outcomes: [],
    impacts: []
  });
  
  // UI state
  const [view, setView] = useState('Logic Model');
  const [zoom, setZoom] = useState(100);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  
  // Load example data on initial render
  useEffect(() => {
    // Simulate loading a theory of change model
    setProject({
      id: '1',
      title: 'RED Campaign - Menstrual Health',
      program: 'RED Campaign',
      status: 'Draft'
    });
    
    setComponents({
      problems: [
        {
          id: 'p1',
          title: 'Main Problem',
          content: 'Many girls in rural Uganda miss school due to lack of menstrual health products and stigma.'
        },
        {
          id: 'p2',
          title: 'Root Cause',
          content: 'Limited access to affordable menstrual products in rural communities.'
        },
        {
          id: 'p3',
          title: 'Contributing Factor',
          content: 'Cultural stigma and lack of education around menstruation.'
        }
      ],
      activities: [
        {
          id: 'a1',
          title: 'Training',
          content: 'Train 600 girls in reusable pad making techniques.'
        },
        {
          id: 'a2',
          title: 'Clubs',
          content: 'Establish pad-making clubs in 4 secondary schools.'
        },
        {
          id: 'a3',
          title: 'Education',
          content: 'Conduct menstrual health education sessions for girls and boys.'
        }
      ],
      outputs: [
        {
          id: 'o1',
          title: 'Products',
          content: '1,800 reusable pads produced by end of project.'
        },
        {
          id: 'o2',
          title: 'Knowledge',
          content: '600 girls with increased knowledge about menstrual health.'
        },
        {
          id: 'o3',
          title: 'Awareness',
          content: 'Reduced stigma among 1,200 students and community members.'
        }
      ],
      outcomes: [
        {
          id: 'oc1',
          title: 'Short-term',
          content: '70% reduction in menstruation-related school absenteeism.'
        },
        {
          id: 'oc2',
          title: 'Medium-term',
          content: 'Improved academic performance among participating girls.'
        },
        {
          id: 'oc3',
          title: 'Behavioral',
          content: 'Increased comfort discussing menstrual health in school and community.'
        }
      ],
      impacts: [
        {
          id: 'i1',
          title: 'Long-term',
          content: 'Increased graduation rates and economic opportunities for girls in target communities.'
        },
        {
          id: 'i2',
          title: 'Systemic',
          content: 'Reduced stigma around menstruation and increased community support for girls\' education.'
        }
      ]
    });
  }, []);
  
  // Handle project input changes
  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle view change
  const handleViewChange = (e) => {
    setView(e.target.value);
  };
  
  // Handle zoom in
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 150));
  };
  
  // Handle zoom out
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
  };
  
  // Handle add card
  const handleAddCard = (type) => {
    const newId = `${type[0]}${components[type].length + 1}`;
    const newCard = {
      id: newId,
      title: `New ${type.slice(0, -1)}`,
      content: ''
    };
    
    setComponents(prev => ({
      ...prev,
      [type]: [...prev[type], newCard]
    }));
    
    // Start editing the new card
    setEditingCard({
      type,
      id: newId
    });
  };
  
  // Handle edit card
  const handleEditCard = (type, id) => {
    setEditingCard({
      type,
      id
    });
  };
  
  // Handle save card
  const handleSaveCard = (type, id, title, content) => {
    setComponents(prev => ({
      ...prev,
      [type]: prev[type].map(card => 
        card.id === id 
          ? { ...card, title, content } 
          : card
      )
    }));
    
    setEditingCard(null);
  };
  
  // Handle delete card
  const handleDeleteCard = (type, id) => {
    setComponents(prev => ({
      ...prev,
      [type]: prev[type].filter(card => card.id !== id)
    }));
  };
  
  // Handle generate model
  const handleGenerateModel = async () => {
    // Validate form
    if (!project.title || !project.program) {
      alert('Please provide project title and program');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // In a real implementation, this would call the backend API
      // For now, simulate API call with timeout
      setTimeout(() => {
        // Generate theory of change model based on project data
        const generatedModel = {
          problems: [
            {
              id: 'p1',
              title: 'Main Problem',
              content: 'Many girls in rural Uganda miss school due to lack of menstrual health products and stigma.'
            },
            {
              id: 'p2',
              title: 'Root Cause',
              content: 'Limited access to affordable menstrual products in rural communities.'
            },
            {
              id: 'p3',
              title: 'Contributing Factor',
              content: 'Cultural stigma and lack of education around menstruation.'
            }
          ],
          activities: [
            {
              id: 'a1',
              title: 'Training',
              content: 'Train 600 girls in reusable pad making techniques.'
            },
            {
              id: 'a2',
              title: 'Clubs',
              content: 'Establish pad-making clubs in 4 secondary schools.'
            },
            {
              id: 'a3',
              title: 'Education',
              content: 'Conduct menstrual health education sessions for girls and boys.'
            }
          ],
          outputs: [
            {
              id: 'o1',
              title: 'Products',
              content: '1,800 reusable pads produced by end of project.'
            },
            {
              id: 'o2',
              title: 'Knowledge',
              content: '600 girls with increased knowledge about menstrual health.'
            },
            {
              id: 'o3',
              title: 'Awareness',
              content: 'Reduced stigma among 1,200 students and community members.'
            }
          ],
          outcomes: [
            {
              id: 'oc1',
              title: 'Short-term',
              content: '70% reduction in menstruation-related school absenteeism.'
            },
            {
              id: 'oc2',
              title: 'Medium-term',
              content: 'Improved academic performance among participating girls.'
            },
            {
              id: 'oc3',
              title: 'Behavioral',
              content: 'Increased comfort discussing menstrual health in school and community.'
            }
          ],
          impacts: [
            {
              id: 'i1',
              title: 'Long-term',
              content: 'Increased graduation rates and economic opportunities for girls in target communities.'
            },
            {
              id: 'i2',
              title: 'Systemic',
              content: 'Reduced stigma around menstruation and increased community support for girls\' education.'
            }
          ]
        };
        
        setComponents(generatedModel);
        setIsGenerating(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating theory of change model:', error);
      setIsGenerating(false);
      alert('Failed to generate theory of change model. Please try again.');
    }
  };
  
  // Handle save model
  const handleSaveModel = () => {
    // In a real implementation, this would call the backend API to save the model
    alert('Model saved successfully!');
  };
  
  // Handle export as image
  const handleExportImage = () => {
    // In a real implementation, this would call the backend API to generate and download an image
    alert('Image export functionality would be implemented here');
  };
  
  // Handle export as PDF
  const handleExportPDF = () => {
    // In a real implementation, this would call the backend API to generate and download a PDF
    alert('PDF export functionality would be implemented here');
  };
  
  // Handle link to MEAL plan
  const handleLinkToMEAL = () => {
    // In a real implementation, this would navigate to the MEAL plan module or open a linking dialog
    alert('Link to MEAL plan functionality would be implemented here');
  };
  
  // Render card
  const renderCard = (type, card) => {
    const isEditing = editingCard && editingCard.type === type && editingCard.id === card.id;
    
    return (
      <Card 
        key={card.id} 
        sx={{ 
          mb: 2, 
          bgcolor: getCardColor(type),
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }
        }}
      >
        <CardContent>
          {isEditing ? (
            <>
              <TextField
                fullWidth
                label={language === 'en' ? 'Title' : 'Omutwe'}
                defaultValue={card.title}
                size="small"
                sx={{ mb: 1 }}
                inputRef={(input) => input && input.focus()}
              />
              <TextField
                fullWidth
                label={language === 'en' ? 'Content' : 'Ebirimu'}
                defaultValue={card.content}
                multiline
                rows={3}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  size="small" 
                  onClick={() => setEditingCard(null)}
                  sx={{ mr: 1 }}
                >
                  {language === 'en' ? 'Cancel' : 'Sazamu'}
                </Button>
                <Button 
                  size="small" 
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    const titleInput = document.querySelector(`[data-id="${card.id}"] input`);
                    const contentInput = document.querySelector(`[data-id="${card.id}"] textarea`);
                    handleSaveCard(type, card.id, titleInput.value, contentInput.value);
                  }}
                >
                  {language === 'en' ? 'Save' : 'Tereka'}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {card.title}
              </Typography>
              <Typography variant="body2">
                {card.content}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <IconButton 
                  size="small" 
                  onClick={() => handleEditCard(type, card.id)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => handleDeleteCard(type, card.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    );
  };
  
  // Get card color based on type
  const getCardColor = (type) => {
    const cardColors = {
      problems: '#ffebee',
      activities: '#e8f5e9',
      outputs: '#e3f2fd',
      outcomes: '#fff8e1',
      impacts: '#f3e5f5'
    };
    
    return cardColors[type] || '#ffffff';
  };
  
  // Get column title based on type
  const getColumnTitle = (type) => {
    const titles = {
      problems: language === 'en' ? 'Problems' : 'Ebizibu',
      activities: language === 'en' ? 'Activities' : 'Emirimu',
      outputs: language === 'en' ? 'Outputs' : 'Ebivaamu',
      outcomes: language === 'en' ? 'Outcomes' : 'Ebigendererwa',
      impacts: language === 'en' ? 'Impacts' : 'Enkyukakyuka'
    };
    
    return titles[type] || type;
  };
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {language === 'en' ? 'Theory of Change Builder' : 'Ekifo Eky\'okukola Enkyukakyuka'}
      </Typography>
      
      {/* Project Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label={language === 'en' ? 'Project Title' : 'Omutwe gwa Pulojekiti'}
              name="title"
              value={project.title}
              onChange={handleProjectChange}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>{language === 'en' ? 'Program' : 'Ekitongole'}</InputLabel>
              <Select
                name="program"
                value={project.program}
                onChange={handleProjectChange}
                label={language === 'en' ? 'Program' : 'Ekitongole'}
              >
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
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>{language === 'en' ? 'View' : 'Endabika'}</InputLabel>
              <Select
                value={view}
                onChange={handleViewChange}
                label={language === 'en' ? 'View' : 'Endabika'}
              >
                <MenuItem value="Logic Model">
                  {language === 'en' ? 'Logic Model' : 'Endabika y\'Entegeka'}
                </MenuItem>
                <MenuItem value="Results Chain">
                  {language === 'en' ? 'Results Chain' : 'Olunyiriri lw\'Ebiva mu'}
                </MenuItem>
                <MenuItem value="Outcome Mapping">
                  {language === 'en' ? 'Outcome Mapping' : 'Okutegeka Ebigendererwa'}
          <response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>