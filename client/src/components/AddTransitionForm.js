import React, { useState } from 'react';

function AddTransitionForm({ transitions, setTransitions, statuses }) {
    const [transitionInput, setTransitionInput] = useState({ name: '', from: '', to: '' });

    const addTransition = () => {
        const { name, from, to } = transitionInput;
        if (!name || !from || !to) return alert('Please fill out all fields.');
        setTransitions([...transitions, transitionInput]);
        setTransitionInput({ name: '', from: '', to: '' });
    };

    return (
        <div>
            <h2>Add Transition</h2>
            <input
                value={transitionInput.name}
                onChange={(e) => setTransitionInput({ ...transitionInput, name: e.target.value })}
                placeholder="Transition Name"
            />
            <select
                value={transitionInput.from}
                onChange={(e) => setTransitionInput({ ...transitionInput, from: e.target.value })}
            >
                <option value="" disabled>Select From Status</option>
                {statuses.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
            <select
                value={transitionInput.to}
                onChange={(e) => setTransitionInput({ ...transitionInput, to: e.target.value })}
            >
                <option value="" disabled>Select To Status</option>
                {statuses.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
            <button onClick={addTransition}>Add</button>
        </div>
    );
}

export default AddTransitionForm;
