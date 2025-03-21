const { Configuration, OpenAIApi } = require('openai');
const config = require('../config/config');

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || config.openaiApiKey,
});
const openai = new OpenAIApi(configuration);

// Impact Controller
const impactController = {
  // Get all impact data
  getAllImpactData: async (req, res) => {
    try {
      // This would typically fetch from a database
      // For now, returning mock data
      const impactData = {
        summary: {
          youthReached: 5247,
          schoolsEngaged: 42,
          treesPlanted: 12850,
          reusablePadsMade: 3620,
          volunteerHours: 8750,
          trainingsCompleted: 124
        },
        programs: [
          {
            name: 'RED Campaign',
            beneficiaries: 1850,
            locations: ['Mpigi', 'Butambala', 'Kampala'],
            keyMetrics: {
              padsMade: 3620,
              girlsReached: 1200,
              schoolsEngaged: 18,
              absenteeismReduction: '68%'
            }
          },
          {
            name: 'YoSkills',
            beneficiaries: 950,
            locations: ['Mpigi', 'Wakiso'],
            keyMetrics: {
              trainingsCompleted: 42,
              youthEmployed: 310,
              businessesStarted: 85,
              incomeIncrease: '45%'
            }
          },
          {
            name: 'GreenSchools',
            beneficiaries: 1200,
            locations: ['Mpigi', 'Butambala', 'Wakiso'],
            keyMetrics: {
              treesPlanted: 12850,
              schoolGardens: 28,
              environmentalClubs: 32,
              wasteReduction: '35%'
            }
          },
          {
            name: 'GCFA',
            beneficiaries: 450,
            locations: ['Mpigi'],
            keyMetrics: {
              teamsFormed: 15,
              matchesPlayed: 68,
              youthEngaged: 450,
              communityEvents: 24
            }
          },
          {
            name: 'YARP',
            beneficiaries: 350,
            locations: ['Kampala', 'Mpigi'],
            keyMetrics: {
              leadershipTrainings: 18,
              projectsImplemented: 42,
              youthLeaders: 350,
              partnershipsDeveloped: 15
            }
          },
          {
            name: 'PureWater',
            beneficiaries: 2500,
            locations: ['Mpigi', 'Butambala'],
            keyMetrics: {
              waterSystemsInstalled: 12,
              schoolsServed: 8,
              studentsWithAccess: 2500,
              waterBorneIllnessReduction: '72%'
            }
          }
        ],
        timeline: {
          '2023-Q1': {
            youthReached: 850,
            schoolsEngaged: 12,
            treesPlanted: 1200
          },
          '2023-Q2': {
            youthReached: 1050,
            schoolsEngaged: 18,
            treesPlanted: 2500
          },
          '2023-Q3': {
            youthReached: 1350,
            schoolsEngaged: 24,
            treesPlanted: 3200
          },
          '2023-Q4': {
            youthReached: 1650,
            schoolsEngaged: 30,
            treesPlanted: 4100
          },
          '2024-Q1': {
            youthReached: 2250,
            schoolsEngaged: 36,
            treesPlanted: 5800
          },
          '2024-Q2': {
            youthReached: 3150,
            schoolsEngaged: 38,
            treesPlanted: 8200
          },
          '2024-Q3': {
            youthReached: 4200,
            schoolsEngaged: 40,
            treesPlanted: 10500
          },
          '2024-Q4': {
            youthReached: 5247,
            schoolsEngaged: 42,
            treesPlanted: 12850
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
      
      res.status(200).json({ success: true, data: impactData });
    } catch (error) {
      console.error('Error fetching impact data:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch impact data' });
    }
  },

  // Get impact data by program
  getImpactByProgram: async (req, res) => {
    try {
      const { program } = req.params;
      
      // Mock data for demonstration - in a real app, this would filter from a database
      const programData = {
        RED: {
          name: 'RED Campaign',
          beneficiaries: 1850,
          locations: ['Mpigi', 'Butambala', 'Kampala'],
          keyMetrics: {
            padsMade: 3620,
            girlsReached: 1200,
            schoolsEngaged: 18,
            absenteeismReduction: '68%'
          },
          projects: [
            {
              id: '1',
              name: 'School-Based Reusable Pad Making',
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
            }
          ],
          timeline: {
            '2023-Q1': { beneficiaries: 250, padsMade: 450 },
            '2023-Q2': { beneficiaries: 450, padsMade: 850 },
            '2023-Q3': { beneficiaries: 750, padsMade: 1500 },
            '2023-Q4': { beneficiaries: 1050, padsMade: 2100 },
            '2024-Q1': { beneficiaries: 1250, padsMade: 2500 },
            '2024-Q2': { beneficiaries: 1450, padsMade: 2900 },
            '2024-Q3': { beneficiaries: 1650, padsMade: 3250 },
            '2024-Q4': { beneficiaries: 1850, padsMade: 3620 }
          }
        },
        YoSkills: {
          name: 'YoSkills',
          beneficiaries: 950,
          locations: ['Mpigi', 'Wakiso'],
          keyMetrics: {
            trainingsCompleted: 42,
            youthEmployed: 310,
            businessesStarted: 85,
            incomeIncrease: '45%'
          },
          projects: [
            {
              id: '2',
              name: 'Youth Vocational Training Workshop',
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
            }
          ],
          timeline: {
            '2023-Q1': { beneficiaries: 120, trainingsCompleted: 5 },
            '2023-Q2': { beneficiaries: 250, trainingsCompleted: 10 },
            '2023-Q3': { beneficiaries: 380, trainingsCompleted: 16 },
            '2023-Q4': { beneficiaries: 500, trainingsCompleted: 22 },
            '2024-Q1': { beneficiaries: 620, trainingsCompleted: 28 },
            '2024-Q2': { beneficiaries: 750, trainingsCompleted: 34 },
            '2024-Q3': { beneficiaries: 850, trainingsCompleted: 38 },
            '2024-Q4': { beneficiaries: 950, trainingsCompleted: 42 }
          }
        },
        GreenSchools: {
          name: 'GreenSchools',
          beneficiaries: 1200,
          locations: ['Mpigi', 'Butambala', 'Wakiso'],
          keyMetrics: {
            treesPlanted: 12850,
            schoolGardens: 28,
            environmentalClubs: 32,
            wasteReduction: '35%'
          },
          projects: [
            {
              id: '3',
              name: 'Community Tree Planting Initiative',
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
            }
          ],
          timeline: {
            '2023-Q1': { beneficiaries: 150, treesPlanted: 1200 },
            '2023-Q2': { beneficiaries: 300, treesPlanted: 2500 },
            '2023-Q3': { beneficiaries: 450, treesPlanted: 3800 },
            '2023-Q4': { beneficiaries: 600, treesPlanted: 5200 },
            '2024-Q1': { beneficiaries: 750, treesPlanted: 6800 },
            '2024-Q2': { beneficiaries: 900, treesPlanted: 8500 },
            '2024-Q3': { beneficiaries: 1050, treesPlanted: 10500 },
            '2024-Q4': { beneficiaries: 1200, treesPlanted: 12850 }
          }
        }
      };
      
      const programKey = program.replace(/\s+/g, '');
      const data = programData[programKey];
      
      if (!data) {
        return res.status(404).json({ success: false, error: 'Program not found' });
      }
      
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error('Error fetching impact data by program:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch impact data by program' });
    }
  },

  // Get impact data by location
  getImpactByLocation: async (req, res) => {
    try {
      const { location } = req.params;
      
      // Mock data for demonstration - in a real app, this would filter from a database
      const locationData = {
        Mpigi: {
          name: 'Mpigi District',
          totalBeneficiaries: 3500,
          programs: ['RED Campaign', 'YoSkills', 'GreenSchools', 'GCFA', 'YARP', 'PureWater'],
          keyMetrics: {
            youthReached: 3500,
            schoolsEngaged: 28,
            treesPlanted: 7500,
            reusablePadsMade: 2400
          },
          projects: [
            {
              id: '1',
              name: 'School-Based Reusable Pad Making',
              program: 'RED Campaign',
              beneficiaries: '600 girls',
              status: 'In Progress'
            },
            {
              id: '2',
              name: 'Youth Vocational Training Workshop',
              program: 'YoSkills',
              beneficiaries: '120 youth',
              status: 'Completed'
            },
            {
              id: '5',
              name: 'Clean Water System Installation',
              program: 'PureWater',
              beneficiaries: '3 schools',
              status: 'Planned'
            }
          ],
          timeline: {
            '2023-Q1': { beneficiaries: 550, schoolsEngaged: 8 },
            '2023-Q2': { beneficiaries: 950, schoolsEngaged: 12 },
            '2023-Q3': { beneficiaries: 1450, schoolsEngaged: 16 },
            '2023-Q4': { beneficiaries: 1950, schoolsEngaged: 20 },
            '2024-Q1': { beneficiaries: 2350, schoolsEngaged: 22 },
            '2024-Q2': { beneficiaries: 2750, schoolsEngaged: 24 },
            '2024-Q3': { beneficiaries: 3150, schoolsEngaged: 26 },
            '2024-Q4': { beneficiaries: 3500, schoolsEngaged: 28 }
          }
        },
        Butambala: {
          name: 'Butambala District',
          totalBeneficiaries: 1200,
          programs: ['RED Campaign', 'GreenSchools', 'PureWater'],
          keyMetrics: {
            youthReached: 1200,
            schoolsEngaged: 10,
            treesPlanted: 4200,
            reusablePadsMade: 950
          },
          projects: [
            {
              id: '3',
              name: 'Community Tree Planting Initiative',
              program: 'GreenSchools',
              beneficiaries: '8 schools',
              status: 'In Progress'
            }
          ],
          timeline: {
            '2023-Q1': { beneficiaries: 150, schoolsEngaged: 2 },
            '2023-Q2': { beneficiaries: 300, schoolsEngaged: 4 },
            '2023-Q3': { beneficiaries: 450, schoolsEngaged: 5 },
            '2023-Q4': { beneficiaries: 600, schoolsEngaged: 6 },
            '2024-Q1': { beneficiaries: 750, schoolsEngaged: 7 },
            '2024-Q2': { beneficiaries: 900, schoolsEngaged: 8 },
            '2024-Q3': { beneficiaries: 1050, schoolsEngaged: 9 },
            '2024-Q4': { beneficiaries: 1200, schoolsEngaged: 10 }
          }
        },
        Kampala: {
          name: 'Kampala',
          totalBeneficiaries: 550,
          programs: ['RED Campaign', 'YARP'],
          keyMetrics: {
            youthReached: 550,
            schoolsEngaged: 4,
            treesPlanted: 1150,
            reusablePadsMade: 270
          },
          projects: [
            {
              id: '4',
              name: 'Youth Leadership Summit',
              program: 'YARP',
              beneficiaries: '250 youth leaders',
              status: 'In Progress'
            }
          ],
          timeline: {
            '2023-Q1': { beneficiaries: 70, schoolsEngaged: 1 },
            '2023-Q2': { beneficiaries: 140, schoolsEngaged: 1 },
            '2023-Q3': { beneficiaries: 210, schoolsEngaged: 2 },
            '2023-Q4': { beneficiaries: 280, schoolsEngaged: 2 },
            '2024-Q1': { beneficiaries: 350, schoolsEngaged: 3 },
            '2024-Q2': { beneficiaries: 420, schoolsEngaged: 3 },
            '2024-Q3': { beneficiaries: 490, schoolsEngaged: 4 },
            '2024-Q4': { beneficiaries: 550, schoolsEngaged: 4 }
          }
        }
      };
      
      const data = locationData[location];
      
      if (!data) {
        return res.status(404).json({ success: false, error: 'Location not found' });
      }
      
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error('Error fetching impact data by location:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch impact data by location' });
    }
  },

  // Get impact data by time period
  getImp<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>