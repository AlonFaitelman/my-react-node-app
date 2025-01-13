import React from 'react';

function StatusList({ statuses }) {
    return (
        <div>
            <h2>Statuses</h2>
            <ul>
                {statuses.map((status, index) => (
                    <li key={index}>{status}</li>
                ))}
            </ul>
        </div>
    );
}

export default StatusList;
