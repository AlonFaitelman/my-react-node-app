import React, { useState } from 'react';

const AddStatusForm = ({ onAdd }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      onAdd(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter status name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Status</button>
    </form>
  );
};

export default AddStatusForm;
