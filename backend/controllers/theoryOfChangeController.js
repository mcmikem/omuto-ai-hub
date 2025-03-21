const { Configuration, OpenAIApi } = require('openai');
const config = require('../config/config');

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || config.openaiApiKey,
});
const openai = new OpenAIApi(configuration);

// Theory of Change Controller
const theoryOfChangeController = {
  // Get all theory of change models
  getAllModels: async (req, res) => {
    try {
      // This would typically fetch from a database
      // For now, returning mock data
      const models = [
        {
          id: '1',
          title: 'RED Campaign - Menstrual Health',
          program: 'RED Campaign',
          createdBy: 'Jane Doe',
          lastModified: '2025-03-10T14:45:00Z',
          status: 'Active'
        },
        {
          id: '2',
          title: 'YoSkills - Vocational Training',
          program: 'YoSkills',
          createdBy: 'John Smith',
          lastModified: '2025-02-15T09:30:00Z',
          status: 'Draft'
        },
        {
          id: '3',
          title: 'GreenSchools - Tree Planting',
          program: 'GreenSchools',
          createdBy: 'Alice Johnson',
          lastModified: '2025-03-05T11:20:00Z',
          status: 'Active'
        }
      ];
      
      res.status(200).json({ success: true, data: models });
    } catch (error) {
      console.error('Error fetching theory of change models:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch models' });
    }
  },

  // Get a single theory of change model by ID
  getModelById: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Mock data for demonstration
      const model = {
        id: id,
        title: 'RED Campaign - Menstrual Health',
        program: 'RED Campaign',
        createdBy: 'Jane Doe',
        lastModified: '2025-03-10T14:45:00Z',
        status: 'Active',
        components: {
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
        }
      };
      
      if (!model) {
        return res.status(404).json({ success: false, error: 'Model not found' });
      }
      
      res.status(200).json({ success: true, data: model });
    } catch (error) {
      console.error('Error fetching theory of change model:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch model' });
    }
  },

  // Create a new theory of change model
  createModel: async (req, res) => {
    try {
      const { title, program, components } = req.body;
      
      // Validate required fields
      if (!title || !program) {
        return res.status(400).json({ success: false, error: 'Please provide title and program' });
      }
      
      // Mock creation - in a real app, this would save to a database
      const newModel = {
        id: Date.now().toString(),
        title,
        program,
        createdBy: 'Current User',
        lastModified: new Date().toISOString(),
        status: 'Draft',
        components: components || {
          problems: [],
          activities: [],
          outputs: [],
          outcomes: [],
          impacts: []
        }
      };
      
      res.status(201).json({ success: true, data: newModel });
    } catch (error) {
      console.error('Error creating theory of change model:', error);
      res.status(500).json({ success: false, error: 'Failed to create model' });
    }
  },

  // Update a theory of change model
  updateModel: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      // Mock update - in a real app, this would update a database record
      const updatedModel = {
        id,
        ...updateData,
        lastModified: new Date().toISOString()
      };
      
      res.status(200).json({ success: true, data: updatedModel });
    } catch (error) {
      console.error('Error updating theory of change model:', error);
      res.status(500).json({ success: false, error: 'Failed to update model' });
    }
  },

  // Delete a theory of change model
  deleteModel: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Mock deletion - in a real app, this would delete from a database
      res.status(200).json({ success: true, data: {}, message: `Model with ID ${id} successfully deleted` });
    } catch (error) {
      console.error('Error deleting theory of change model:', error);
      res.status(500).json({ success: false, error: 'Failed to delete model' });
    }
  },

  // Generate a theory of change model using AI
  generateModel: async (req, res) => {
    try {
      const { program, problemStatement, goals, activities, targetGroup } = req.body;
      
      // Validate required fields
      if (!program || !problemStatement || !goals) {
        return res.status(400).json({ success: false, error: 'Please provide program, problem statement, and goals' });
      }
      
      // Prepare prompt for OpenAI
      const prompt = `
        Generate a comprehensive Theory of Change model for an Omuto Foundation program with the following details:
        
        Program: ${program}
        Problem Statement: ${problemStatement}
        Goals: ${goals}
        ${activities ? `Activities: ${activities}` : ''}
        ${targetGroup ? `Target Group: ${targetGroup}` : ''}
        
        The Theory of Change should include:
        1. Problems (main problem and root causes)
        2. Activities (what will be done)
        3. Outputs (direct results of activities)
        4. Outcomes (short-term and medium-term changes)
        5. Impacts (long-term and systemic changes)
        
        For each component, provide 2-3 specific, measurable elements relevant to the program and context in Uganda.
      `;
      
      // Call OpenAI API
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1500,
        temperature: 0.7,
      });
      
      // Process the response
      const tocText = completion.data.choices[0].text.trim();
      
      // Parse the response into components
      // This is a simplified parsing logic - in a real app, this would be more robust
      const sections = tocText.split(/\d+\.\s+Problems|\d+\.\s+Activities|\d+\.\s+Outputs|\d+\.\s+Outcomes|\d+\.\s+Impacts/i);
      
      // Extract components from sections
      const parseComponents = (text, prefix) => {
        const items = [];
        const regex = new RegExp(`${prefix}\\s+\\d+:\\s+(.+?)(?=\\n${prefix}\\s+\\d+:|$)`, 'gs');
        let match;
        let index = 1;
        
        while ((match = regex.exec(text)) !== null) {
          const content = match[1].trim();
          const titleMatch = content.match(/^(.+?):\s+(.+)$/);
          
          if (titleMatch) {
            items.push({
              id: `${prefix.toLowerCase()[0]}${index}`,
              title: titleMatch[1].trim(),
              content: titleMatch[2].trim()
            });
          } else {
            items.push({
              id: `${prefix.toLowerCase()[0]}${index}`,
              title: `${prefix} ${index}`,
              content: content
            });
          }
          
          index++;
        }
        
        return items;
      };
      
      // Extract problems, activities, outputs, outcomes, and impacts
      const problemsSection = tocText.match(/Problems[:\s]+([\s\S]*?)(?=Activities[:\s]+|$)/i)?.[1] || '';
      const activitiesSection = tocText.match(/Activities[:\s]+([\s\S]*?)(?=Outputs[:\s]+|$)/i)?.[1] || '';
      const outputsSection = tocText.match(/Outputs[:\s]+([\s\S]*?)(?=Outcomes[:\s]+|$)/i)?.[1] || '';
      const outcomesSection = tocText.match(/Outcomes[:\s]+([\s\S]*?)(?=Impacts[:\s]+|$)/i)?.[1] || '';
      const impactsSection = tocText.match(/Impacts[:\s]+([\s\S]*?)(?=$)/i)?.[1] || '';
      
      const problems = parseComponents(problemsSection, 'Problem');
      const activities = parseComponents(activitiesSection, 'Activity');
      const outputs = parseComponents(outputsSection, 'Output');
      const outcomes = parseComponents(outcomesSection, 'Outcome');
      const impacts = parseComponents(impactsSection, 'Impact');
      
      // Create structured model
      const generatedModel = {
        id: Date.now().toString(),
        title: `${program} Theory of Change`,
        program,
        createdBy: 'AI Generator',
        lastModified: new Date().toISOString(),
        status: 'Draft',
        components: {
          problems,
          activities,
          outputs,
          outcomes,
          impacts
        },
        rawText: tocText
      };
      
      res.status(201).json({ success: true, data: generatedModel });
    } catch (error) {
      console.error('Error generating theory of change model:', error);
      res.status(500).json({ success: false, error: 'Failed to generate model' });
    }
  },

  // Export a theory of change model as image
  exportModelAsImage: async (req, res) => {
    try {
      const { id } = req.params;
      
      // In a real implementation, this would generate an image file
      // For now, just return a success message
      res.status(200).json({ 
        success: true, 
        message: 'Image export initiated', 
        data: { 
          downloadUrl: `/api/downloads/theory-of-change/${id}.png`,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
        } 
      });
    } catch (error) {
      console.error('Error exporting model as image:', error);
      res.status(500).json({ success: false, error: 'Failed to export model as image' });
    }
  },

  // Export a theory of change model as PDF
  exportModelAsPDF: async (req, res) => {
    try {
      const { id } = req.params;
      
      // In a real implementation, this would generate a PDF file
      // For now, just return a success message
      res.status(200).json({ 
        success: true, 
        message: 'PDF export initiated', 
        data: { 
          downloadUrl: `/api/downloads/theory-of-change/${id}.pdf`,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
        } 
      });
    } catch (error) {
      console.error('Error exporting model as PDF:', error);
      res.status(500).json({ success: false, error: 'Failed to export model as PDF' });
    }
  },

  // Link theory of change to MEAL plan
  linkToMEAL: async (req, res) => {
    try {
      const { id } = req.params;
      const { mealPlanId } = req.body;
      
      if (!mealPlanId) {
        return res.status(400).json({ success: false, error: 'Please provide MEAL plan ID' });
      }
      
      // In a real implementation, this would link the theory of change model to a MEAL plan
      // For now, just return a success message
      res.status(200).json({ 
        success: true, 
        message: 'Theory of Change successfully linked to MEAL plan', 
        data: { 
          tocId: id,
          mealPlanId,
          linkedAt: new Date().toISOString()
        } 
      });
    } catch (error) {
      console.error('Error linking to MEAL plan:', error);
      res.status(500).json({ success: false, error: 'Failed to link to MEAL plan' });
    }
  }
};

module.exports = theoryOfChangeController;
