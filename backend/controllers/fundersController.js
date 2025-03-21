const { Configuration, OpenAIApi } = require('openai');
const config = require('../config/config');

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || config.openaiApiKey,
});
const openai = new OpenAIApi(configuration);

// Funders Controller
const fundersController = {
  // Get all funders
  getAllFunders: async (req, res) => {
    try {
      // This would typically fetch from a database
      // For now, returning mock data
      const funders = [
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
          matchScore: 95
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
          matchScore: 92
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
          matchScore: 90
        }
      ];
      
      res.status(200).json({ success: true, data: funders });
    } catch (error) {
      console.error('Error fetching funders:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch funders' });
    }
  },

  // Get a single funder by ID
  getFunderById: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Mock data for demonstration
      const funder = {
        id: id,
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
        createdAt: '2025-01-15T10:30:00Z',
        updatedAt: '2025-03-10T14:45:00Z'
      };
      
      if (!funder) {
        return res.status(404).json({ success: false, error: 'Funder not found' });
      }
      
      res.status(200).json({ success: true, data: funder });
    } catch (error) {
      console.error('Error fetching funder:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch funder' });
    }
  },

  // Create a new funder
  createFunder: async (req, res) => {
    try {
      const { name, location, supportType, grantRange, deadline, description, tags } = req.body;
      
      // Validate required fields
      if (!name || !location || !supportType || !description) {
        return res.status(400).json({ success: false, error: 'Please provide all required fields' });
      }
      
      // Mock creation - in a real app, this would save to a database
      const newFunder = {
        id: Date.now().toString(),
        name,
        logo: name.split(' ').map(word => word[0]).join('').substring(0, 3).toUpperCase(),
        location,
        supportType,
        grantRange: grantRange || 'Varies',
        deadline: deadline || 'Rolling',
        description,
        tags: tags || [],
        matchScore: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      res.status(201).json({ success: true, data: newFunder });
    } catch (error) {
      console.error('Error creating funder:', error);
      res.status(500).json({ success: false, error: 'Failed to create funder' });
    }
  },

  // Update a funder
  updateFunder: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      // Mock update - in a real app, this would update a database record
      const updatedFunder = {
        id,
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      
      res.status(200).json({ success: true, data: updatedFunder });
    } catch (error) {
      console.error('Error updating funder:', error);
      res.status(500).json({ success: false, error: 'Failed to update funder' });
    }
  },

  // Delete a funder
  deleteFunder: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Mock deletion - in a real app, this would delete from a database
      res.status(200).json({ success: true, data: {}, message: `Funder with ID ${id} successfully deleted` });
    } catch (error) {
      console.error('Error deleting funder:', error);
      res.status(500).json({ success: false, error: 'Failed to delete funder' });
    }
  },

  // Search funders with filters
  searchFunders: async (req, res) => {
    try {
      const { program, theme, location, grantType, budgetRange, deadline, acceptsFirstTime, youthLed, simplifiedApplication } = req.body;
      
      // Mock search - in a real app, this would query a database with filters
      // For demonstration, returning filtered mock data
      let funders = [
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
          acceptsFirstTime: true,
          youthLed: true,
          simplifiedApplication: false,
          matchScore: 95
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
          acceptsFirstTime: true,
          youthLed: true,
          simplifiedApplication: false,
          matchScore: 92
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
          acceptsFirstTime: false,
          youthLed: true,
          simplifiedApplication: true,
          matchScore: 90
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
          acceptsFirstTime: true,
          youthLed: true,
          simplifiedApplication: false,
          matchScore: 85
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
          acceptsFirstTime: false,
          youthLed: true,
          simplifiedApplication: false,
          matchScore: 88
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
          acceptsFirstTime: true,
          youthLed: false,
          simplifiedApplication: true,
          matchScore: 82
        }
      ];
      
      // Apply filters
      if (program) {
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
        
        const relevantTags = programTags[program] || [];
        funders = funders.filter(funder => 
          funder.tags.some(tag => relevantTags.includes(tag))
        );
      }
      
      if (theme) {
        funders = funders.filter(funder => 
          funder.tags.includes(theme)
        );
      }
      
      if (location) {
        funders = funders.filter(funder => 
          funder.location.includes(location)
        );
      }
      
      if (grantType) {
        funders = funders.filter(funder => 
          funder.supportType.includes(grantType)
        );
      }
      
      if (budgetRange) {
        // Simple budget range filtering logic
        // In a real app, this would be more sophisticated
        if (budgetRange === 'Under $5,000') {
          funders = funders.filter(funder => 
            funder.grantRange.includes('$5,000') && !funder.grantRange.includes('$10,000')
          );
        } else if (budgetRange === '$5,000 - $25,000') {
          funders = funders.filter(funder => 
            funder.grantRange.includes('$5,000') || 
            (funder.grantRange.includes('$10,000') && !funder.grantRange.includes('$50,000'))
          );
        } else if (budgetRange === '$25,000 - $100,000') {
          funders = funders.filter(funder => 
            funder.grantRange.includes('$50,000') || funder.grantRange.includes('$100,000')
          );
        } else if (budgetRange === 'Over $100,000') {
          funders = funders.filter(funder => 
            funder.grantRange.includes('$100,000')
          );
        }
      }
      
      if (deadline === 'Within 30 Days') {
        // Simple deadline filtering logic
        // In a real app, this would use actual date comparison
        funders = funders.filter(funder => 
          funder.deadline.includes('March') || funder.deadline.includes('Rolling')
        );
      }
      
      if (acceptsFirstTime) {
        funders = funders.filter(funder => funder.acceptsFirstTime);
      }
      
      if (youthLed) {
        funders = funders.filter(funder => funder.youthLed);
      }
      
      if (simplifiedApplication) {
        funders = funders.filter(funder => funder.simplifiedApplication);
      }
      
      // Sort by match score
      funders.sort((a, b) => b.matchScore - a.matchScore);
      
      res.status(200).json({ success: true, data: funders });
    } catch (error) {
      console.error('Error searching funders:', error);
      res.status(500).json({ success: false, error: 'Failed to search funders' });
    }
  },

  // Export funders as CSV
  exportFundersCSV: async (req, res) => {
    try {
      // In a real implementation, this would generate a CSV file
      // For now, just return a success message
      res.status(200).json({ 
        success: true, 
        message: 'CSV export initiated', 
        data: { 
          downloadUrl: `/api/downloads/funders/export.csv`,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
        } 
      });
    } catch (error) {
      console.error('Error exporting funders as CSV:', error);
      res.status(500).json({ success: false, error: 'Failed to export funders as CSV' });
    }
  },

  // Export funders as PDF
  exportFundersPDF: async (req, res) => {
    try {
      // In a real implementation, this would generate a PDF file
      // For now, just return a success message
      res.status(200).json({ 
        success: true, 
        message: 'PDF export initiated', 
        data: { 
          downloadUrl: `/api/downloads/funders/export.pdf`,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
        } 
      });
    } catch (error) {
      console.error('Error exporting funders as PDF:', error);
      res.status(500).json({ success: false, error: 'Failed to export funders as PDF' });
    }
  },

  // Generate funder brief
  generateFunderBrief: async (req, res) => {
    try {
      c<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>