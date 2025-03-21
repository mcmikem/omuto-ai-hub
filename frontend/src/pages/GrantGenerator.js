import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, Button, Card, CardContent, Divider, FormControl, InputLabel, MenuItem, Select, Paper, CircularProgress } from '@mui/material';
import { useAppContext } from '../../context/AppContext';

const GrantGenerator = () => {
  const { language } = useAppContext();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    problemStatement: '',
    goals: '',
    beneficiaries: '',
    budget: '',
    location: '',
    program: '',
    duration: '',
    partners: ''
  });
  
  // Example data for initial load
  const exampleData = {
    title: 'Empowering Girls Through School-Based Reusable Pad Making',
    problemStatement: 'Many girls in rural Uganda miss school due to lack of menstrual health products and stigma.',
    goals: 'To reduce period poverty by training girls and communities to produce their own reusable pads.',
    beneficiaries: '600 adolescent girls from 4 secondary schools in Mpigi and Butambala',
    budget: 'UGX 6,000,000',
    location: 'Buwama, Mpigi District',
    program: 'RED Campaign',
    duration: '6 months',
    partners: 'Local schools, Women\'s groups, District Health Office'
  };
  
  // Proposal state
  const [proposal, setProposal] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Load example data on initial render
  useEffect(() => {
    setFormData(exampleData);
    // Simulate loading an example proposal
    setProposal({
      executiveSummary: 'Omuto Foundation proposes a 6-month project to address period poverty in rural Uganda by training 600 adolescent girls from 4 secondary schools in Mpigi and Butambala districts to produce their own reusable menstrual pads.',
      background: 'In rural Uganda, particularly in Mpigi District, many adolescent girls miss up to 5 days of school each month due to inadequate access to menstrual health products. This leads to significant educational disadvantages, with some girls eventually dropping out of school entirely. The stigma surrounding menstruation compounds the problem, creating a culture of silence that prevents girls from seeking help.',
      programDescription: 'This initiative, part of our RED Campaign program, will reduce school absenteeism, improve menstrual health knowledge, and empower girls with practical skills. The project will establish pad-making clubs in 4 secondary schools, train 600 girls in reusable pad production techniques, conduct menstrual health education sessions, and engage community members to reduce stigma.',
      targetGroup: '600 adolescent girls aged 12-18 from 4 secondary schools in Mpigi and Butambala districts. These girls come from low-income households where commercial menstrual products are unaffordable, leading to the use of unhygienic alternatives or school absenteeism during menstruation.',
      budgetSummary: 'Total budget: UGX 6,000,000, including materials (UGX 2,500,000), training workshops (UGX 1,500,000), equipment (UGX 1,000,000), and monitoring & evaluation (UGX 1,000,000).',
      sustainability: 'The project is designed with sustainability at its core through skills transfer, school-based clubs, and local materials. Once trained, girls will continue producing pads using locally available materials, and the school clubs will train new students each year, creating a self-sustaining cycle.',
      mealPlan: 'The project will track indicators including number of girls trained, pads produced, school attendance rates, and knowledge/attitudes/practices. Monitoring will occur monthly through school visits, while evaluation will be conducted at project midpoint and conclusion.',
      conclusion: 'By supporting this project, you will contribute to addressing a critical barrier to girls\' education in rural Uganda. Your investment will not only provide immediate relief from period poverty but also create a sustainable solution through skills development and community engagement.'
    });
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle proposal generation
  const handleGenerateProposal = async () => {
    // Validate form
    if (!formData.title || !formData.problemStatement || !formData.goals || !formData.beneficiaries || !formData.budget || !formData.location || !formData.program) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // In a real implementation, this would call the backend API
      // For now, simulate API call with timeout
      setTimeout(() => {
        // Generate proposal based on form data
        const generatedProposal = {
          executiveSummary: `Omuto Foundation proposes a ${formData.duration || '6-month'} project to address ${formData.problemStatement.toLowerCase()} through ${formData.title.toLowerCase()} for ${formData.beneficiaries}.`,
          background: `In rural Uganda, particularly in ${formData.location}, ${formData.problemStatement} This leads to significant challenges for local communities and youth development.`,
          programDescription: `This initiative, part of our ${formData.program} program, will ${formData.goals} The project will implement various activities tailored to the local context and community needs.`,
          targetGroup: `${formData.beneficiaries}. These individuals face various challenges that this project aims to address through targeted interventions and community engagement.`,
          budgetSummary: `Total budget: ${formData.budget}, allocated across materials, training, equipment, and monitoring & evaluation activities.`,
          sustainability: `The project is designed with sustainability at its core through skills transfer, community ownership, and local capacity building. ${formData.partners ? `Partnerships with ${formData.partners} will ensure long-term support and continuity.` : ''}`,
          mealPlan: `The project will track key indicators including number of beneficiaries reached, activities completed, and outcomes achieved. Regular monitoring will ensure the project stays on track and achieves its intended impact.`,
          conclusion: `By supporting this project, you will contribute to addressing ${formData.problemStatement.toLowerCase()} Your investment will create lasting change in the communities we serve.`
        };
        
        setProposal(generatedProposal);
        setIsGenerating(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating proposal:', error);
      setIsGenerating(false);
      alert('Failed to generate proposal. Please try again.');
    }
  };
  
  // Handle proposal editing
  const handleEditProposal = (section, value) => {
    if (!isEditing) return;
    
    setProposal(prev => ({
      ...prev,
      [section]: value
    }));
  };
  
  // Handle proposal export
  const handleExportPDF = () => {
    // In a real implementation, this would call the backend API to generate and download a PDF
    alert('PDF export functionality would be implemented here');
  };
  
  // Handle copy to clipboard
  const handleCopyToClipboard = () => {
    if (!proposal) return;
    
    const fullProposal = `
      # ${formData.title}
      
      ## Executive Summary
      ${proposal.executiveSummary}
      
      ## Background & Problem Statement
      ${proposal.background}
      
      ## Program Description
      ${proposal.programDescription}
      
      ## Target Group
      ${proposal.targetGroup}
      
      ## Budget Summary
      ${proposal.budgetSummary}
      
      ## Sustainability Strategy
      ${proposal.sustainability}
      
      ## Monitoring & Evaluation Plan
      ${proposal.mealPlan}
      
      ## Conclusion
      ${proposal.conclusion}
      
      ---
      Prepared by Omuto Foundation
      Contact: info@omuto.org | www.omuto.org
      Address: Mpigi District, Uganda
    `;
    
    navigator.clipboard.writeText(fullProposal)
      .then(() => alert('Proposal copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  };
  
  // Handle email to donor
  const handleEmailToDonor = () => {
    // In a real implementation, this would open an email form or connect to the donor CRM
    alert('Email to donor functionality would be implemented here');
  };
  
  // Handle save draft
  const handleSaveDraft = () => {
    // In a real implementation, this would save the current state to the database
    alert('Draft saved successfully!');
  };
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {language === 'en' ? 'Grant Generator Studio' : 'Ekifo Eky\'okukola Ebirowoozo by\'Ensimbi'}
      </Typography>
      
      <Grid container spacing={3}>
        {/* Form Section */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              {language === 'en' ? 'Project Details' : 'Ebikwata ku Pulojekiti'}
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={language === 'en' ? 'Project Title' : 'Omutwe gwa Pulojekiti'}
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={language === 'en' ? 'Problem Statement' : 'Obuzibu'}
                  name="problemStatement"
                  value={formData.problemStatement}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={language === 'en' ? 'Goals & Objectives' : 'Ebigendererwa'}
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={language === 'en' ? 'Target Beneficiaries' : 'Abaganyulwa'}
                  name="beneficiaries"
                  value={formData.beneficiaries}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={language === 'en' ? 'Estimated Budget' : 'Ensimbi Ezeetaagisa'}
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={language === 'en' ? 'Location' : 'Ekifo'}
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>{language === 'en' ? 'Program Area' : 'Ekitongole'}</InputLabel>
                  <Select
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    label={language === 'en' ? 'Program Area' : 'Ekitongole'}
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
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={language === 'en' ? 'Project Duration (Optional)' : 'Obudde bwa Pulojekiti (Si bwetaavu)'}
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={language === 'en' ? 'Key Partners (Optional)' : 'Bannabegattako (Si bwetaavu)'}
                  name="partners"
                  value={formData.partners}
                  onChange={handleInputChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  size="large"
                  onClick={handleGenerateProposal}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    language === 'en' ? 'Generate Proposal' : 'Kola Ekiwandiiko'
                  )}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Proposal Preview Section */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                {language === 'en' ? 'Proposal Preview' : 'Endabika y\'Ekiwandiiko'}
              </Typography>
              
              <Button 
                variant="outlined" 
                color="primary"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  language === 'en' ? 'Done Editing' : 'Kumaliriza Okukyusa'
                ) : (
                  language === 'en' ? 'Edit Proposal' : 'Kyusa Ekiwandiiko'
                )}
              </Button>
            </Box>
            
            {proposal ? (
              <Box sx={{ maxHeight: '70vh', overflow: 'auto', pr: 2 }}>
                <Typography variant="h5" align="center" gutterBottom>
                  {formData.title}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom>
                  {language === 'en' ? 'Executive Summary' : 'Ebifunze'}
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={proposal.executiveSummary}
                    onChange={(e) => handleEditProposal('executiveSummary', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                ) : (
                  <Typography paragraph>{proposal.executiveSummary}</Typography>
                )}
                
                <Typography variant="h6" gutterBottom>
   <response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>