import React, { useState } from 'react';
import AddStatusForm from './components/AddStatusForm';
import AddTransitionForm from './components/AddTransitionForm';
import StatusList from './components/StatusList';
import TransitionList from './components/TransitionList';
import axios from 'axios';

function App() {
    const [statuses, setStatuses] = useState([]); // רשימת הסטטוסים
    const [transitions, setTransitions] = useState([]); // רשימת המעברים

    // פונקציה לשליחת Workflow ל-JIRA
    const createWorkflow = async () => {
        try {
            const response = await axios.post('http://localhost:3001/create-workflow', {
                statuses,
                transitions,
            });
            alert('Workflow created successfully!');
        } catch (error) {
            console.error('Error creating workflow:', error);
            alert('Failed to create workflow. Check server logs.');
        }
    };

    // פונקציה לאיפוס כל הנתונים
    const resetWorkflow = () => {
        setStatuses([]);
        setTransitions([]);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Build a Workflow</h1>

            {/* טופס להוספת סטטוסים */}
            <AddStatusForm statuses={statuses} setStatuses={setStatuses} />

            {/* טופס להוספת מעברים */}
            <AddTransitionForm 
                transitions={transitions} 
                setTransitions={setTransitions} 
                statuses={statuses} // העברת הסטטוסים לשימוש בתיבות הבחירה
            />

            {/* רשימת הסטטוסים */}
            <StatusList statuses={statuses} />

            {/* רשימת המעברים */}
            <TransitionList transitions={transitions} />

            {/* כפתור יצירת Workflow */}
            <button 
                onClick={createWorkflow} 
                style={{
                    marginTop: '20px',
                    marginRight: '10px',
                    padding: '10px 20px',
                    backgroundColor: 'green',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Create Workflow
            </button>

            {/* כפתור איפוס */}
            <button 
                onClick={resetWorkflow} 
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Reset
            </button>
        </div>
    );
}

export default App;
