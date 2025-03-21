const { Configuration, OpenAIApi } = require('openai');
const config = require('../config/config');

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || config.openaiApiKey,
});
const openai = new OpenAIApi(configuration);

// Grant Controller
const grantsController = {
  // Get all grants
  getAllGrants: async (req, res) => {
    try {
      // This would typically fetch from a database
      // For now, returning mock data
      const grants = [
        {
          id: '1',
          title: 'Empowering Girls Through School-Based Reusable Pad Making',
          program: 'RED Campaign',
          location: 'Buwama, Mpigi District',
          budget: 'UGX 6,000,000',
          status: 'Active',
          createdAt: '2025-01-15T10:30:00Z',
          updatedAt: '2025-03-10T14:45:00Z'
        },
        {
          id: '2',
          title: 'Youth Vocational Training Workshop Series',
          program: 'YoSkills',
          location: 'Mpigi Town',
          budget: 'UGX 8,500,000',
          status: 'Draft',
          createdAt: '2025-02-20T09:15:00Z',
          updatedAt: '2025-03-15T11:30:00Z'
        },
        {
          id: '3',
          title: 'Community Tree Planting Initiative',
          program: 'GreenSchools',
          location: 'Butambala',
          budget: 'UGX 4,200,000',
          status: 'Submitted',
          createdAt: '2025-02-10T13:45:00Z',
          updatedAt: '2025-03-05T16:20:00Z'
        }
      ];
      
      res.status(200).json({ success: true, data: grants });
    } catch (error) {
      console.error('Error fetching grants:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch grants' });
    }
  },

  // Get a single grant by ID
  getGrantById: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Mock data for demonstration
      const grant = {
        id: id,
        title: 'Empowering Girls Through School-Based Reusable Pad Making',
        program: 'RED Campaign',
        location: 'Buwama, Mpigi District',
        budget: 'UGX 6,000,000',
        problemStatement: 'Many girls in rural Uganda miss school due to lack of menstrual health products and stigma.',
        goals: 'To reduce period poverty by training girls and communities to produce their own reusable pads.',
        beneficiaries: '600 adolescent girls from 4 secondary schools in Mpigi and Butambala',
        duration: '6 months',
        partners: 'Local schools, Women\'s groups, District Health Office',
        status: 'Active',
        proposal: {
          executiveSummary: 'Omuto Foundation proposes a 6-month project to address period poverty in rural Uganda by training 600 adolescent girls from 4 secondary schools in Mpigi and Butambala districts to produce their own reusable menstrual pads.',
          background: 'In rural Uganda, particularly in Mpigi District, many adolescent girls miss up to 5 days of school each month due to inadequate access to menstrual health products.',
          programDescription: 'This initiative, part of our RED Campaign program, will reduce school absenteeism, improve menstrual health knowledge, and empower girls with practical skills.',
          targetGroup: '600 adolescent girls aged 12-18 from 4 secondary schools in Mpigi and Butambala districts.',
          budgetSummary: 'Total budget: UGX 6,000,000, including materials, training, equipment, and monitoring.',
          sustainability: 'The project is designed with sustainability at its core through skills transfer, school-based clubs, and local materials.',
          mealPlan: 'The project will track indicators including number of girls trained, pads produced, school attendance rates, and knowledge/attitudes/practices.',
          conclusion: 'By supporting this project, you will contribute to addressing a critical barrier to girls\' education in rural Uganda.'
        },
        createdAt: '2025-01-15T10:30:00Z',
        updatedAt: '2025-03-10T14:45:00Z'
      };
      
      if (!grant) {
        return res.status(404).json({ success: false, error: 'Grant not found' });
      }
      
      res.status(200).json({ success: true, data: grant });
    } catch (error) {
      console.error('Error fetching grant:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch grant' });
    }
  },

  // Create a new grant
  createGrant: async (req, res) => {
    try {
      const { title, program, location, budget, problemStatement, goals, beneficiaries, duration, partners } = req.body;
      
      // Validate required fields
      if (!title || !program || !location || !budget || !problemStatement || !goals || !beneficiaries) {
        return res.status(400).json({ success: false, error: 'Please provide all required fields' });
      }
      
      // Mock creation - in a real app, this would save to a database
      const newGrant = {
        id: Date.now().toString(),
        title,
        program,
        location,
        budget,
        problemStatement,
        goals,
        beneficiaries,
        duration: duration || '',
        partners: partners || '',
        status: 'Draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      res.status(201).json({ success: true, data: newGrant });
    } catch (error) {
      console.error('Error creating grant:', error);
      res.status(500).json({ success: false, error: 'Failed to create grant' });
    }
  },

  // Update a grant
  updateGrant: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      // Mock update - in a real app, this would update a database record
      const updatedGrant = {
        id,
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      
      res.status(200).json({ success: true, data: updatedGrant });
    } catch (error) {
      console.error('Error updating grant:', error);
      res.status(500).json({ success: false, error: 'Failed to update grant' });
    }
  },

  // Delete a grant
  deleteGrant: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Mock deletion - in a real app, this would delete from a database
      res.status(200).json({ success: true, data: {}, message: `Grant with ID ${id} successfully deleted` });
    } catch (error) {
      console.error('Error deleting grant:', error);
      res.status(500).json({ success: false, error: 'Failed to delete grant' });
    }
  },

  // Generate a grant proposal using AI
  generateProposal: async (req, res) => {
    try {
      const { title, program, location, budget, problemStatement, goals, beneficiaries, duration, partners } = req.body;
      
      // Validate required fields
      if (!title || !program || !location || !budget || !problemStatement || !goals || !beneficiaries) {
        return res.status(400).json({ success: false, error: 'Please provide all required fields' });
      }
      
      // Prepare prompt for OpenAI
      const prompt = `
        Generate a comprehensive grant proposal for Omuto Foundation based on the following information:
        
        Project Title: ${title}
        Program Area: ${program}
        Location: ${location}
        Budget: ${budget}
        Problem Statement: ${problemStatement}
        Goals & Objectives: ${goals}
        Target Beneficiaries: ${beneficiaries}
        Project Duration: ${duration || '6 months'}
        Key Partners: ${partners || 'N/A'}
        
        The proposal should include the following sections:
        1. Executive Summary
        2. Background & Problem Statement (localized to Uganda)
        3. Program Description (Goal, Objectives, Activities)
        4. Target Group
        5. Budget Summary
        6. Sustainability Strategy
        7. Monitoring & Evaluation Plan
        8. Conclusion / Donor Call-to-Action
        
        The proposal should be donor-friendly, compelling, and aligned with Omuto Foundation's mission to empower youth in Uganda.
      `;
      
      // Call OpenAI API
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 2000,
        temperature: 0.7,
      });
      
      // Process the response
      const proposalText = completion.data.choices[0].text.trim();
      
      // Parse the proposal into sections
      const sections = proposalText.split(/\d+\.\s+/).filter(section => section.trim() !== '');
      
      // Create structured proposal object
      const proposal = {
        executiveSummary: sections[0] || 'Executive summary not generated',
        background: sections[1] || 'Background not generated',
        programDescription: sections[2] || 'Program description not generated',
        targetGroup: sections[3] || 'Target group not generated',
        budgetSummary: sections[4] || 'Budget summary not generated',
        sustainability: sections[5] || 'Sustainability strategy not generated',
        mealPlan: sections[6] || 'MEAL plan not generated',
        conclusion: sections[7] || 'Conclusion not generated',
        fullText: proposalText
      };
      
      // Create new grant with generated proposal
      const newGrant = {
        id: Date.now().toString(),
        title,
        program,
        location,
        budget,
        problemStatement,
        goals,
        beneficiaries,
        duration: duration || '6 months',
        partners: partners || '',
        status: 'Draft',
        proposal,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      res.status(201).json({ success: true, data: newGrant });
    } catch (error) {
      console.error('Error generating proposal:', error);
      res.status(500).json({ success: false, error: 'Failed to generate proposal' });
    }
  },

  // Clone a grant proposal
  cloneProposal: async (req, res) => {
    try {
      const { id } = req.params;
      const { newTitle, targetFunder } = req.body;
      
      if (!newTitle || !targetFunder) {
        return res.status(400).json({ success: false, error: 'Please provide new title and target funder' });
      }
      
      // Mock data for demonstration
      const originalGrant = {
        id: id,
        title: 'Empowering Girls Through School-Based Reusable Pad Making',
        program: 'RED Campaign',
        location: 'Buwama, Mpigi District',
        budget: 'UGX 6,000,000',
        problemStatement: 'Many girls in rural Uganda miss school due to lack of menstrual health products and stigma.',
        goals: 'To reduce period poverty by training girls and communities to produce their own reusable pads.',
        beneficiaries: '600 adolescent girls from 4 secondary schools in Mpigi and Butambala',
        duration: '6 months',
        partners: 'Local schools, Women\'s groups, District Health Office',
        status: 'Active',
        proposal: {
          executiveSummary: 'Omuto Foundation proposes a 6-month project to address period poverty in rural Uganda by training 600 adolescent girls from 4 secondary schools in Mpigi and Butambala districts to produce their own reusable menstrual pads.',
          background: 'In rural Uganda, particularly in Mpigi District, many adolescent girls miss up to 5 days of school each month due to inadequate access to menstrual health products.',
          programDescription: 'This initiative, part of our RED Campaign program, will reduce school absenteeism, improve menstrual health knowledge, and empower girls with practical skills.',
          targetGroup: '600 adolescent girls aged 12-18 from 4 secondary schools in Mpigi and Butambala districts.',
          budgetSummary: 'Total budget: UGX 6,000,000, including materials, training, equipment, and monitoring.',
          sustainability: 'The project is designed with sustainability at its core through skills transfer, school-based clubs, and local materials.',
          mealPlan: 'The project will track indicators including number of girls trained, pads produced, school attendance rates, and knowledge/attitudes/practices.',
          conclusion: 'By supporting this project, you will contribute to addressing a critical barrier to girls\' education in rural Uganda.'
        }
      };
      
      // Prepare prompt for OpenAI to adapt the proposal
      const prompt = `
        Adapt the following grant proposal for a new funder named "${targetFunder}":
        
        Original Title: ${originalGrant.title}
        New Title: ${newTitle}
        
        Original Proposal:
        Executive Summary: ${originalGrant.proposal.executiveSummary}
        Background: ${originalGrant.proposal.background}
        Program Description: ${originalGrant.proposal.programDescription}
        Target Group: ${originalGrant.proposal.targetGroup}
        Budget Summary: ${originalGrant.proposal.budgetSummary}
        Sustainability: ${originalGrant.proposal.sustainability}
        MEAL Plan: ${originalGrant.proposal.mealPlan}
        Conclusion: ${originalGrant.proposal.conclusion}
        
        Please adapt the language, tone, and emphasis to better align with ${targetFunder}'s priorities while maintaining the core project details.
      `;
      
      // Call OpenAI API
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 2000,
        temperature: 0.7,
      });
      
      // Process the response
      const adaptedProposalText = completion.data.choices[0].text.trim();
      
      // Parse the adapted proposal
      const sections = adaptedProposalText.split(/Executive Summary:|Background:|Program Description:|Target Group:|Budget Summary:|Sustainability:|MEAL Plan:|Conclusion:/i).filter(section => section.trim() !== '');
      
      // Create structured adapted proposal
      const adaptedProposal = {
        executiveSummary: sections[0] || originalGrant.proposal.executiveSummary,
        background: sections[1] || originalGrant.proposal.background,
        programDescription: sections[2] || originalGrant.proposal.programDescription,
        targetGroup: sections[3] || originalGrant.proposal.targetGroup,
        budgetSummary: sections[4] || originalGrant.proposal.budgetSummary,
        sustainability: sections[5] || originalGrant.proposal.sustainability,
        mealPlan: sections[6] || originalGrant.proposal.mealPlan,
        conclusion: sections[7] || originalGrant.proposal.conclusion,
        fullText: adaptedProposalText
      };
      
      // Create cloned grant with adapted proposal
      const clonedGrant = {
        id: Date.now().toString(),
        title: newTitle,
        program: originalGrant.program,
        location: originalGrant.location,
        budget: originalGrant.budget,
        problemStatement: originalGrant.problemStatement,
        goals: originalGrant.goals,
        beneficiaries: originalGrant.beneficiaries,
        duration: originalGrant.duration,
        partners: originalGrant.partners,
        targetFunder: targetFunder,
        status: 'Draft',
        proposal: adaptedProposal,
        clonedFrom: id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      res.status(201).json({ success: true, data: clonedGrant });
    } catch (error) {
      console.error('Error cloning proposal:', error);
      res.status(500).json({ success: false, error: 'Failed to clone proposal' });
    }
  },

  // Export a grant proposal as PDF
  exportProposal: async (req, res) => {
    try {
      const { id } = req.params;
      
      // In a real implementation, this would generate a PDF file
      // For now, just return a success message
      res.status(200).json({ 
        success: true, 
        message: 'PDF export initiated', 
        data: { 
          downloadUrl: `/api/downloads/pro<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>