import React, { useEffect, useState } from 'react';
import api from './components/api';
import StatusList from './components/StatusList';
import TransitionList from './components/TransitionList';
import AddStatusForm from './components/AddStatusForm';
import AddTransitionForm from './components/AddTransitionForm';

const App = () => {
  const [statuses, setStatuses] = useState([]);
  const [transitions, setTransitions] = useState([]);

  useEffect(() => {
    api.getStatuses().then((res) => setStatuses(res.data));
    api.getTransitions().then((res) => setTransitions(res.data));
  }, []);

  const handleAddStatus = (name) => {
    api.addStatus(name).then(() => api.getStatuses().then((res) => setStatuses(res.data)));
  };

  const handleDeleteStatus = (name) => {
    api.deleteStatus(name).then(() => api.getStatuses().then((res) => setStatuses(res.data)));
  };

  const handleAddTransition = (name, from, to) => {
    api.addTransition(name, from, to).then(() => api.getTransitions().then((res) => setTransitions(res.data)));
  };

  const handleDeleteTransition = (name) => {
    api.deleteTransition(name).then(() => api.getTransitions().then((res) => setTransitions(res.data)));
  };

  return (
    <div>
      <h1>JIRA Status Manager</h1>
      <AddStatusForm onAdd={handleAddStatus} />
      <StatusList statuses={statuses} onDelete={handleDeleteStatus} />
      <AddTransitionForm statuses={statuses.map((s) => s.name)} onAdd={handleAddTransition} />
      <TransitionList transitions={transitions} onDelete={handleDeleteTransition} />
    </div>
  );
};

export default App;
