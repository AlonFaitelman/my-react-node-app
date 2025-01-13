const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// JIRA Configuration
const JIRA_BASE_URL = "https://alonfa.atlassian.net";
const JIRA_API_TOKEN = "ATATT3xFfGF0y4qJPxsgc3ULMsCXZy-_hNR0Us5QQi5WMUcNYZw5P9lWYBBjA7d1wB1QmLLANElPTZ0xYkN6RsHF6LLPOoUD5AJtoC42tFqcmKSymVnTTcc3VNzoOQKhSyoVA4tyPMAA_U15tFf4mCtywVCBK4Fw4HrFP58Q-hw-Btzgq_K8d7U=9AA876B5";
const JIRA_EMAIL = "alonfa2203@gmail.com";
const jiraAuthHeader = {
  headers: {
    Authorization: `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64")}`,
    "Content-Type": "application/json",
  },
};

// In-memory storage
let statuses = [];
let transitions = [];
let initialStatus = null;

// Helper to calculate labels
function calculateLabels() {
  statuses = statuses.map((status) => {
    const incoming = transitions.some((t) => t.to === status.name);
    const outgoing = transitions.some((t) => t.from === status.name);

    return {
      ...status,
      label: status.name === initialStatus ? "initial" : !incoming ? "orphan" : !outgoing ? "final" : "",
    };
  });
}

// Routes
app.get("/statuses", (req, res) => {
  calculateLabels();
  res.json(statuses);
});

app.post("/statuses", (req, res) => {
  const { name } = req.body;
  if (!name || statuses.find((s) => s.name === name)) {
    return res.status(400).json({ error: "Invalid or duplicate status name" });
  }

  statuses.push({ name });
  if (!initialStatus) initialStatus = name;
  res.status(201).json({ message: "Status added successfully" });
});

app.delete("/statuses/:name", (req, res) => {
  const { name } = req.params;
  statuses = statuses.filter((s) => s.name !== name);
  transitions = transitions.filter((t) => t.from !== name && t.to !== name);
  if (initialStatus === name) initialStatus = null;
  res.json({ message: "Status and related transitions deleted successfully" });
});

app.get("/transitions", (req, res) => {
  res.json(transitions);
});

app.post("/transitions", (req, res) => {
  const { name, from, to } = req.body;
  if (!name || !from || !to || transitions.find((t) => t.name === name)) {
    return res.status(400).json({ error: "Invalid or duplicate transition" });
  }

  transitions.push({ name, from, to });
  res.status(201).json({ message: "Transition added successfully" });
});

app.delete("/transitions/:name", (req, res) => {
  const { name } = req.params;
  transitions = transitions.filter((t) => t.name !== name);
  res.json({ message: "Transition deleted successfully" });
});

app.post("/reset", (req, res) => {
  statuses = [];
  transitions = [];
  initialStatus = null;
  res.json({ message: "Configuration reset successfully" });
});

// JIRA integration: Fetch issues
app.get("/jira/issues", async (req, res) => {
  try {
    const response = await axios.get(`${JIRA_BASE_URL}/rest/api/3/search`, jiraAuthHeader);
    res.json(response.data.issues);
  } catch (error) {
    console.error("Error fetching JIRA issues:", error.message);
    res.status(500).json({ error: "Failed to fetch JIRA issues" });
  }
});

// JIRA integration: Create a status
app.post("/jira/statuses", async (req, res) => {
  const { name, description } = req.body;
  try {
    const response = await axios.post(
      `${JIRA_BASE_URL}/rest/api/3/status`,
      { name, description },
      jiraAuthHeader
    );
    res.status(201).json(response.data);
  } catch (error) {
    console.error("Error creating JIRA status:", error.message);
    res.status(500).json({ error: "Failed to create JIRA status" });
  }
});

// JIRA integration: Get all statuses
app.get("/jira/statuses", async (req, res) => {
  try {
    const response = await axios.get(`${JIRA_BASE_URL}/rest/api/3/status`, jiraAuthHeader);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching JIRA statuses:", error.message);
    res.status(500).json({ error: "Failed to fetch JIRA statuses" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("ברוך הבא לניהול סטטוסים וטרנזיציות!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
