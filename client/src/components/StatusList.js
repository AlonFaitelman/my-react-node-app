import React from 'react';

const StatusList = ({ statuses, onDelete }) => {
  return (
    <div>
      <h3>Statuses</h3>
      <ul>
        {statuses.map((status) => (
          <li key={status.name}>
            {status.name} - {status.label}
            <button onClick={() => onDelete(status.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusList;
