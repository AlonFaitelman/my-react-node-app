import React, { useState } from 'react';

const AddTransitionForm = ({ statuses, onAdd }) => {
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && from && to) {
      onAdd(name, from, to);
      setName('');
      setFrom('');
      setTo('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter transition name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value="">From</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="">To</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <button type="submit">Add Transition</button>
    </form>
  );
};

export default AddTransitionForm;
