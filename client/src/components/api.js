import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // כתובת השרת

// יצירת סטטוס
export const createStatus = async (name) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create-status`, { name });
        return response.data;
    } catch (error) {
        console.error('Error creating status:', error);
        throw error;
    }
};

// יצירת מעבר (Transition)
export const createTransition = async (transition) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create-transition`, transition);
        return response.data;
    } catch (error) {
        console.error('Error creating transition:', error);
        throw error;
    }
};

// יצירת Workflow
export const createWorkflow = async (workflowData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create-workflow`, workflowData);
        return response.data;
    } catch (error) {
        console.error('Error creating workflow:', error);
        throw error;
    }
};
