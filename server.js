require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// משתני סביבה ל-JIRA
const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;

// נתיב לבדיקה אם השרת פעיל
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// יצירת Workflow חדש ב-JIRA
app.post('/create-workflow', async (req, res) => {
  const { workflowName, statuses, transitions } = req.body;

  // בדיקת נתונים חסרים
  if (!workflowName) {
      return res.status(400).send('Workflow name is missing.');
  }
  if (!statuses || !statuses.length) {
      return res.status(400).send('Statuses are missing or empty.');
  }
  if (!transitions || !transitions.length) {
      return res.status(400).send('Transitions are missing or empty.');
  }

  try {
      // יצירת הסטטוסים
      for (const status of statuses) {
          console.log(`Creating status: ${status}`);
          await axios.post(`${JIRA_BASE_URL}/rest/api/3/status`, 
              { name: status, description: `${status} status` }, 
              { auth: { username: JIRA_EMAIL, password: JIRA_API_TOKEN } }
          );
      }

      // יצירת Workflow חדש
      const workflowResponse = await axios.post(`${JIRA_BASE_URL}/rest/api/3/workflow`, {
          name: workflowName,
          transitions: transitions,
          statuses: statuses.map((status) => ({ name: status })),
      }, {
          auth: {
              username: JIRA_EMAIL,
              password: JIRA_API_TOKEN,
          },
      });

      res.status(201).send({
          message: 'Workflow created successfully!',
          workflow: workflowResponse.data,
      });
  } catch (error) {
      console.error('Error creating workflow:', error.response?.data || error.message);
      res.status(500).send(error.response?.data || 'Failed to create workflow.');
  }
});


// הפעלת השרת
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
