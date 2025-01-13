import React from 'react';

const TransitionList = ({ transitions, onDelete }) => {
  return (
    <div>
      <h3>Transitions</h3>
      <ul>
        {transitions.map((transition) => (
          <li key={transition.name}>
            {transition.name}: {transition.from} → {transition.to}
            <button onClick={() => onDelete(transition.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransitionList;
