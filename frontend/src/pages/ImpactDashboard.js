import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, Divider, Button, TextField, CircularProgress, FormControl, InputLabel, MenuItem, Select, Tabs, Tab, IconButton } from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import FilterListIcon from '@mui/icons-material/FilterList';
import DateRangeIcon from '@mui/icons-material/DateRange';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import MapIcon from '@mui/icons-material/Map';
import TableChartIcon from '@mui/icons-material/TableChart';
import RefreshIcon from '@mui/icons-material/Refresh';

const ImpactDashboard = () => {
  const { language } = useAppContext();
  
  // Filter state
  const [filters, setFilters] = useState({
    program: '',
    location: '',
    period: 'last-12-months'
  });
  
  // Dashboard state
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Handle refresh dashboard
  const handleRefreshDashboard = () => {
    loadDashboard();
  };
  
  // Handle export CSV
  const handleExportCSV = () => {
    // In a real implementation, this would call the backend API to generate and download a CSV
    alert('CSV export functionality would be implemented here');
  };
  
  // Handle export PDF
  const handleExportPDF = () => {
    // In a real implementation, this would call the backend API to generate and download a PDF
    alert('PDF export functionality would be implemented here');
  };
  
  // Handle share dashboard
  const handleShareDashboard = () => {
    // In a real implementation, this would open a sharing dialog
    alert('Share dashboard functionality would be implemented here');
  };
  
  // Load dashboard data
  const loadDashboard = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the backend API
      // For now, simulate API call with timeout
      setTimeout(() => {
        // Mock dashboard data
        const mockDashboard = {
          title: 'Omuto Foundation Impact Dashboard',
          generatedAt: new Date().toISOString(),
          filters: {
            program: filters.program || 'All Programs',
            location: filters.location || 'All Locations',
            period: filters.period || 'Last 12 Months'
          },
          summary: {
            youthReached: 5247,
            schoolsEngaged: 42,
            treesPlanted: 12850,
            reusablePadsMade: 3620,
            volunteerHours: 8750,
            trainingsCompleted: 124
          },
          charts: {
            programParticipation: {
              type: 'bar',
              title: 'Youth Participation by Program',
              data: {
                labels: ['RED', 'YoSkills', 'GCFA', 'Green', 'YARP', 'Pulse', 'Water'],
                values: [1850, 950, 450, 1200, 350, 250, 250],
                colors: ['#F5B841', '#2A2D34', '#4A4D54', '#28a745', '#17a2b8', '#dc3545', '#6c757d']
              }
            },
            impactGrowth: {
              type: 'line',
              title: 'Impact Growth Over Time',
              data: {
                labels: ['2023-Q1', '2023-Q2', '2023-Q3', '2023-Q4', '2024-Q1', '2024-Q2', '2024-Q3', '2024-Q4'],
                datasets: [
                  {
                    label: 'Youth Reached',
                    values: [850, 1050, 1350, 1650, 2250, 3150, 4200, 5247],
                    color: '#F5B841'
                  },
                  {
                    label: 'Schools Engaged',
                    values: [12, 18, 24, 30, 36, 38, 40, 42],
                    color: '#2A2D34'
                  },
                  {
                    label: 'Trees Planted (hundreds)',
                    values: [12, 25, 32, 41, 58, 82, 105, 128],
                    color: '#28a745'
                  }
                ]
              }
            },
            budgetAllocation: {
              type: 'pie',
              title: 'Budget Allocation by Program',
              data: {
                labels: ['RED', 'YoSkills', 'GCFA', 'Green', 'YARP', 'Pulse', 'Water'],
                values: [25, 20, 15, 15, 10, 5, 10],
                colors: ['#F5B841', '#2A2D34', '#4A4D54', '#28a745', '#17a2b8', '#dc3545', '#6c757d']
              }
            },
            geographicDistribution: {
              type: 'map',
              title: 'Geographic Impact Distribution',
              data: {
                regions: [
                  { name: 'Mpigi', value: 3500, coordinates: [32.3, 0.2] },
                  { name: 'Butambala', value: 1200, coordinates: [32.1, 0.1] },
                  { name: 'Kampala', value: 550, coordinates: [32.6, 0.3] }
                ]
              }
            }
          },
          projects: [
            {
              id: '1',
              name: 'School-Based Reusable Pad Making',
              program: 'RED Campaign',
              location: 'Buwama, Mpigi',
              beneficiaries: '600 girls',
              startDate: '2025-01-15T10:30:00Z',
              status: 'In Progress',
              metrics: {
                girlsTrained: 450,
                padsMade: 1350,
                attendanceImprovement: '65%',
                knowledgeIncrease: '78%'
              }
            },
            {
              id: '2',
              name: 'Youth Vocational Training Workshop',
              program: 'YoSkills',
              location: 'Mpigi Town',
              beneficiaries: '120 youth',
              startDate: '2024-12-05T09:15:00Z',
              status: 'Completed',
              metrics: {
                youthTrained: 120,
                employmentRate: '68%',
                skillsAcquired: 4.2,
                satisfactionRate: '92%'
              }
            },
            {
              id: '3',
              name: 'Community Tree Planting Initiative',
              program: 'GreenSchools',
              location: 'Butambala',
              beneficiaries: '8 schools',
              startDate: '2025-02-10T13:45:00Z',
              status: 'In Progress',
              metrics: {
                treesPlanted: 3200,
                survivalRate: '85%',
                schoolsEngaged: 8,
                studentParticipation: 1200
              }
            },
            {
              id: '4',
              name: 'Youth Leadership Summit',
              program: 'YARP',
              location: 'Kampala',
              beneficiaries: '250 youth leaders',
              startDate: '2025-03-01T08:00:00Z',
              status: 'In Progress',
              metrics: {
                attendees: 250,
                projectsInitiated: 35,
                networkingConnections: 450,
                leadershipScoreImprovement: '42%'
              }
            },
            {
              id: '5',
              name: 'Clean Water System Installation',
              program: 'PureWater',
              location: 'Buwama, Mpigi',
              beneficiaries: '3 schools',
              startDate: '2025-04-05T09:00:00Z',
              status: 'Planned',
              metrics: {
                systemsPlanned: 3,
                studentsToImpact: 1200,
                waterQualityImprovement: 'TBD',
                maintenanceTraining: 'Planned'
              }
            }
          ]
        };
        
        setDashboard(mockDashboard);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      setIsLoading(false);
      alert('Failed to load dashboard. Please try again.');
    }
  };
  
  // Load dashboard on initial render and when filters change
  useEffect(() => {
    loadDashboard();
  }, [filters]);
  
  // Render bar chart
  const renderBarChart = (chart) => {
    // In a real implementation, this would use a charting library like Chart.js or Recharts
    return (
      <Box sx={{ height: 300, position: 'relative', mt: 2 }}>
        <Box sx={{ display: 'flex', height: '100%', alignItems: 'flex-end' }}>
          {chart.data.labels.map((label, index) => (
            <Box 
              key={label} 
              sx={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'flex-end',
                position: 'relative'
              }}
            >
              <Box 
                sx={{ 
                  width: '60%',
                  height: `${(chart.data.values[index] / Math.max(...chart.data.values)) * 80}%`,
                  bgcolor: chart.data.colors ? chart.data.colors[index] : '#F5B841',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.5s ease',
                  position: 'relative',
                  '&:hover': {
                    opacity: 0.8
                  },
                  '&::after': {
                    content: `"${chart.data.values[index]}"`,
                    position: 'absolute',
                    top: '-25px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }
                }}
              />
              <Typography variant="caption" sx={{ mt: 1 }}>
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    );
  };
  
  // Render line chart
  const renderLineChart = (chart) => {
    // In a real implementation, this would use a charting library like Chart.js or Recharts
    return (
      <Box sx={{ height: 300, position: 'relative', mt: 2 }}>
        <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
          {chart.data.datasets.map((dataset, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box 
                sx={{ 
                  width: 16, 
                  height: 16, 
                  bgcolor: dataset.color,
                  borderRadius: '50%',
                  mr: 1
                }}
              />
              <Typography variant="caption">
                {dataset.label}
              </Typography>
            </Box>
          ))}
        </Box>
        
        <Box sx={{ height: '100%', width: '100%', position: 'relative', pt: 4 }}>
          {/* Simplified line chart visualization */}
          <Box sx={{ height: '80%', width: '100%', position: 'relative', border: '1px solid #eee', borderTop: 'none', borderRight: 'none' }}>
            {chart.data.datasets.map((dataset, datasetIndex) => (
              <Box 
                key={datasetIndex}
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 10 + datasetIndex
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polyline
                    points={dataset.values.map((value, index) => {
                      const x = (index / (dataset.values.length - 1)) * 100;
                      const y = 100 - ((value / Math.max(...dataset.values)) * 100);
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke={dataset.color}
                    strokeWidth="2"
                  />
                </svg>
              </Box>
            ))}
            
            {/* X-axis labels */}
            <Box sx={{ position: 'absolute', bottom: -25, left: 0, width: '100%', display: 'flex' }}>
              {chart.data.labels.map((label, index) => (
                <Box 
                  key={label}
                  sx={{ 
                    flex: 1,
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="caption" sx={{ transform: 'rotate(-45deg)', display: 'inline-block' }}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };
  
  // Render pie chart
  const renderPieChart = (chart) => {
    // In a real implementation, this would use a charting library like Chart.js or Recharts
    const total = chart.data.values.reduce((sum, value) => sum + value, 0);
    let currentAngle = 0;
    
    return (
      <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
        <Box sx={{ width: 200, height: 200, position: 'relative' }}>
          <svg width="200" height="200" viewBox="0 0 100 100">
            {chart.data.values.map((value, index) => {
              const startAngle = currentAngle;
              const angle = (value / total) * 360;
              currentAngle += angle;
              const endAngle = currentAngle;
              
              const startRad = (startAngle - 90) * Math.PI / 180;
              const endRad = (endAngle - 90) * Math.PI / 180;
              
              const x1 = 50 + 50 * Math.cos(startRad);
              const y1 = 50 + 50 * Math.sin(startRad);
              const x2 = 50 + 50 * Math.cos(endRad);
              const y2 = 50 + 50 * Math.sin(endRad);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M 50 50`,
                `L ${x1} ${y1}`,
                `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ');
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={chart.data.colors[index]}
                  stroke="#fff"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </Box>
        
        <Box sx={{ ml: 4 }}>
          {chart.data.labels.map((label, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box 
                sx={{ 
                  width: 16, 
                  height: 16, 
                  bgcolor: chart.data.colors[index],
                  borderRadius: '2px',
                  mr: 1
                }}
              />
              <Typography variant="caption">
                {label}: {chart.data.values[index]}%
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    );
  };
  
  // Render map chart
  const renderMapChart = (chart) => {
    // In a real implementation, this would use a mapping library like Leaflet or Google Maps
    return (
      <Box sx={{ height: 300, position: 'relative', mt: 2, border: '1px solid #eee', borderRadius: 1 }}>
        <Box sx={{ position: 'absolute', top: 0, right: 0, p: 1, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 1, m: 1 }}>
          <Typography variant="caption" fontWeight="bold">
            {language === 'en' ? 'Region Impact' : 'Enkyukakyuka mu Bitundu'}
          </Typography>
          {chart.data.regions.map((region, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb:<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>