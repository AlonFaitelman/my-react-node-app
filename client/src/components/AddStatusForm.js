import React, { useState } from 'react';

function AddStatusForm({ statuses, setStatuses }) {
    const [statusInput, setStatusInput] = useState('');

    const addStatus = () => {
        if (!statusInput) return alert('Please enter a status name.');
        setStatuses([...statuses, statusInput]);
        setStatusInput('');
    };

    return (
        <div>
            <h2>Add Status</h2>
            <input
                value={statusInput}
                onChange={(e) => setStatusInput(e.target.value)}
                placeholder="Status Name"
            />
            <button onClick={addStatus}>Add</button>
        </div>
    );
}

export default AddStatusForm;
